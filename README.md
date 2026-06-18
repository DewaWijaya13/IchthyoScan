---
title: IchthyoScan API
emoji: 🐟
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
---

# 🐟 IchthyoScan

IchthyoScan adalah aplikasi web cerdas untuk memindai dan mengklasifikasikan jenis ikan laut secara otomatis menggunakan teknologi Machine Learning (EfficientNet-B0). Aplikasi ini terdiri dari antarmuka modern yang dibangun menggunakan **React (Vite)** dan server *backend* yang tangguh menggunakan **FastAPI (Python)**.

Model ini dilatih untuk mengenali berbagai jenis ikan laut seperti:
- Bawal Putih
- Kembung
- Pari
- Tuna

---

## 🚀 Fitur Utama
- **Pemindaian Cepat**: Unggah foto ikan dan dapatkan hasil klasifikasi secara instan.
- **Tingkat Keyakinan (Confidence Score)**: Menampilkan persentase akurasi kecocokan spesies.
- **Smart Thresholding**: Jika ikan tidak dikenal atau tingkat akurasi di bawah 70%, sistem akan menolak prediksi palsu.
- **Antarmuka Interaktif**: Desain UI yang mulus, responsif, modern, dan mudah digunakan (User Friendly).

---

## 🛠️ Teknologi yang Digunakan
- **Frontend**: React.js, Vite, TailwindCSS
- **Backend**: Python, FastAPI, Uvicorn
- **Machine Learning**: TensorFlow, Keras (EfficientNet-B0)
- **Image Processing**: Pillow (PIL), NumPy

---

## ⚙️ Prasyarat (Persiapan Sebelum Instalasi)
Pastikan Anda sudah menginstal perangkat lunak berikut di komputer Anda:
1. [Node.js](https://nodejs.org/) (versi 16 atau yang lebih baru) - *Untuk menjalankan frontend*
2. [Python](https://www.python.org/downloads/) (versi 3.9 atau yang lebih baru) - *Untuk menjalankan backend*
3. [Git](https://git-scm.com/) - *Untuk mengunduh repositori*

---

## 📥 Panduan Instalasi dan Menjalankan Proyek

### 1. Mengunduh Repositori
Langkah pertama, *clone* repositori ini ke komputer lokal Anda:
```bash
git clone https://github.com/DewaWijaya13/IchthyoScan.git
cd IchthyoScan
```

### 2. Menjalankan Backend (Python / Machine Learning API)
Buka terminal baru, dan jalankan perintah berikut dari folder root `IchthyoScan`:

```bash
# Pindah ke direktori backend
cd backend

# Membuat Virtual Environment (opsional namun sangat disarankan)
python -m venv venv

# Mengaktifkan Virtual Environment
# Untuk Windows:
venv\Scripts\activate
# Untuk Mac/Linux:
# source venv/bin/activate

# Menginstal semua dependensi yang dibutuhkan
pip install -r requirements.txt

# Menjalankan server FastAPI
uvicorn main:app --reload
```
*Backend akan berjalan secara default di `http://localhost:8000`.*
*Catatan: Pastikan file model `best_efficientnet_b0_finetune.keras` berada di folder utama proyek (bukan di dalam folder backend).*

### 3. Menjalankan Frontend (Antarmuka Web React)
Buka tab terminal baru (biarkan terminal backend tetap berjalan), lalu jalankan perintah berikut dari folder root `IchthyoScan`:

```bash
# Pindah ke direktori frontend
cd frontend

# Menginstal dependensi Node.js
npm install

# Menjalankan server web untuk masa pengembangan (development)
npm run dev
```
*Frontend akan otomatis terbuka di browser Anda, atau Anda bisa mengaksesnya secara manual melalui tautan yang muncul di terminal (biasanya `http://localhost:5173`).*

---

## 🧪 Penggunaan
1. Buka antarmuka web melalui browser.
2. Klik area unggah gambar (Dropzone) atau *drag & drop* gambar ikan yang ingin Anda identifikasi.
3. Klik tombol "Pindai Sekarang".
4. Hasil pemindaian beserta persentase kecocokan akan muncul dalam beberapa detik!

---

## 🤝 Kontribusi
Jika Anda ingin berkontribusi, silakan lakukan *Fork* repositori ini, buat branch baru untuk fitur Anda, dan ajukan *Pull Request*. Segala bentuk masukan sangat diapresiasi!
