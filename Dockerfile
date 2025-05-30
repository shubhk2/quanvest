# --- Builder Stage ---
FROM python:3.12.3 AS builder

RUN apt-get update && apt-get install -y --no-install-recommends build-essential curl ca-certificates git && rm -rf /var/lib/apt/lists/*

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# --- Final Stage ---
FROM python:3.12.3 AS final

WORKDIR /app

# Copy only the necessary artifacts from the builder stage
COPY --from=builder /app ./

# Install only the runtime dependencies (you might need a separate requirements_runtime.txt if it's different)
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r ./backend/requirements.txt

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]