import { useState, useEffect } from 'react';
import { Fish, Menu, X } from 'lucide-react';

export default function Header({ onOpenAbout, onOpenGuide }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200' : 'bg-transparent border-b border-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="p-1.5 bg-cyan-50 rounded-lg group-hover:bg-cyan-100 transition-colors">
            <Fish className="w-6 h-6 text-cyan-600" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            Ichthyo<span className="text-cyan-600">Scan</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-1">
          <button
            onClick={onOpenAbout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-cyan-700 hover:bg-cyan-50 transition-all"
          >
            Tentang Model
          </button>
          <button
            onClick={onOpenGuide}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-cyan-700 hover:bg-cyan-50 transition-all"
          >
            Panduan
          </button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="sm:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-lg animate-fade-in-up px-4 py-3 space-y-1">
          <button
            onClick={() => { onOpenAbout(); setMenuOpen(false); }}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Tentang Model
          </button>
          <button
            onClick={() => { onOpenGuide(); setMenuOpen(false); }}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Panduan
          </button>
        </div>
      )}
    </header>
  );
}
