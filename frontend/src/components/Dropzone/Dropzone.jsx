import { useState, useRef, useCallback } from 'react';
import { UploadCloud, FolderSearch } from 'lucide-react';

export default function Dropzone({ onFileAccepted, onValidationError }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const inputRef = useRef(null);

  const validateFile = useCallback((file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      onValidationError('Format tidak didukung. Gunakan JPG atau PNG.');
      return false;
    }

    if (file.size > maxSize) {
      onValidationError('Ukuran file terlalu besar. Maksimal 5MB.');
      return false;
    }

    return true;
  }, [onValidationError]);

  const handleFile = useCallback((file) => {
    if (validateFile(file)) {
      onFileAccepted(file);
    }
  }, [validateFile, onFileAccepted]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragActive(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
    e.target.value = '';
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`relative overflow-hidden border-2 border-dashed rounded-2xl p-10 sm:p-16 text-center cursor-pointer transition-all duration-300 group
        ${isDragActive 
          ? 'border-cyan-500 bg-cyan-50 scale-[1.02] shadow-[0_0_30px_rgba(6,182,212,0.15)]' 
          : 'border-slate-300 bg-white hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:-translate-y-0.5'
        }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Area unggah gambar. Tarik dan lepas foto ikan atau klik untuk memilih file."
    >
      <input
        ref={inputRef}
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleInputChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className={`mx-auto mb-4 flex justify-center transition-all duration-500 ${isDragActive ? 'text-cyan-500 -translate-y-2 scale-110' : 'text-slate-400 group-hover:text-cyan-500 group-hover:-translate-y-1'}`}>
        <UploadCloud size={48} strokeWidth={1.5} className={`${!isDragActive && 'animate-[float_3s_ease-in-out_infinite]'}`} />
      </div>

      <p className={`font-medium mb-2 transition-colors duration-200 ${isDragActive ? 'text-cyan-600' : 'text-slate-900'}`}>
        {isDragActive
          ? 'Lepaskan gambar Anda di sini!'
          : 'Tarik & Lepas Foto Ikan Anda di Sini'}
      </p>

      {!isDragActive && (
        <>
          <div className="flex items-center gap-4 my-4 text-xs text-slate-400 before:flex-1 before:h-px before:bg-slate-200 after:flex-1 after:h-px after:bg-slate-200">
            ATAU
          </div>
          
          <button
            className="inline-flex items-center gap-2 font-semibold text-white bg-gradient-to-r from-cyan-600 to-teal-500 px-6 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            type="button"
          >
            <FolderSearch size={18} />
            Jelajahi File
          </button>
          
          <p className="mt-4 text-xs text-slate-500">
            Mendukung: JPG, PNG &nbsp;·&nbsp; Maks: 5MB
          </p>
        </>
      )}
    </div>
  );
}
