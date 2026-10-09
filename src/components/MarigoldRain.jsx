import React from 'react';

export default function MarigoldRain() {
  const petals = Array.from({ length: 18 });

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {petals.map((_, i) => {
        const left = Math.random() * 100;
        const duration = 6 + Math.random() * 8;
        const delay = Math.random() * 5;
        const size = 24 + Math.floor(Math.random() * 20);

        return (
          <div
            key={i}
            className="absolute animate-bounce opacity-80"
            style={{
              left: `${left}%`,
              top: `-50px`,
              fontSize: `${size}px`,
              animation: `marigoldFall ${duration}s linear infinite`,
              animationDelay: `${delay}s`
            }}
          >
            {i % 2 === 0 ? '🌼' : '🌸'}
          </div>
        );
      })}

      <style>{`
        @keyframes marigoldFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
