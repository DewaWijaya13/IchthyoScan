import { Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="text-center pt-16 pb-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 text-xs font-bold tracking-widest text-cyan-700 uppercase bg-cyan-50 border border-cyan-100 rounded-full">
        <Zap className="w-4 h-4 text-cyan-500" />
        Powered by EfficientNet-B0
      </div>
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
        Sistem Cerdas Klasifikasi <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500">
          Ikan Laut Indonesia
        </span>
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed">
        Deteksi Bawal Putih, Kembung, Pari, dan Tuna secara real-time
        menggunakan kecerdasan buatan canggih.
      </p>
    </section>
  );
}
