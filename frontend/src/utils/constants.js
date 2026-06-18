export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const FISH_CLASSES = ['Bawal Putih', 'Kembung', 'Pari', 'Tuna'];

export const CONFIDENCE_THRESHOLD = 0.70;

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

export const SPECIES_INFO = [
  {
    id: 'bawal-putih',
    name: 'Bawal Putih',
    latin: 'Pampus argenteus',
    description: 'Ikan air laut bertubuh pipih dan lebar dengan warna perak keputihan. Populer sebagai ikan konsumsi premium di Asia Tenggara.',
    image: 'bawal-putih.jpg',
  },
  {
    id: 'kembung',
    name: 'Kembung',
    latin: 'Rastrelliger kanagurta',
    description: 'Ikan pelagis kecil dengan punggung biru-hijau dan perut keperakan. Salah satu ikan laut paling umum di pasar tradisional Indonesia.',
    image: 'kembung.jpg',
  },
  {
    id: 'pari',
    name: 'Pari',
    latin: 'Dasyatis sp.',
    description: 'Ikan bertubuh pipih berbentuk berlian dengan ekor panjang. Dikenal dengan gerakan terbang anggun di bawah air.',
    image: 'pari.jpg',
  },
  {
    id: 'tuna',
    name: 'Tuna',
    latin: 'Thunnus sp.',
    description: 'Ikan pelagis besar dengan tubuh aerodinamis dan kemampuan berenang cepat. Bernilai ekonomi tinggi di pasar global.',
    image: 'tuna.jpg',
  },
];

export const APP_STATES = {
  IDLE: 'IDLE',
  PREVIEW: 'PREVIEW',
  SCANNING: 'SCANNING',
  RESULT_SUCCESS: 'RESULT_SUCCESS',
  RESULT_UNKNOWN: 'RESULT_UNKNOWN',
};
