import React from 'react';
import { shaadiAudio } from '../utils/audio';
import { WEDDING_CONFIG } from '../config/weddingConfig';

/**
 * ============================================================================
 * SECTION 5: THE ROYAL FAMILIES (ALL CARDS SINGLE-VIEWPORT REVAMP)
 * ============================================================================
 *
 * Requirements:
 * 1. Single Viewport Fit: Fits 100% within the viewport (h-screen). No scrolling required!
 * 2. Heading Formatting:
 *    - Wide Screen (Desktop/Tablet): Strictly ONE SINGLE LINE ("THE PEOPLE RESPONSIBLE FOR THIS")
 *    - Mobile: Strictly TWO LINES ("THE PEOPLE RESPONSIBLE" / "FOR THIS")
 * 3. All Cards Displayed Together:
 *    - All 6 cards shown simultaneously in a balanced royal grid (3 columns x 2 rows on desktop,
 *      2 columns x 3 rows on mobile).
 *    - No arrow buttons (< or >) or page switching.
 *    - No filter tabs (space freed up for cards).
 * 4. Cards contain full details: role badge, avatar portrait with golden ring, name,
 *    title, quote box, and fun stat badge with interactive audio hit on click.
 */

export default function FamilySection() {
  const familyConfig = WEDDING_CONFIG.familySection || {};
  const familyMembers = familyConfig.members || [];

  return (
    <section
      id="family"
      className="relative z-10 w-full h-screen min-h-screen max-h-screen overflow-hidden flex flex-col justify-between pt-7 sm:pt-6 md:pt-8 pb-8 sm:pb-5 md:pb-6 px-2.5 sm:px-6 md:px-10 text-center select-none"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full justify-between">
        
        {/* ============================================================== */}
        {/* 1. TOP HEADER & TITLE                                          */}
        {/* ============================================================== */}
        <div className="text-center pt-0.5 sm:pt-1 flex-shrink-0">
          {/* Festive Top Badge */}
          <div className="inline-block bg-amber-400 text-red-950 font-pixel text-[8px] sm:text-xs px-2 sm:px-3 py-0.5 rounded-full mb-0.5 sm:mb-1 border-2 border-red-900 font-bold shadow-md tracking-wider">
            {familyConfig.badge || '★ CHARACTER CARDS & BOARD OF DIRECTORS ★'}
          </div>

          {/* Heading: Strictly ONE line on wide screen, TWO lines on mobile */}
          <h2 className="font-yatra gold-gradient-text tracking-wide drop-shadow-md text-center">
            {/* Wide Screen: Single Line */}
            <span className="hidden sm:inline-block text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] whitespace-nowrap leading-tight">
              {familyConfig.heading || 'THE PEOPLE RESPONSIBLE FOR THIS'}
            </span>
            {/* Mobile Screen: Two Lines */}
            <span className="inline-block sm:hidden text-lg leading-tight">
              THE PEOPLE RESPONSIBLE<br />FOR THIS
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-amber-200/90 font-rozha italic text-[10px] sm:text-sm md:text-base mt-0.5 max-w-2xl mx-auto px-4 leading-tight">
            {familyConfig.subheading || 'The masterminds who funded, executed, and micro-managed everything'}
          </p>
        </div>

        {/* ============================================================== */}
        {/* 2. ALL CARDS DISPLAYED TOGETHER (NO TABS, NO ARROWS)          */}
        {/* ============================================================== */}
        <div className="w-full flex-1 flex items-center justify-center min-h-0 my-auto py-1 sm:py-2 md:py-3">
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2.5 md:gap-4 lg:gap-5 justify-center items-stretch h-full max-h-[460px] sm:max-h-[540px] md:max-h-[580px]">
            {familyMembers.map((member) => (
              <article
                key={member.id || member.name}
                onClick={() => shaadiAudio.playDramaticHit()}
                className="indian-card-frame velvet-bg rounded-lg sm:rounded-2xl p-1 sm:p-2 md:p-3 lg:p-3.5 text-center shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer relative group flex flex-col justify-between border border-amber-500/40"
              >
                {/* Thin Inner Gold Border */}
                <div className="absolute inset-[2px] sm:inset-[2.5px] rounded-[8px] sm:rounded-[14px] border border-amber-400/25 pointer-events-none" />

                {/* Top Role Badge */}
                <div className="bg-amber-400 text-red-950 font-yatra text-[7.5px] sm:text-[10px] md:text-xs py-0.2 px-1 sm:px-2 rounded border border-red-900/40 inline-block font-bold mx-auto mb-0.5 shadow-sm truncate max-w-[95%]">
                  {member.role}
                </div>

                {/* Avatar Portrait with Golden Ring */}
                <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-13 md:h-13 lg:w-15 lg:h-15 mx-auto rounded-full border-2 sm:border-3 border-amber-400 bg-gradient-to-tr from-amber-600 to-red-800 flex items-center justify-center text-lg sm:text-2xl md:text-3xl shadow-inner mb-0.5 group-hover:rotate-6 transition-transform flex-shrink-0">
                  {member.avatar}
                </div>

                {/* Name & Title */}
                <div className="mb-0.5">
                  <h3 className="text-[11px] sm:text-sm md:text-base lg:text-lg font-yatra text-amber-300 leading-tight truncate">
                    {member.name}
                  </h3>
                  <p className="text-amber-200/85 font-rozha text-[8px] sm:text-[10px] md:text-xs italic truncate">
                    {member.title}
                  </p>
                </div>

                {/* Quote Box */}
                <div className="bg-red-950/70 p-0.5 sm:p-1.5 md:p-2 rounded sm:rounded-lg border border-amber-500/20 text-amber-100 text-[8px] sm:text-[10px] md:text-xs font-poppins leading-tight mb-0.5 line-clamp-2">
                  {member.quote}
                </div>

                {/* Stat Badge Footer */}
                <div className="bg-amber-400/15 text-amber-300 font-pixel text-[7px] sm:text-[9px] md:text-[10px] py-0.2 px-1 sm:px-1.5 rounded border border-amber-400/30 truncate">
                  ⚡ {member.stats}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. FOOTER COUNTER                                              */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center justify-center pb-0.5 sm:pb-1 flex-shrink-0">
          <div className="text-[8px] sm:text-[10px] font-pixel text-amber-300/80 tracking-widest">
            ✦ 6 ROYAL MASTERMINDS ON BOARD ✦
          </div>
        </div>

      </div>
    </section>
  );
}
