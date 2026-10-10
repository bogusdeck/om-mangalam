import React, { useState } from 'react';
import { Sparkles, Heart, Flame, Music, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton } from './ui';

export default function FinalCelebration() {
  const [chaosMode, setChaosMode] = useState(false);

  const triggerMegaCelebration = () => {
    shaadiAudio.playDramaticHit();
    shaadiAudio.playCelebrationFanfare();
    shaadiAudio.playDhol();
    setChaosMode(true);

    // Launch multi-stage fireworks confetti blast!
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section id="finale" className="py-24 px-4 bg-gradient-to-t from-red-950 via-red-900 to-red-950 text-center relative overflow-hidden">
      
      {/* Floating Sparkles Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30 flex justify-between px-10 items-center">
        <div className="text-8xl animate-spin">🪔</div>
        <div className="text-8xl animate-bounce">🎆</div>
        <div className="text-8xl animate-spin">🪔</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Main Grand Card */}
        <div className="indian-border-gold velvet-bg rounded-3xl p-8 sm:p-14 shadow-[0_0_80px_rgba(255,215,0,0.6)]">
          
          {/* Top Marigold Header */}
          <div className="flex justify-center gap-3 text-3xl mb-6">
            🌺 🌼 🪔 🌼 🌺
          </div>

          {/* Huge Main Header */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-yatra gold-gradient-text tracking-wider mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] animate-pulse">
            MILTE HAIN SHAADI MEIN!
          </h2>

          {/* 3 Golden Golden Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 max-w-2xl mx-auto font-yatra text-2xl sm:text-3xl">
            <div className="bg-amber-400 text-red-950 py-3 px-4 rounded-2xl border-4 border-red-900 shadow-lg transform hover:scale-105 transition-transform">
              👔 Dress well.
            </div>
            <div className="bg-amber-400 text-red-950 py-3 px-4 rounded-2xl border-4 border-red-900 shadow-lg transform hover:scale-105 transition-transform">
              🍲 Eat well.
            </div>
            <div className="bg-amber-400 text-red-950 py-3 px-4 rounded-2xl border-4 border-red-900 shadow-lg transform hover:scale-105 transition-transform">
              🕺 Dance badly.
            </div>
          </div>

          {/* Couple Signoff */}
          <div className="my-10 py-6 bg-red-950/80 rounded-2xl border-2 border-amber-400">
            <div className="text-4xl sm:text-6xl font-yatra gold-gradient-text flex items-center justify-center gap-4">
              <span>MEGAN</span>
              <span className="text-red-500 animate-ping">❤️</span>
              <span>BRAD</span>
            </div>
            <p className="text-amber-300 font-rozha text-xl sm:text-2xl mt-3 italic">
              “FOREVER & UNFORTUNATELY TOGETHER”
            </p>
          </div>

          {/* Mega Celebration Button */}
          <ShaadiButton
            onClick={triggerMegaCelebration}
            playSound={false}
            size="xl"
            iconLeft="🎆"
            iconRight="🎆"
            className="bounce-cheesy shadow-[0_0_50px_rgba(255,215,0,0.9)] border-4 border-red-900"
          >
            LAUNCH FINAL FIREWORKS BLAST!
          </ShaadiButton>

          {/* Bottom Copyright Joke */}
          <div className="mt-12 pt-6 border-t-2 border-dashed border-amber-400/50 text-xs font-pixel text-amber-300">
            © 1998-2026 MEGAN FOX & BRAD PITT SHAADI INC. ALL RIGHTS RESERVED. NO REFUNDS ON GIFTS.
          </div>

        </div>

      </div>

    </section>
  );
}
