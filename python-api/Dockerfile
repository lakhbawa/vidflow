FROM python:3.11-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

WORKDIR /usr/src/app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ffmpeg \
        build-essential \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 4608

# Use gunicorn with uvicorn workers (production-ready)
CMD ["gunicorn", "app.main:app", \
     "-k", "uvicorn.workers.UvicornWorker", \
     "--bind", "0.0.0.0:4608", \
     "--timeout", "300", \
     "--workers", "2", \
     "--worker-class", "uvicorn.workers.UvicornWorker"]