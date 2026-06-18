import { SPECIES_INFO } from '../../utils/constants';
import bawalPutih from '../../assets/fish/bawal-putih.jpg';
import kembung from '../../assets/fish/kembung.jpg';
import pari from '../../assets/fish/pari.jpg';
import tuna from '../../assets/fish/tuna.jpg';

const imageMap = {
  'bawal-putih.jpg': bawalPutih,
  'kembung.jpg': kembung,
  'pari.jpg': pari,
  'tuna.jpg': tuna,
};

export default function SpeciesShowcase() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-[fadeInUp_0.7s_0.2s_ease_both]">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-3">
        Spesies yang Dapat Dikenali
      </h2>
      <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
        Model kami dilatih khusus untuk mengidentifikasi empat spesies ikan laut Indonesia
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SPECIES_INFO.map((species) => (
          <article 
            className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-cyan-200 group" 
            key={species.id}
          >
            <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={imageMap[species.image]}
                alt={`Foto ikan ${species.name}`}
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-slate-900 mb-1">{species.name}</h3>
              <p className="text-xs italic text-cyan-600 mb-3">{species.latin}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{species.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
