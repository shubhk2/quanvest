# --- Builder Stage ---
FROM python:3.12.3 AS builder

RUN apt-get update && apt-get install -y --no-install-recommends build-essential curl ca-certificates git && rm -rf /var/lib/apt/lists/*

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --upgrade pip
# Install smaller dependencies first
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --no-cache-dir $(grep -v "torch\|transformers\|sentence-transformers" requirements.txt)

# Install large ML dependencies with custom TMPDIR
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=cache,target=/app/tmp \
    mkdir -p /app/tmp && \
    TMPDIR=/app/tmp pip install --no-cache-dir torch torchvision && \
    TMPDIR=/app/tmp pip install --no-cache-dir transformers sentence-transformers



COPY backend ./backend

# --- Final Stage ---
FROM python:3.12.3 AS final

WORKDIR /app

# Copy only the backend code and the installed libraries
COPY --from=builder /app/backend ./backend
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]