import { useState, useCallback } from 'react';
import { APP_STATES, CONFIDENCE_THRESHOLD } from '../utils/constants';

// Gunakan URL API sesungguhnya, fallback ke localhost:8000
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function useScanAPI() {
  const [appState, setAppState] = useState(APP_STATES.IDLE);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const resetScan = useCallback(() => {
    setAppState(APP_STATES.IDLE);
    setFile(null);
    setResult(null);
    setError(null);
  }, []);

  const handleFileSelect = useCallback((selectedFile) => {
    setFile(selectedFile);
    setAppState(APP_STATES.PREVIEW);
  }, []);

  const scanImage = useCallback(async () => {
    if (!file) return;

    setAppState(APP_STATES.SCANNING);
    setError(null);

    try {
      // 1. Siapkan data multipart/form-data
      const formData = new FormData();
      formData.append('file', file);

      // 2. Lakukan request POST ke FastAPI backend
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
        // Jangan set header 'Content-Type', biarkan browser mengaturnya secara otomatis bersama boundary
      });

      // 3. Tangani respons error HTTP
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server merespons dengan status ${response.status}`);
      }

      // 4. Parsing JSON
      const data = await response.json();

      // 5. Update state sesuai hasil prediksi dari backend
      setResult({
        predictedClass: data.predictedClass,
        confidence: data.confidence,
        allScores: data.allScores
      });

      if (data.status === 'success' && data.confidence >= CONFIDENCE_THRESHOLD) {
        setAppState(APP_STATES.RESULT_SUCCESS);
      } else {
        setAppState(APP_STATES.RESULT_UNKNOWN);
      }

    } catch (err) {
      console.error("Scanning failed:", err);
      // Munculkan pesan error ke user menggunakan Toast
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        setError("Gagal menghubungi server. Pastikan Backend FastAPI sudah berjalan.");
      } else {
        setError(err.message || "Terjadi kesalahan saat memproses gambar. Silakan coba lagi.");
      }
      setAppState(APP_STATES.PREVIEW); // Kembali ke state preview agar user bisa mencoba lagi
    }
  }, [file]);

  return {
    appState,
    file,
    result,
    error,
    setError,
    handleFileSelect,
    scanImage,
    resetScan,
  };
}
