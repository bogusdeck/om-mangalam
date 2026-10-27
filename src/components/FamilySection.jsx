import React from 'react';
import { shaadiAudio } from '../utils/audio';
import { WEDDING_CONFIG } from '../config/weddingConfig';

/**
 * ============================================================================
 * SECTION 5: THE ROYAL FAMILIES (ROYAL CARD FRAME REVAMP)
 * ============================================================================
 *
 * Uses the authentic traditional Indian wedding card frame asset:
 * /assets/cards/royal_card_frame.webp
 *
 * Features:
 * - All 6 cards displayed together on a single screen (no tabs, no arrow keys).
 * - Desktop: 3 columns x 2 rows of authentic royal portrait cards.
 * - Mobile: 2 columns x 3 rows cleanly fitted inside the architectural border.
 * - Circular lotus medallion houses the character avatar/portrait.
 * - Cream scalloped placard houses role badge, name, title, quote, and stats.
 * - Plays royal sound effect on card interaction.
 */

export default function FamilySection() {
  const familyConfig = WEDDING_CONFIG.familySection || {};
  const familyMembers = familyConfig.members || [];

  return (
    <section
      id="family"
      className="relative z-10 w-full h-screen min-h-screen max-h-screen overflow-hidden flex flex-col justify-between pt-6 sm:pt-6 md:pt-8 pb-6 sm:pb-5 md:pb-6 px-2.5 sm:px-6 md:px-10 text-center select-none"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col h-full justify-between">
        
        {/* ============================================================== */}
        {/* 1. TOP HEADER & TITLE                                          */}
        {/* ============================================================== */}
        <div className="text-center pt-0.5 sm:pt-1 flex-shrink-0">
          {/* Festive Top Badge */}
          <div className="inline-block bg-amber-400 text-red-950 font-pixel text-[8.5px] sm:text-xs px-2.5 sm:px-3 py-0.5 rounded-full mb-0.5 sm:mb-1 border-2 border-red-900 font-bold shadow-md tracking-wider">
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
          <p className="text-amber-200/90 font-rozha italic text-[10.5px] sm:text-sm md:text-base mt-0.5 max-w-2xl mx-auto px-4 leading-tight">
            {familyConfig.subheading || 'The masterminds who funded, executed, and micro-managed everything'}
          </p>
        </div>

        {/* ============================================================== */}
        {/* 2. ALL 6 ROYAL CARDS IN AUTHENTIC FRAME (NO TABS, NO ARROWS)   */}
        {/* ============================================================== */}
        <div className="w-full flex-1 flex items-center justify-center min-h-0 my-auto py-1 sm:py-2 md:py-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-5 justify-center items-center h-full max-h-[530px] sm:max-h-[560px] md:max-h-[600px] w-full max-w-sm sm:max-w-2xl md:max-w-5xl mx-auto">
            {familyMembers.map((member) => (
              <article
                key={member.id || member.name}
                onClick={() => shaadiAudio.playDramaticHit()}
                className="relative aspect-[1792/2400] h-full max-h-[240px] sm:max-h-[265px] md:max-h-[285px] mx-auto rounded-lg sm:rounded-xl shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer group select-none"
              >
                {/* Authentic Royal Frame Graphic */}
                <img
                  src="/assets/cards/royal_card_frame.webp"
                  alt="Royal Wedding Card"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-md rounded-lg sm:rounded-xl"
                  loading="eager"
                />

                {/* Circular Medallion Avatar / Portrait */}
                <div className="absolute top-[35.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] filter drop-shadow group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {member.avatar}
                  </span>
                </div>

                {/* Scalloped Placard Content */}
                <div className="absolute top-[58%] bottom-[5.5%] left-[8.5%] right-[8.5%] flex flex-col justify-between items-center text-center px-1 sm:px-1.5 py-0.5 sm:py-1 pointer-events-none">
                  {/* Role Badge */}
                  <div className="bg-red-950 text-amber-300 font-yatra text-[7px] sm:text-[9px] md:text-[10px] py-0.2 sm:py-0.5 px-1.5 sm:px-2 rounded-full border border-amber-500/50 shadow-sm font-bold tracking-wide truncate max-w-[96%]">
                    {member.role}
                  </div>

                  {/* Name & Title */}
                  <div className="w-full">
                    <h3 className="font-yatra text-red-950 text-[10px] sm:text-xs md:text-sm leading-tight font-bold truncate">
                      {member.name}
                    </h3>
                    <p className="font-rozha text-red-900/90 text-[7px] sm:text-[8.5px] md:text-[9.5px] italic truncate">
                      {member.title}
                    </p>
                  </div>

                  {/* Quote Box */}
                  <div className="w-full bg-red-950/10 rounded border border-red-900/15 px-1 py-0.5 text-red-950 text-[6.5px] sm:text-[8px] md:text-[9px] font-poppins leading-tight line-clamp-2 italic">
                    {member.quote}
                  </div>

                  {/* Stats Badge */}
                  <div className="bg-amber-500/25 text-red-950 font-pixel text-[6px] sm:text-[7.5px] md:text-[8.5px] font-bold py-0.2 sm:py-0.5 px-1 sm:px-1.5 rounded border border-amber-800/40 truncate max-w-[96%]">
                    ⚡ {member.stats}
                  </div>
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
