import React, { useState, useEffect } from 'react';
import { shaadiAudio } from '../utils/audio';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Preparing Madhubani Canvas & Natural Dyes...');

  useEffect(() => {
    const statusMessages = [
      { p: 10, text: 'Invoking Lord Ganesha with auspicious Shlokas...' },
      { p: 25, text: 'Grinding natural pigments: Haldi, Indigo & Geru...' },
      { p: 45, text: 'Adorning the Kohbar & Mandap with Mithila motifs...' },
      { p: 65, text: 'Tuning the Shehnai & Dholak beats...' },
      { p: 85, text: 'Arranging royal velvet curtains & Toran...' },
      { p: 100, text: '✨ THE CELEBRATION IS READY! ✨' }
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }

        const next = prev + 5;
        const currentMsg = statusMessages.find((m) => next >= m.p);
        if (currentMsg) {
          setStatusText(currentMsg.text);
        }

        return next;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    shaadiAudio.playPop();
    setProgress(100);
    if (onComplete) onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2b080c] flex items-center justify-center p-4">
      
      {/* Background Madhubani Accent Frame */}
      <div className="max-w-xl w-full bg-[#fdf7ea] text-red-950 p-6 sm:p-10 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border-4 border-[#851e18] relative text-center madhubani-parchment overflow-hidden">
        
        {/* Ornate corner borders */}
        <div className="absolute inset-2 border-2 border-dashed border-amber-700/60 rounded-2xl pointer-events-none"></div>

        {/* Auspicious Madhubani Ganesha Icon */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4 rounded-full overflow-hidden border-4 border-amber-600 shadow-xl bg-amber-100/90 flex items-center justify-center relative p-1.5">
          <img
            src="/assets/madhubani/ganesh.webp"
            alt="Bhagwan Ganesha"
            className="w-full h-full object-contain"
          />
        </div>

        <p className="text-xl sm:text-2xl font-yatra text-red-900 tracking-wider">
          ॥ श्री गणेशाय नमः ॥
        </p>

        <h2 className="text-3xl sm:text-4xl font-rozha text-amber-950 font-bold mt-1 tracking-wide">
          SHUBH VIVAH
        </h2>

        <div className="bg-amber-600/10 text-amber-900 font-pixel text-[11px] px-3 py-1 rounded-full border border-amber-700/30 inline-block font-bold mt-2 mb-4">
          MITHILA MADHUBANI EDITION
        </div>

        {/* Dynamic Status Text */}
        <div className="min-h-[48px] flex items-center justify-center my-2">
          <p className="text-amber-950 font-rozha text-base sm:text-lg italic">
            “{statusText}”
          </p>
        </div>

        {/* Madhubani Progress Bar */}
        <div className="my-5">
          <div className="w-full bg-[#ebd5b3] h-7 rounded-full border-2 border-[#851e18] p-1 relative shadow-inner overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 rounded-full transition-all duration-150 flex items-center justify-end pr-2 shadow-sm"
              style={{ width: `${progress}%` }}
            >
              {progress > 18 && (
                <span className="text-red-950 font-pixel text-[10px] font-bold">
                  {progress}%
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between text-[10px] font-pixel text-amber-900 mt-2 font-bold px-1">
            <span>0%</span>
            <span>PREPARING CELEBRATION...</span>
            <span>100%</span>
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="mt-2 bg-[#851e18] hover:bg-amber-700 text-amber-100 font-pixel text-[11px] px-5 py-2.5 rounded-xl border border-amber-400 transition-all cursor-pointer shadow-md"
        >
          ⚡ SKIP TO WEDDING
        </button>

      </div>

    </div>
  );
}
