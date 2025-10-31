# ---------- Base Image ----------
FROM python:3.11-slim

# ---------- Environment Variables ----------
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIP_NO_CACHE_DIR=1

# ---------- Work Directory ----------
WORKDIR /usr/src/app

# ---------- System Dependencies ----------
# Install ffmpeg (if this container also handles uploads or local validation)
RUN apt-get update && \
    apt-get install -y gcc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# ---------- Copy and Install Dependencies ----------
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# ---------- Copy Application Code ----------
COPY . .

# ---------- Expose Port ----------
EXPOSE 8000

# ---------- Command ----------
# Use Gunicorn with Uvicorn workers for FastAPI
# Replace "app.main:app" with your actual module path (e.g., api.app.main:app)
CMD ["gunicorn", "app.main:app", "-k", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000", "--timeout", "120"]
