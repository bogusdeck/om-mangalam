import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { shaadiAudio } from '../utils/audio';

export default function ThemeSwitcher() {
  const { themeId, themes, setTheme } = useTheme();

  const handleSelect = (id) => {
    shaadiAudio.playPop();
    setTheme(id);
  };

  return (
    <div
      aria-label="Theme Color Switcher"
      className="fixed top-3.5 right-6 sm:right-8 z-45 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.6)] select-none"
    >
      <span className="text-amber-300 font-poppins text-[10px] sm:text-xs font-semibold hidden sm:inline-flex items-center gap-1">
        <span>🎨</span>
        <span>Theme:</span>
      </span>
      <div className="flex items-center gap-2">
        {themes.map((th) => {
          const isActive = th.id === themeId;
          return (
            <button
              key={th.id}
              onClick={() => handleSelect(th.id)}
              title={`${th.name} (${th.hex})`}
              className={`relative group flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'ring-2 ring-amber-300 ring-offset-2 ring-offset-black scale-110 shadow-lg'
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
              style={{ width: '22px', height: '22px' }}
            >
              <span
                className="w-full h-full rounded-full border border-white/30 block shadow-inner"
                style={{ backgroundColor: th.swatchColor }}
              />
              {/* Tooltip on Hover */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-amber-200 font-poppins text-[10px] px-2 py-0.5 rounded border border-amber-500/40 shadow-lg whitespace-nowrap z-50">
                {th.name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
