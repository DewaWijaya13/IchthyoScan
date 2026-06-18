import { useMemo } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function UnknownCard({ file, onReset }) {
  const previewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

  return (
    <div className="bg-white border border-amber-200 rounded-2xl p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.15)] text-center animate-slide-up">
      <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-amber-700 uppercase bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full mb-8">
        <AlertTriangle size={16} />
        Spesies Tidak Dikenali
      </span>

      <div className="w-[200px] h-[150px] mx-auto mb-8 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
        <img
          className="w-full h-full object-cover filter grayscale opacity-80"
          src={previewUrl}
          alt="Gambar tidak dapat diklasifikasikan"
        />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
        Spesies Tidak Dapat Diidentifikasi
      </h2>
      <p className="text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto">
        Model tidak cukup yakin untuk mengklasifikasikan gambar ini.
        Tingkat keyakinan di bawah ambang batas 70%.
      </p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left mb-8 max-w-lg mx-auto">
        <p className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <span className="text-amber-500 text-lg">💡</span> Tips untuk hasil yang lebih baik:
        </p>
        <ul className="space-y-2">
          {['Pastikan foto berisi salah satu ikan target (Bawal Putih, Kembung, Pari, atau Tuna)',
            'Gunakan pencahayaan yang cukup dan terang',
            'Foto close-up dari sisi samping ikan memberikan hasil terbaik',
            'Hindari gambar yang buram atau terlalu gelap'
          ].map((tip, i) => (
            <li key={i} className="text-sm text-slate-600 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-cyan-500 before:font-bold">
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="inline-flex items-center justify-center gap-2 font-semibold text-amber-600 bg-transparent border-2 border-amber-500 px-8 py-3 rounded-xl transition-all duration-200 hover:bg-amber-500 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95 w-full sm:w-auto"
        onClick={onReset}
      >
        <RefreshCcw size={18} />
        Coba Gambar Lain
      </button>
    </div>
  );
}
