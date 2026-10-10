import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import LeftAside from './components/LeftAside';
import MarigoldRain from './components/MarigoldRain';
import { sectionsConfig } from './config/sectionsConfig';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [marigoldRain, setMarigoldRain] = useState(true);

  return (
    <div className="relative min-h-screen bg-red-950 text-amber-100 font-poppins overflow-x-hidden">
      
      {/* 90s Shaadi Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Floating Marigold Petal Rain */}
      {marigoldRain && <MarigoldRain />}

      {/* Left Aside Couple Initials & Sound Toggle */}
      <LeftAside
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Interactive Sections Journey */}
      <main className="relative">
        {sectionsConfig
          .filter((section) => section.enabled)
          .map(({ id, Component }) => (
            <Component key={id} />
          ))}
      </main>

      {/* Retro 90s Marquee Ticker Footer */}
      <footer className="bg-amber-400 text-red-950 font-pixel text-xs py-2 border-t-4 border-red-900 overflow-hidden font-bold">
        <div className="whitespace-nowrap animate-marquee flex gap-8">
          <span>✨ MEGAN FOX WEDS BRAD PITT — 18th NOVEMBER 2026 ✨</span>
          <span>🪔 100% UNLIMITED PANEER GUARANTEED 🪔</span>
          <span>💃 NAAGIN DANCE PERMISSION GRANTED 💃</span>
          <span>🌺 BRING GIFTS & DANCING SKILLS 🌺</span>
          <span>✨ MEGAN FOX WEDS BRAD PITT — 18th NOVEMBER 2026 ✨</span>
        </div>
      </footer>

    </div>
  );
}
