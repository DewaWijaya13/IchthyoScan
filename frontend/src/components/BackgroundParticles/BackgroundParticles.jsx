export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
      {/* Fallback simple background if pure CSS animation is too complex for tailwind arbitrary values */}
      {/* We keep the custom CSS classes for these specific particles in index.css */}
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className={`absolute rounded-full opacity-0 animate-[particleFloat_linear_infinite] ${
            i % 3 === 0 
              ? 'bg-transparent border border-cyan-200' 
              : 'bg-[radial-gradient(circle,theme(colors.cyan.200),transparent)]'
          }`}
          style={{
            left: `${[5, 15, 25, 35, 45, 55, 65, 75, 85, 92, 10, 50][i]}%`,
            width: `${[6, 4, 8, 5, 3, 7, 4, 6, 5, 3, 10, 4][i]}px`,
            height: `${[6, 4, 8, 5, 3, 7, 4, 6, 5, 3, 10, 4][i]}px`,
            animationDuration: `${[18, 22, 15, 20, 25, 17, 21, 19, 23, 16, 24, 14][i]}s`,
            animationDelay: `${[0, 2, 4, 1, 5, 3, 6, 2, 4, 7, 8, 3][i]}s`,
            display: i >= 6 ? 'none' : 'block' // simple mobile hiding logic
          }}
        />
      ))}
      <style>{`
        @media (min-width: 768px) {
          .animate-\\[particleFloat_linear_infinite\\] { display: block !important; }
        }
      `}</style>
    </div>
  );
}
