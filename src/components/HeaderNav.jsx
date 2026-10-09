import React, { useState } from 'react';
import { Volume2, VolumeX, Tv, Sparkles, Menu, X, Music, Heart } from 'lucide-react';
import { shaadiAudio } from '../utils/audio';

export default function HeaderNav({
  isMuted,
  setIsMuted,
  crtMode,
  setCrtMode,
  marigoldRain,
  setMarigoldRain
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '🏠 Swagat', href: '#opening' },
    { label: '❤️ Couple', href: '#couple' },
    { label: '📖 Love Story', href: '#lovestory' },
    { label: '👨‍👩‍👧 Family', href: '#family' },
    { label: '💃 Events', href: '#events' },
    { label: '🐎 Baraat', href: '#baraat' },
    { label: '📸 Photos', href: '#photos' },
    { label: '📍 Venue', href: '#venue' },
    { label: '🍽️ Food', href: '#food' },
    { label: '📢 RSVP', href: '#rsvp' },
    { label: '💌 Blessings', href: '#blessings' }
  ];

  const handleAudioToggle = () => {
    const isPlaying = shaadiAudio.toggleBGM();
    setIsMuted(!isPlaying);
  };

  const handleLinkClick = () => {
    shaadiAudio.playPop();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-red-950 via-red-900 to-red-950 border-b-4 border-amber-400 shadow-2xl px-3 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo / Title */}
        <a 
          href="#opening" 
          onClick={handleLinkClick}
          className="flex items-center gap-2 text-amber-300 hover:text-amber-100 font-yatra text-xl md:text-2xl tracking-wide group"
        >
          <span className="text-2xl group-hover:rotate-180 transition-transform duration-500">🪔</span>
          <span className="gold-gradient-text drop-shadow">AKRITI ❤️ TANISH</span>
          <span className="bg-amber-400 text-red-950 text-xs px-2 py-0.5 rounded font-pixel font-bold hidden sm:inline-block border border-red-800">
            EST. 2026
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-amber-200 hover:text-amber-950 hover:bg-amber-400 px-2.5 py-1 rounded-full text-xs font-bold transition-all border border-amber-500/30 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Controls (Sound, CRT, Marigold, Mobile Menu) */}
        <div className="flex items-center gap-2">
          
          {/* Sound Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all ${
              !isMuted 
                ? 'bg-amber-400 text-red-950 border-amber-300 animate-pulse shadow-lg' 
                : 'bg-red-900 text-amber-200 border-amber-600/50'
            }`}
            title="Toggle Retro Wedding Music (Shehnai/Dhol)"
          >
            {!isMuted ? (
              <>
                <Volume2 className="w-4 h-4 text-red-950 animate-bounce" />
                <span className="hidden sm:inline">MUSIC: ON 🎶</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">MUSIC: OFF</span>
              </>
            )}
          </button>

          {/* CRT 90s TV Toggle */}
          <button
            onClick={() => {
              shaadiAudio.playPop();
              setCrtMode(!crtMode);
            }}
            className={`p-1.5 rounded-full border-2 text-xs font-bold flex items-center gap-1 ${
              crtMode ? 'bg-green-500 text-black border-green-300' : 'bg-red-900 text-amber-300 border-amber-600/50'
            }`}
            title="Toggle 90s VHS / CRT Scanlines Effect"
          >
            <Tv className="w-4 h-4" />
            <span className="hidden md:inline">{crtMode ? 'CRT: ON' : '90s TV'}</span>
          </button>

          {/* Marigold Rain Toggle */}
          <button
            onClick={() => {
              shaadiAudio.playPop();
              setMarigoldRain(!marigoldRain);
            }}
            className={`p-1.5 rounded-full border-2 text-xs font-bold flex items-center gap-1 ${
              marigoldRain ? 'bg-orange-500 text-white border-orange-300' : 'bg-red-900 text-amber-300 border-amber-600/50'
            }`}
            title="Toggle Marigold Flower Rain"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden md:inline">{marigoldRain ? 'FLOWERS: ON' : 'FLOWERS'}</span>
          </button>

          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-amber-300 p-1.5 border border-amber-500 rounded-md bg-red-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 pt-2 border-t border-amber-500/50 grid grid-cols-2 gap-2 bg-red-950/95 p-3 rounded-lg border-2 border-amber-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-amber-200 hover:bg-amber-400 hover:text-red-950 p-2 rounded text-xs font-bold text-center border border-amber-500/20"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
