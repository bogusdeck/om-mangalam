import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { shaadiAudio } from '../utils/audio';

export default function LeftAside({ isMuted, setIsMuted }) {
  const handleAudioToggle = () => {
    const isPlaying = shaadiAudio.toggleBGM();
    setIsMuted(!isPlaying);
  };

  return (
    <aside className="fixed top-4 left-4 z-50 flex flex-col gap-2">
      
      {/* Couple Initials Badge */}
      <a
        href="#opening"
        onClick={() => shaadiAudio.playPop()}
        className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 text-amber-300 px-4 py-2 rounded-2xl border-4 border-amber-400 shadow-2xl flex items-center gap-2 hover:scale-105 transition-all group cursor-pointer"
        title="Akriti & Tanish — Shubh Vivah"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">🪔</span>
        <span className="font-yatra text-xl sm:text-2xl gold-gradient-text tracking-widest font-bold">
          A <span className="text-red-500 text-lg sm:text-xl inline-block animate-ping">❤️</span> T
        </span>
      </a>

      {/* Compact Audio Toggle Button */}
      <button
        onClick={handleAudioToggle}
        className={`px-3 py-1.5 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xl cursor-pointer ${
          !isMuted 
            ? 'bg-amber-400 text-red-950 border-amber-300 animate-pulse' 
            : 'bg-red-950/90 text-amber-300 border-amber-500/50 hover:bg-red-900'
        }`}
        title="Toggle Wedding Shehnai & Dhol Music"
      >
        {!isMuted ? (
          <>
            <Volume2 className="w-4 h-4 text-red-950" />
            <span>MUSIC: ON 🎶</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-amber-400" />
            <span>MUSIC: OFF</span>
          </>
        )}
      </button>

    </aside>
  );
}
