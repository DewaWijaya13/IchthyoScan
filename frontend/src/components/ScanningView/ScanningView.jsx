import { useMemo } from 'react';

export default function ScanningView({ file }) {
  const previewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

  return (
    <div className="glass-card p-6 sm:p-8 text-center animate-fade-in" role="status" aria-live="polite">
      <div className="relative w-full max-w-[320px] mx-auto mb-6 rounded-xl overflow-hidden aspect-[4/3] bg-slate-900">
        <img
          className="w-full h-full object-cover brightness-[0.6] saturate-50 transition-all duration-300"
          src={previewUrl}
          alt="Gambar sedang dianalisis"
        />
        {/* Scanner Line */}
        <div className="absolute left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 to-teal-400 shadow-[0_0_15px_rgba(8,145,178,0.6),0_0_40px_rgba(8,145,178,0.3)] animate-[scanLine_2s_ease-in-out_infinite] z-10" aria-hidden="true" />
        
        {/* Pulse Ring */}
        <div className="absolute -inset-1 border-2 border-cyan-500 rounded-xl animate-[pulseRing_1.5s_ease-out_infinite] z-0" aria-hidden="true" />
      </div>

      <div className="mb-6">
        <div className="flex justify-center gap-1.5 mb-2" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-cyan-600 animate-[dotPulse_1.4s_ease-in-out_infinite]" />
          <span className="w-2 h-2 rounded-full bg-cyan-600 animate-[dotPulse_1.4s_ease-in-out_infinite_0.2s]" />
          <span className="w-2 h-2 rounded-full bg-cyan-600 animate-[dotPulse_1.4s_ease-in-out_infinite_0.4s]" />
        </div>
        <p className="text-sm font-medium text-slate-500">
          Menganalisis fitur morfologi ikan...
        </p>
      </div>

      {/* Indeterminate Progress Bar */}
      <div className="w-full max-w-[360px] mx-auto h-1.5 bg-slate-100 rounded-full overflow-hidden" aria-hidden="true">
        <div className="h-full bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full animate-[indeterminateProgress_2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
