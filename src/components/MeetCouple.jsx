import React, { useState } from 'react';
import { Heart, Sparkles, Star, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton } from './ui';

export default function MeetCouple() {
  const [akritiLikes, setAkritiLikes] = useState(999);
  const [tanishLikes, setTanishLikes] = useState(404);
  const [activeEffect, setActiveEffect] = useState(null);

  const triggerHearts = (person) => {
    shaadiAudio.playPop();
    shaadiAudio.playCelebrationFanfare();
    
    if (person === 'akriti') setAkritiLikes(prev => prev + 1);
    if (person === 'tanish') setTanishLikes(prev => prev + 1);

    setActiveEffect(person);
    setTimeout(() => setActiveEffect(null), 1200);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    });
  };

  return (
    <section id="couple" className="py-20 px-4 bg-gradient-to-b from-red-950 via-red-900 to-red-950 text-center relative overflow-hidden">
      
      {/* Title Header */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-amber-400 font-pixel text-xs sm:text-sm tracking-widest mb-2 blink-slow">
          ★ BOLLYWOOD DRAMA PRESENTATION ★
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-yatra gold-gradient-text tracking-wide drop-shadow">
          MEET THE TWO PEOPLE WHO SAID YES
        </h2>
        <p className="text-amber-200 font-script text-2xl sm:text-3xl mt-2">
          (Or were gently coerced by their respective Indian mothers)
        </p>
      </div>

      {/* Two Decorative Portrait Frames Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 px-4">
        
        {/* THE BRIDE: AKRITI */}
        <div className="relative group">
          <div className="indian-border-gold bg-red-900 rounded-3xl p-6 shadow-2xl relative velvet-bg transform group-hover:-translate-y-2 transition-transform duration-300">
            
            {/* Crown & Flower Accents */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-red-950 px-6 py-1 rounded-full font-yatra text-xl border-2 border-red-900 shadow-lg">
              👑 THE BRIDE
            </div>

            {/* Portrait Frame */}
            <div className="mt-4 relative border-8 border-amber-400 rounded-2xl overflow-hidden shadow-inner bg-gradient-to-t from-pink-900 to-amber-900 aspect-square flex flex-col items-center justify-center p-6">
              
              {/* Retro Illustrated Placeholder Graphic for Akriti */}
              <div className="relative text-center">
                <div className="text-8xl sm:text-9xl mb-2 animate-bounce">
                  👰🏻‍♀️
                </div>
                <div className="bg-amber-400 text-red-950 font-yatra text-2xl px-4 py-1 rounded-md border-2 border-red-900 shadow inline-block">
                  AKRITI
                </div>
              </div>

              {/* Heart Burst Animated Overlay */}
              {activeEffect === 'akriti' && (
                <div className="absolute inset-0 bg-pink-500/30 flex items-center justify-center backdrop-blur-xs animate-ping">
                  <span className="text-8xl">💖</span>
                </div>
              )}

              {/* Romantic Sparkle Trail */}
              <div className="absolute top-2 right-2 text-amber-300 text-2xl animate-spin">
                ✨
              </div>
            </div>

            {/* Caption & Quirk Badges */}
            <div className="mt-6 space-y-3">
              <p className="text-amber-300 font-rozha text-xl sm:text-2xl italic">
                “Apparently, she said yes willingly.”
              </p>
              
              <div className="bg-red-950/80 p-4 rounded-xl border border-amber-500/40 text-xs sm:text-sm text-amber-100 text-left space-y-1 font-poppins">
                <p>💃 <strong>Superpower:</strong> Shopping for 8 hours without drinking water</p>
                <p>☕ <strong>Weakness:</strong> Cold Coffee & Instagram Reels</p>
                <p>📜 <strong>Verdict:</strong> Approved by 14 Mami-jis & 8 Bua-jis</p>
              </div>

              {/* Interactive Heart Explosion Button */}
              <ShaadiButton
                variant="pink"
                size="md"
                fullWidth
                playSound={false}
                onClick={() => triggerHearts('akriti')}
                iconLeft={<Heart className="w-5 h-5 fill-current animate-pulse text-yellow-300" />}
                iconRight={<Sparkles className="w-5 h-5 text-yellow-300" />}
              >
                SEND BLESSINGS ({akritiLikes})
              </ShaadiButton>
            </div>

          </div>
        </div>

        {/* THE GROOM: TANISH */}
        <div className="relative group">
          <div className="indian-border-gold bg-red-900 rounded-3xl p-6 shadow-2xl relative velvet-bg transform group-hover:-translate-y-2 transition-transform duration-300">
            
            {/* Crown & Flower Accents */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 text-red-950 px-6 py-1 rounded-full font-yatra text-xl border-2 border-red-900 shadow-lg">
              🕺 THE GROOM
            </div>

            {/* Portrait Frame */}
            <div className="mt-4 relative border-8 border-amber-400 rounded-2xl overflow-hidden shadow-inner bg-gradient-to-t from-orange-900 to-amber-900 aspect-square flex flex-col items-center justify-center p-6">
              
              {/* Retro Illustrated Placeholder Graphic for Tanish */}
              <div className="relative text-center">
                <div className="text-8xl sm:text-9xl mb-2 animate-bounce">
                  🤵🏻‍♂️
                </div>
                <div className="bg-amber-400 text-red-950 font-yatra text-2xl px-4 py-1 rounded-md border-2 border-red-900 shadow inline-block">
                  TANISH
                </div>
              </div>

              {/* Heart Burst Animated Overlay */}
              {activeEffect === 'tanish' && (
                <div className="absolute inset-0 bg-yellow-500/30 flex items-center justify-center backdrop-blur-xs animate-ping">
                  <span className="text-8xl">💥</span>
                </div>
              )}

              {/* Romantic Sparkle Trail */}
              <div className="absolute top-2 right-2 text-amber-300 text-2xl animate-spin">
                ⭐
              </div>
            </div>

            {/* Caption & Quirk Badges */}
            <div className="mt-6 space-y-3">
              <p className="text-amber-300 font-rozha text-xl sm:text-2xl italic">
                “He was given approximately 3 seconds to think.”
              </p>
              
              <div className="bg-red-950/80 p-4 rounded-xl border border-amber-500/40 text-xs sm:text-sm text-amber-100 text-left space-y-1 font-poppins">
                <p>🍗 <strong>Superpower:</strong> Finishing Paneer Tikka in 4 seconds</p>
                <p>🎮 <strong>Weakness:</strong> Saying "Haji Papa" to everything</p>
                <p>📜 <strong>Verdict:</strong> Will now ask Akriti for permission for everything</p>
              </div>

              {/* Interactive Heart Explosion Button */}
              <ShaadiButton
                variant="orange"
                size="md"
                fullWidth
                playSound={false}
                onClick={() => triggerHearts('tanish')}
                iconLeft={<Heart className="w-5 h-5 fill-current animate-pulse text-red-900" />}
                iconRight={<Zap className="w-5 h-5 text-red-900" />}
              >
                SALUTE TANISH ({tanishLikes})
              </ShaadiButton>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
}
