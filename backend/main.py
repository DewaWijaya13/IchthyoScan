import io
import os
import numpy as np
from contextlib import asynccontextmanager
from PIL import Image
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import traceback

# ==========================================
# Monkey-patch Keras Dense untuk mengatasi bug quantization_config
# ==========================================
_original_dense_init = tf.keras.layers.Dense.__init__
def _patched_dense_init(self, *args, **kwargs):
    kwargs.pop("quantization_config", None)
    _original_dense_init(self, *args, **kwargs)
tf.keras.layers.Dense.__init__ = _patched_dense_init
print("[PATCH] Dense.__init__ berhasil di-patch untuk mengatasi bug quantization_config")

# ==========================================
# Konfigurasi & Variabel Global
# ==========================================
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'best_efficientnet_b0_finetune.keras')
MODEL_PATH = os.path.abspath(MODEL_PATH)
# Urutan kelas (harus persis sama dengan output ImageDataGenerator saat training)
CLASS_NAMES = ['Bawal Putih', 'Kembung', 'Pari', 'Tuna']
CONFIDENCE_THRESHOLD = 0.70

# Dictionary global untuk menyimpan model di memori
ml_models = {}

# ==========================================
# Lifespan: Memuat Model Saat Startup
# ==========================================
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Dijalankan saat server mulai
    print(f"[STARTUP] Memuat model EfficientNet-B0 dari: {MODEL_PATH}")
    
    if not os.path.exists(MODEL_PATH):
        print(f"[ERROR] File model tidak ditemukan: {MODEL_PATH}")
    else:
        try:
            model = tf.keras.models.load_model(MODEL_PATH, compile=False)
            ml_models["ikan_classifier"] = model
            print("[SUCCESS] Model (.keras) berhasil dimuat ke memori!")
            print(f"[INFO] Input shape: {model.input_shape}")
            print(f"[INFO] Output shape: {model.output_shape}")
        except Exception as e:
            print(f"[ERROR] Gagal memuat model: {e}")
            traceback.print_exc()
    
    yield
    
    # Dijalankan saat server dimatikan
    print("[SHUTDOWN] Membersihkan memori model...")
    ml_models.clear()

# ==========================================
# Inisialisasi FastAPI
# ==========================================
app = FastAPI(
    title="IchthyoScan Inference API",
    description="API untuk klasifikasi ikan laut menggunakan EfficientNet-B0",
    version="1.0.0",
    lifespan=lifespan
)

# Konfigurasi CORS agar React (localhost:5173) dan Vercel bisa memanggil API ini
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Mengizinkan semua origin termasuk dari Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# Fungsi Preprocessing Gambar
# ==========================================
def preprocess_image(image_bytes: bytes) -> np.ndarray:
    try:
        # Buka gambar menggunakan Pillow
        img = Image.open(io.BytesIO(image_bytes))
        
        # Konversi ke RGB (menghindari error jika gambar adalah PNG dengan transparansi RGBA)
        if img.mode != "RGB":
            img = img.convert("RGB")
            
        # Resize ke 224x224 piksel sesuai standar EfficientNetB0
        img = img.resize((224, 224))
        
        # Konversi ke numpy array
        img_array = np.array(img)
        
        # Tambahkan dimensi batch: dari (224, 224, 3) menjadi (1, 224, 224, 3)
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    except Exception as e:
        raise ValueError(f"Gagal memproses gambar: {e}")

# ==========================================
# Endpoints
# ==========================================
@app.get("/")
async def root():
    return {
        "name": "IchthyoScan API",
        "status": "online",
        "model_loaded": "ikan_classifier" in ml_models,
        "model_path": MODEL_PATH,
        "model_exists": os.path.exists(MODEL_PATH),
        "model_size_bytes": os.path.getsize(MODEL_PATH) if os.path.exists(MODEL_PATH) else 0
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # 1. Validasi Model
    if "ikan_classifier" not in ml_models:
        raise HTTPException(status_code=503, detail="Model belum siap atau gagal dimuat.")
    
    # 2. Validasi File
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File harus berupa gambar.")
    
    try:
        # 3. Baca byte gambar
        contents = await file.read()
        
        # 4. Preprocessing
        img_tensor = preprocess_image(contents)
        
        # 5. Inference (Prediksi)
        model = ml_models["ikan_classifier"]
        predictions = model.predict(img_tensor)
        
        # Extract probabilitas array
        scores = predictions[0].tolist()
        
        # Cari skor tertinggi
        max_score_idx = np.argmax(scores)
        max_score = float(scores[max_score_idx])
        predicted_class = CLASS_NAMES[max_score_idx]
        
        # 6. Smart Thresholding & Return JSON Response
        if max_score >= CONFIDENCE_THRESHOLD:
            return {
                "status": "success",
                "predictedClass": predicted_class,
                "confidence": max_score,
                "allScores": scores
            }
        else:
            # Jika tingkat keyakinan rendah (< 70%)
            return {
                "status": "unknown",
                "predictedClass": "Unknown",
                "confidence": max_score,
                "allScores": scores,
                "message": "Ikan tidak dapat diklasifikasikan dengan tingkat keyakinan yang cukup."
            }
            
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Terjadi kesalahan internal server: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
