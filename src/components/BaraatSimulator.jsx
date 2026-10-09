import React, { useState, useEffect } from 'react';
import { FastForward, Zap, Flame, AlertTriangle, Play, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton, SectionHeader } from './ui';

export default function BaraatSimulator() {
  const [speed, setSpeed] = useState(1);
  const [naaginDancers, setNaaginDancers] = useState(2);
  const [moneyCount, setMoneyCount] = useState(0);
  const [isDerailed, setIsDerailed] = useState(false);
  const [position, setPosition] = useState(0);

  // Animate movement across screen based on speed
  useEffect(() => {
    if (isDerailed) return;

    const interval = setInterval(() => {
      setPosition((prev) => (prev + speed * 1.5) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, [speed, isDerailed]);

  const handleAccelerate = () => {
    shaadiAudio.playDhol();

    if (speed >= 10) {
      // DERAILMENT EVENT!
      setIsDerailed(true);
      shaadiAudio.playDramaticHit();

      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.5 }
      });
      return;
    }

    setSpeed((prev) => prev + 1);
  };

  const handleThrowMoney = () => {
    shaadiAudio.playPop();
    setMoneyCount((prev) => prev + 500);

    confetti({
      particleCount: 30,
      spread: 60,
      colors: ['#85bb65', '#ffd700', '#000000'],
      origin: { y: 0.6 }
    });
  };

  const handleAddNaagin = () => {
    shaadiAudio.playShehnaiNote(880, 0.5);
    setNaaginDancers((prev) => prev + 1);
  };

  const handleReset = () => {
    shaadiAudio.playPop();
    setIsDerailed(false);
    setSpeed(1);
    setPosition(0);
  };

  return (
    <section id="baraat" className="py-20 px-4 bg-gradient-to-b from-red-950 via-red-900 to-red-950 text-center relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <SectionHeader
          badge="🚨 INTERACTIVE BARAAT SIMULATOR 🚨"
          title="THE BARAAT IS COMING!"
          subtitle="Control the noise, speed, and money throwing of Tanish’s grand entry"
        />

        {/* Baraat Simulator Display Screen */}
        <div className="indian-border-gold velvet-bg rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[360px] flex flex-col justify-between">
          
          {/* Top Status Bar */}
          <div className="flex justify-between items-center bg-black/80 text-amber-300 p-3 rounded-xl border border-amber-400/50 font-pixel text-xs sm:text-sm flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span>⚡ SPEED LEVEL:</span>
              <span className="text-yellow-400 text-lg font-bold">{speed}x</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💸 MONEY THROWN:</span>
              <span className="text-green-400 text-lg font-bold">₹{moneyCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🐍 NAAGIN DANCERS:</span>
              <span className="text-orange-400 text-lg font-bold">{naaginDancers}</span>
            </div>
          </div>

          {/* Animated Road & Moving Characters */}
          <div className="my-10 relative h-36 bg-gradient-to-r from-red-950 via-red-900 to-red-950 rounded-2xl border-y-4 border-dashed border-amber-400/80 overflow-hidden flex items-center">
            
            {/* Road Lane Lines */}
            <div className="absolute inset-x-0 top-1/2 border-b-2 border-dashed border-amber-400/40"></div>

            {/* Moving Baraat Group */}
            {!isDerailed ? (
              <div 
                className="absolute flex items-center gap-4 text-4xl sm:text-6xl transition-all duration-75 whitespace-nowrap"
                style={{ left: `${position}%` }}
              >
                {/* Dhol Wala */}
                <span className="animate-bounce" style={{ animationDuration: `${0.8 / speed}s` }}>🥁</span>
                
                {/* Naagin Dancers */}
                {Array.from({ length: naaginDancers }).map((_, i) => (
                  <span key={i} className="animate-spin text-3xl sm:text-5xl" style={{ animationDuration: `${1.2 / speed}s` }}>
                    🐍
                  </span>
                ))}

                {/* Relatives Dancing */}
                <span className="animate-bounce" style={{ animationDuration: `${0.6 / speed}s` }}>🕺</span>
                <span className="animate-pulse">💃</span>
                
                {/* Groom on Horse (Ghodi) */}
                <div className="relative inline-block">
                  <span className="text-5xl sm:text-7xl">🏇</span>
                  <span className="absolute -top-3 left-3 text-2xl">👑</span>
                </div>

                {/* Money Notes Floating */}
                {moneyCount > 0 && <span className="animate-ping text-3xl">💸</span>}
              </div>
            ) : (
              /* DERAILMENT CRASH DISPLAY */
              <div className="w-full text-center py-4 bg-red-950/90 border-4 border-red-600 rounded-xl animate-bounce">
                <div className="text-5xl sm:text-7xl mb-2">💥 🏇 💥</div>
                <h3 className="text-2xl sm:text-4xl font-yatra text-yellow-300">
                  BHAI BAS KAR. DULHA GIR JAYEGA!
                </h3>
                <p className="text-amber-100 font-pixel text-xs sm:text-sm mt-2">
                  Tanish has fallen off the ghodi due to extreme Naagin dance speed!
                </p>
                <ShaadiButton
                  onClick={handleReset}
                  size="md"
                  iconLeft="🔄"
                  className="mt-4"
                >
                  HELP GROOM BACK ON HORSE
                </ShaadiButton>
              </div>
            )}

          </div>

          {/* Interactive Control Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Faster Button */}
            <ShaadiButton
              onClick={handleAccelerate}
              disabled={isDerailed}
              playSound={false}
              size="lg"
              iconLeft={<FastForward className="w-6 h-6 fill-current" />}
            >
              MAKE BARAAT FASTER 🚀
            </ShaadiButton>

            {/* Throw Money Button */}
            <ShaadiButton
              onClick={handleThrowMoney}
              disabled={isDerailed}
              playSound={false}
              variant="green"
              size="lg"
            >
              THROW MONEY (💸 ₹500)
            </ShaadiButton>

            {/* Add Naagin Button */}
            <ShaadiButton
              onClick={handleAddNaagin}
              disabled={isDerailed}
              playSound={false}
              variant="orange"
              size="lg"
            >
              ADD NAAGIN DANCER 🐍
            </ShaadiButton>

          </div>

        </div>

      </div>

    </section>
  );
}
