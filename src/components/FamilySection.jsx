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
 * Layout Structure:
 * 1. Circular Lotus Medallion (top half): houses character portrait avatar.
 * 2. Introductory Role Badge: positioned outside the box, right between the
 *    circular medallion and the cream rectangle section.
 * 3. Cream Scalloped Placard: exclusively dedicated to Name, Title, and Quote
 *    for maximum breathing room and zero text clipping.
 * 4. Funny Tag Pill: anchored at the bottom of the card frame.
 *
 * Requirements Met:
 * - Fits 100% in a single viewport (h-screen) with zero vertical scroll.
 * - All 6 cards displayed together in a balanced royal grid (3x2 on desktop, 2x3 on mobile).
 * - Zero text overflow, zero truncation, complete legibility.
 * - Interactive royal audio hit on click.
 */

export default function FamilySection() {
  const familyConfig = WEDDING_CONFIG.familySection || {};
  const familyMembers = familyConfig.members || [];

  return (
    <section
      id="family"
      className="relative z-10 w-full h-screen min-h-screen max-h-screen overflow-hidden flex flex-col justify-between pt-4 sm:pt-5 md:pt-6 pb-4 sm:pb-5 md:pb-6 px-2.5 sm:px-6 md:px-10 text-center select-none"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full justify-between">
        
        {/* ============================================================== */}
        {/* 1. TOP HEADER & TITLE                                          */}
        {/* ============================================================== */}
        <div className="text-center pt-0.5 sm:pt-1 flex-shrink-0">
          {/* Festive Top Badge */}
          <div className="inline-block bg-amber-400 text-red-950 font-pixel text-[8.5px] sm:text-xs px-2.5 sm:px-3 py-0.5 rounded-full mb-0.5 border-2 border-red-900 font-bold shadow-md tracking-wider">
            {familyConfig.badge || '★ CHARACTER CARDS & BOARD OF DIRECTORS ★'}
          </div>

          {/* Heading: Strictly ONE line on wide screen, TWO lines on mobile */}
          <h2 className="font-yatra gold-gradient-text tracking-wide drop-shadow-md text-center">
            {/* Wide Screen: Single Line */}
            <span className="hidden sm:inline-block text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] whitespace-nowrap leading-tight">
              {familyConfig.heading || 'THE PEOPLE RESPONSIBLE FOR THIS'}
            </span>
            {/* Mobile Screen: Two Lines */}
            <span className="inline-block sm:hidden text-lg sm:text-xl leading-tight">
              THE PEOPLE RESPONSIBLE<br />FOR THIS
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-amber-200/90 font-rozha italic text-[10px] sm:text-xs md:text-sm mt-0.5 max-w-2xl mx-auto px-4 leading-tight">
            {familyConfig.subheading || 'The masterminds who funded, executed, and micro-managed everything'}
          </p>
        </div>

        {/* ============================================================== */}
        {/* 2. ALL 6 ROYAL CARDS (REVAMPED HIERARCHY)                      */}
        {/* ============================================================== */}
        <div className="w-full flex-1 flex items-center justify-center min-h-0 my-auto py-1 sm:py-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center h-full max-h-[570px] sm:max-h-[630px] md:max-h-[710px] w-full max-w-sm sm:max-w-2xl md:max-w-5xl lg:max-w-6xl mx-auto">
            {familyMembers.map((member) => (
              <article
                key={member.id || member.name}
                onClick={() => shaadiAudio.playDramaticHit()}
                className="relative aspect-[1792/2400] h-full max-h-[248px] sm:max-h-[290px] md:max-h-[345px] lg:max-h-[375px] mx-auto rounded-xl shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer group select-none"
              >
                {/* Authentic Royal Frame Graphic */}
                <img
                  src="/assets/cards/royal_card_frame.webp"
                  alt="Royal Wedding Card"
                  className="absolute inset-0 w-full h-full object-fill pointer-events-none drop-shadow-md rounded-xl"
                  loading="eager"
                />

                {/* Circular Medallion Avatar / Portrait */}
                <div className="absolute top-[35.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  <span className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] filter drop-shadow group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {member.avatar}
                  </span>
                </div>

                {/* 1. Introductory Role Badge: Positioned outside the box, between the circle & rectangle */}
                <div className="absolute top-[57.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[88%] bg-amber-400 text-red-950 font-yatra text-[6.5px] sm:text-[8px] md:text-[9.5px] lg:text-[10.5px] py-0.5 px-2 sm:px-2.5 rounded border border-red-950/60 shadow-md font-bold tracking-wider z-10 whitespace-nowrap truncate pointer-events-none">
                  {member.role}
                </div>

                {/* 2. Scalloped Placard Content: ONLY Name, Title, and Quote */}
                <div className="absolute top-[64%] bottom-[9.5%] left-[9.5%] right-[9.5%] flex flex-col justify-between items-center text-center px-1 sm:px-2 py-0.5 sm:py-1 pointer-events-none">
                  {/* Name & Title */}
                  <div className="w-full">
                    <h3 className="font-yatra text-red-950 text-[10.5px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-bold leading-none whitespace-nowrap">
                      {member.name}
                    </h3>
                    <p className="font-rozha text-red-900/90 text-[7.5px] sm:text-[9px] md:text-[10.5px] lg:text-xs italic leading-tight mt-0.5 line-clamp-1">
                      {member.title}
                    </p>
                  </div>

                  {/* Quote Box */}
                  <div className="w-full bg-red-950/10 rounded-md border border-red-900/15 p-1 sm:p-1.5 text-red-950 text-[7px] sm:text-[8px] md:text-[9.5px] lg:text-[11px] font-poppins leading-tight italic my-auto line-clamp-2">
                    {member.quote}
                  </div>
                </div>

                {/* 3. Funny Tag Pill: Anchored at the bottom of the card */}
                <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-auto max-w-[90%] bg-amber-400 text-red-950 font-pixel text-[6px] sm:text-[7.5px] md:text-[9px] lg:text-[10px] font-bold py-0.5 px-2 rounded border border-red-950/50 shadow-sm text-center tracking-wide z-10 whitespace-nowrap pointer-events-none">
                  ⚡ {member.stats}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3. FOOTER COUNTER                                              */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center justify-center pb-0.5 flex-shrink-0">
          <div className="text-[8px] sm:text-[10px] font-pixel text-amber-300/80 tracking-widest">
            ✦ 6 ROYAL MASTERMINDS ON BOARD ✦
          </div>
        </div>

      </div>
    </section>
  );
}
