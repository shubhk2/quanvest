FROM python:3.12.3

RUN apt-get update && apt-get install -y --no-install-recommends build-essential curl ca-certificates git && rm -rf /var/lib/apt/lists/*

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app

COPY backend/requirements.txt .

# Install all requirements EXCEPT torch and transformers
RUN sed '/^torch/d' requirements.txt | sed '/^transformers/d' > temp_requirements.txt && \
    pip install --no-cache-dir -r temp_requirements.txt && \
    rm temp_requirements.txt

RUN apt-get clean

# Install transformers (which might have torch as a dependency)
RUN pip install --no-cache-dir transformers>=4.52.3

# Install sentence-transformers (which also depends on torch)
RUN pip install --no-cache-dir sentence-transformers==4.1.0

COPY . .

RUN mkdir -p output

EXPOSE 8000

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]