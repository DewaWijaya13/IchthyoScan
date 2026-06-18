export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200 bg-white text-center">
      <div className="max-w-6xl mx-auto flex flex-col gap-2 items-center">
        <p className="text-sm text-slate-500">
          &copy; {currentYear} IchthyoScan. Hak Cipta Dilindungi.
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          Powered by <span className="font-semibold text-slate-500">EfficientNet-B0</span> &amp; <span className="font-semibold text-slate-500">React</span>
        </div>
      </div>
    </footer>
  );
}
