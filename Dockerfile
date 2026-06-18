# Force rebuild 1
FROM python:3.9-slim

# Set working directory
WORKDIR /code

# Install sistem dependencies (diperlukan oleh beberapa library Python)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Salin file requirements dan install
COPY ./backend/requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Salin model ke dalam container
COPY ./best_efficientnet_b0_finetune.keras /code/best_efficientnet_b0_finetune.keras

# Salin kode backend
COPY ./backend /code/backend

# Beri akses baca dan eksekusi pada direktori (Penting untuk Hugging Face Spaces)
RUN chmod -R 777 /code

# Hugging Face Spaces secara default mengekspos port 7860
ENV PORT=7860
EXPOSE 7860

# Jalankan Uvicorn server dari folder backend
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "7860"]
