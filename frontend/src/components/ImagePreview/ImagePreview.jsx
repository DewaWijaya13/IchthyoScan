import { useMemo } from 'react';
import { ScanSearch, X } from 'lucide-react';

export default function ImagePreview({ file, onScan, onCancel }) {
  const previewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!file) return null;

  return (
    <div className="glass-card p-6 sm:p-8 animate-pop-in">
      <div className="relative w-full max-w-[320px] mx-auto mb-6 rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
        <img
          className="w-full h-full object-cover"
          src={previewUrl}
          alt={`Preview dari ${file.name}`}
        />
      </div>

      <div className="text-center mb-6">
        <p className="font-semibold text-sm sm:text-base text-slate-900 mb-1 break-all">
          {file.name}
        </p>
        <p className="text-xs sm:text-sm text-slate-500">
          {formatSize(file.size)} &nbsp;·&nbsp; {file.type.split('/')[1].toUpperCase()}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          className="inline-flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-r from-cyan-600 to-teal-500 px-6 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(8,145,178,0.3)] active:scale-95 animate-btn-pulse"
          onClick={onScan}
        >
          <ScanSearch size={18} />
          Mulai Analisis
        </button>
        <button
          className="inline-flex items-center justify-center gap-2 font-medium text-slate-600 bg-transparent border border-slate-300 px-6 py-2.5 rounded-lg transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 active:scale-95"
          onClick={onCancel}
        >
          <X size={18} />
          Ganti Gambar
        </button>
      </div>
    </div>
  );
}
