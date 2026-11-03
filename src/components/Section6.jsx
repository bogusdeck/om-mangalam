import React from 'react';
import { WEDDING_CONFIG } from '../config/weddingConfig';

/**
 * ============================================================================
 * SECTION 6: CELEBRATION OF LOVE (New Section with Section 1 Madhubani Border)
 * ============================================================================
 */
export default function Section6() {
  const bride = WEDDING_CONFIG.bride || {};
  const groom = WEDDING_CONFIG.groom || {};

  return (
    <section
      id="section6"
      className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-8 text-center select-none"
    >
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center">
        {/* Sanskrit Auspicious Invocation Header */}
        <div className="text-amber-400 font-rozha text-xs sm:text-sm md:text-base tracking-widest uppercase mb-1">
          ॥ शुभ परिणय उत्सव ॥
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-yatra gold-gradient-text tracking-wide drop-shadow-md leading-tight font-bold mb-3">
          CELEBRATION OF LOVE
        </h2>

        {/* Subheading */}
        <p className="text-amber-200/90 font-rozha italic text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
          A new chapter begins with sacred vows, endless laughter, and cherished blessings from our loved ones.
        </p>

        {/* Royal Decorative Stage / Card Container */}
        <div className="relative w-full max-w-2xl bg-[#fff8e7] border-4 border-[#1b1210] rounded-2xl shadow-2xl p-6 sm:p-10 text-center text-[#2b1418]">
          {/* Inner Golden Accent Border */}
          <div className="absolute inset-2 sm:inset-3 border-2 border-[#b8862b] rounded-xl pointer-events-none" />

          {/* Auspicious Motif & Names */}
          <div className="text-3xl sm:text-4xl mb-3">🪔 🌸 🪔</div>
          <h3 className="font-shrikhand text-2xl sm:text-3xl text-[#780016] tracking-wide mb-2">
            {bride.displayName || 'Megan'} & {groom.displayName || 'Brad'}
          </h3>
          <p className="font-poppins text-xs sm:text-sm text-[#78350f] font-medium leading-relaxed max-w-md mx-auto">
            Thank you for being an indispensable part of our special journey. May the festivities continue with joy, music, and divine grace!
          </p>

          <div className="w-20 h-0.5 bg-[#b8862b] mx-auto mt-6 mb-4" />

          <div className="text-amber-800 font-rozha italic text-xs sm:text-sm">
            ✨ With warm regards & heartfelt blessings ✨
          </div>
        </div>
      </div>
    </section>
  );
}
