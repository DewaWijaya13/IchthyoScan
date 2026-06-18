import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, X } from 'lucide-react';

export default function Toast({ message, onClose, duration = 4000 }) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setIsClosing(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  useEffect(() => {
    if (isClosing) {
      const closeTimer = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 300); // Wait for exit animation
      return () => clearTimeout(closeTimer);
    }
  }, [isClosing, onClose]);

  if (!message) return null;

  return createPortal(
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 left-4 sm:left-auto z-[9999] pointer-events-none flex flex-col gap-2" aria-live="assertive">
      <div 
        className={`pointer-events-auto bg-red-50 border border-red-200 border-l-4 border-l-red-500 text-red-600 p-4 pr-12 rounded-lg shadow-lg flex items-start gap-3 min-w-[280px] max-w-[400px] w-full sm:w-auto relative ${isClosing ? 'animate-[slideOutRight_0.3s_ease-in_forwards]' : 'animate-[slideInRight_0.3s_cubic-bezier(0.16,1,0.3,1)_forwards]'}`} 
        role="alert"
      >
        <AlertCircle size={20} className="mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="font-semibold text-sm mb-0.5">Error Validasi</p>
          <p className="text-xs text-red-500/80 leading-relaxed">{message}</p>
        </div>
        <button
          className="absolute top-3 right-3 text-red-400 hover:text-red-600 hover:bg-red-100/50 w-6 h-6 flex items-center justify-center rounded transition-all"
          onClick={() => setIsClosing(true)}
          aria-label="Tutup notifikasi"
        >
          <X size={16} />
        </button>
      </div>
      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(100%); }
        }
      `}</style>
    </div>,
    document.body
  );
}
