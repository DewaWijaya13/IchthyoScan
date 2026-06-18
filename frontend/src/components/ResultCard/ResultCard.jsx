import { useMemo } from 'react';
import { FISH_CLASSES } from '../../utils/constants';
import { CheckCircle2, RefreshCw } from 'lucide-react';

export default function ResultCard({ file, result, onReset }) {
  const previewUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

  if (!result) return null;

  const { predictedClass, confidence, allScores } = result;

  // Sort scores descending
  const sortedScores = FISH_CLASSES.map((name, i) => ({
    name,
    score: allScores ? allScores[i] : (name === predictedClass ? confidence : 0),
  })).sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white border border-emerald-200 rounded-2xl p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)] animate-slide-up">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-emerald-700 uppercase bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
          <CheckCircle2 size={16} className="animate-[popIn_0.4s_0.2s_ease_both]" />
          Hasil Analisis
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <div className="rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
          <img
            className="w-full h-full object-cover"
            src={previewUrl}
            alt={`Ikan terdeteksi: ${predictedClass}`}
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Spesies Terdeteksi
          </span>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500 mb-6 animate-[fadeInUp_0.5s_0.2s_ease_both]">
            {predictedClass}
          </h2>

          <div className="mb-6">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm font-medium text-slate-600">Tingkat Keyakinan</span>
              <span className="text-2xl font-bold text-emerald-500">
                {(confidence * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <p className="text-xs font-semibold text-slate-500 mb-3">Skor Semua Kelas</p>
            <div className="space-y-2">
              {sortedScores.map(({ name, score }) => (
                <div className="flex items-center gap-3" key={name}>
                  <span className="text-xs text-slate-600 w-24 truncate">{name}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${
                        name === predictedClass
                          ? 'bg-gradient-to-r from-cyan-500 to-teal-500'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${score * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 w-12 text-right">
                    {(score * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          className="inline-flex items-center justify-center gap-2 font-semibold text-white bg-gradient-to-r from-cyan-600 to-teal-500 px-8 py-3 rounded-xl transition-all duration-200 shadow-md hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(8,145,178,0.3)] active:scale-95 w-full sm:w-auto"
          onClick={onReset}
        >
          <RefreshCw size={18} />
          Pindai Ikan Lainnya
        </button>
      </div>
    </div>
  );
}
