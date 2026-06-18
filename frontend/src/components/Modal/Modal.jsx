import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 animate-fade-in" 
      onClick={handleBackdropClick} 
      role="presentation"
    >
      <div
        className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] sm:max-h-[85vh] flex flex-col animate-slide-up relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={modalRef}
      >
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 id="modal-title" className="text-xl font-bold text-slate-900 m-0">
            {title}
          </h2>
          <button
            className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 transition-all"
            onClick={onClose}
            aria-label="Tutup modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5 sm:p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export function AboutModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tentang Model AI">
      <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
        <p>
          IchthyoScan menggunakan arsitektur <strong className="text-slate-900">EfficientNet-B0</strong>, sebuah model 
          <em> convolutional neural network</em> yang dioptimalkan secara matematis untuk menyeimbangkan 
          kedalaman, lebar, dan resolusi jaringan, sehingga sangat efisien dan akurat.
        </p>
        <p>
          Model ini telah dilatih khusus menggunakan dataset gambar ikan lokal untuk mengenali 4 spesies 
          ikan laut Indonesia yang bernilai ekonomis tinggi.
        </p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-6">
          <div className="flex justify-between py-2 border-b border-dashed border-slate-200">
            <span className="font-medium text-slate-900">Arsitektur</span>
            <span className="font-mono text-cyan-600">EfficientNet-B0</span>
          </div>
          <div className="flex justify-between py-2 border-b border-dashed border-slate-200">
            <span className="font-medium text-slate-900">Resolusi Input</span>
            <span className="font-mono text-cyan-600">224 × 224 px</span>
          </div>
          <div className="flex justify-between py-2 border-b border-dashed border-slate-200">
            <span className="font-medium text-slate-900">Jumlah Kelas</span>
            <span className="font-mono text-cyan-600">4 Spesies</span>
          </div>
          <div className="flex justify-between py-2 border-b border-dashed border-slate-200">
            <span className="font-medium text-slate-900">Format Model</span>
            <span className="font-mono text-cyan-600">.h5 (Keras)</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="font-medium text-slate-900">Ambang Keyakinan</span>
            <span className="font-mono text-cyan-600">&ge; 70%</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function GuideModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Panduan Penggunaan">
      <div className="text-slate-600 leading-relaxed text-sm sm:text-base">
        <p className="mb-4">
          Untuk mendapatkan hasil klasifikasi yang paling akurat, ikuti panduan pengambilan gambar berikut:
        </p>
        <ul className="space-y-3 pl-4 mb-6">
          <li className="relative before:content-['•'] before:absolute before:left-[-1rem] before:text-cyan-500 before:font-bold">
            <strong className="text-slate-900">Fokus pada Ikan:</strong> Pastikan ikan mengambil sebagian besar porsi gambar (di tengah).
          </li>
          <li className="relative before:content-['•'] before:absolute before:left-[-1rem] before:text-cyan-500 before:font-bold">
            <strong className="text-slate-900">Sisi Samping:</strong> Foto ikan dari sisi samping (profil) lebih mudah dikenali daripada dari atas atau depan.
          </li>
          <li className="relative before:content-['•'] before:absolute before:left-[-1rem] before:text-cyan-500 before:font-bold">
            <strong className="text-slate-900">Pencahayaan Baik:</strong> Hindari foto yang terlalu gelap atau memiliki bayangan pekat yang menutupi corak ikan.
          </li>
          <li className="relative before:content-['•'] before:absolute before:left-[-1rem] before:text-cyan-500 before:font-bold">
            <strong className="text-slate-900">Satu Ikan:</strong> Usahakan hanya ada satu ikan utama dalam foto untuk menghindari kebingungan model.
          </li>
          <li className="relative before:content-['•'] before:absolute before:left-[-1rem] before:text-cyan-500 before:font-bold">
            <strong className="text-slate-900">Latar Belakang Bersih:</strong> Latar belakang yang kontras atau bersih membantu model fokus pada fitur ikan.
          </li>
        </ul>
        <p>
          Jika sistem memberikan status "Spesies Tidak Dikenali", silakan coba ambil foto baru dengan mengikuti panduan di atas.
        </p>
      </div>
    </Modal>
  );
}
