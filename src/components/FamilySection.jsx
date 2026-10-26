import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton } from './ui';
import { WEDDING_CONFIG } from '../config/weddingConfig';

/**
 * ============================================================================
 * SECTION 5: THE ROYAL FAMILIES (SINGLE-VIEWPORT NO-SCROLL REVAMP)
 * ============================================================================
 *
 * Requirements:
 * 1. Single Viewport Fit: Fits 100% within the viewport (h-screen). No scrolling required!
 * 2. Heading Formatting:
 *    - Wide Screen (Desktop/Tablet): Strictly ONE SINGLE LINE ("THE PEOPLE RESPONSIBLE FOR THIS")
 *    - Mobile: Strictly TWO LINES ("THE PEOPLE RESPONSIBLE" / "FOR THIS")
 * 3. Cards Deck:
 *    - Desktop: 3 cards per view with sleek gold Left/Right arrow navigation & dot indicators.
 *    - Mobile: 1 card per view with swipe/arrow navigation.
 *    - Filterable by: All Masterminds / Bride's Side / Groom's Side.
 */

export default function FamilySection() {
  const familyConfig = WEDDING_CONFIG.familySection || {};
  const [selectedFamily, setSelectedFamily] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const familyMembers = familyConfig.members || [];
  const filters = familyConfig.filters || [
    { id: 'all', label: '🌟 ALL MASTERMINDS', variant: 'gold' },
    { id: 'bride', label: "👰 BRIDE'S SIDE (SHARMA SQUAD)", variant: 'pink' },
    { id: 'groom', label: "🕺 GROOM'S SIDE (VERMA WARRIORS)", variant: 'orange' },
  ];

  const filteredMembers = selectedFamily === 'all'
    ? familyMembers
    : familyMembers.filter((m) => m.side === selectedFamily);

  const cardsPerPage = isMobile ? 1 : 3;
  const pageCount = Math.max(1, Math.ceil(filteredMembers.length / cardsPerPage));

  // Reset page if out of bounds
  useEffect(() => {
    if (currentPage >= pageCount) {
      setCurrentPage(0);
    }
  }, [filteredMembers.length, pageCount, currentPage]);

  const startIndex = currentPage * cardsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, startIndex + cardsPerPage);

  const handlePrev = () => {
    shaadiAudio.playDramaticHit();
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : pageCount - 1));
  };

  const handleNext = () => {
    shaadiAudio.playDramaticHit();
    setCurrentPage((prev) => (prev < pageCount - 1 ? prev + 1 : 0));
  };

  const handleFilterSelect = (id) => {
    shaadiAudio.playDramaticHit();
    setSelectedFamily(id);
    setCurrentPage(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pageCount]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  return (
    <section
      id="family"
      className="relative z-10 w-full h-screen min-h-screen max-h-screen overflow-hidden flex flex-col justify-between py-6 sm:py-8 md:py-10 px-3 sm:px-6 md:px-12 text-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full justify-between">
        
        {/* ============================================================== */}
        {/* 1. TOP HEADER & TITLE                                          */}
        {/* ============================================================== */}
        <div className="text-center pt-2 sm:pt-4 flex-shrink-0">
          {/* Festive Top Badge */}
          <div className="inline-block bg-amber-400 text-red-950 font-pixel text-[9.5px] sm:text-xs px-3 py-0.5 rounded-full mb-1 sm:mb-2 border-2 border-red-900 font-bold shadow-md tracking-wider">
            {familyConfig.badge || '★ CHARACTER CARDS & BOARD OF DIRECTORS ★'}
          </div>

          {/* Heading: Strictly ONE line on wide screen, TWO lines on mobile */}
          <h2 className="font-yatra gold-gradient-text tracking-wide drop-shadow-md text-center">
            {/* Wide Screen: Single Line */}
            <span className="hidden sm:inline-block text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-5xl whitespace-nowrap leading-tight">
              {familyConfig.heading || 'THE PEOPLE RESPONSIBLE FOR THIS'}
            </span>
            {/* Mobile Screen: Two Lines */}
            <span className="inline-block sm:hidden text-2xl leading-tight">
              THE PEOPLE RESPONSIBLE<br />FOR THIS
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-amber-200/90 font-rozha italic text-[11px] sm:text-sm md:text-base mt-0.5 max-w-2xl mx-auto px-4 leading-tight">
            {familyConfig.subheading || 'The masterminds who funded, executed, and micro-managed everything'}
          </p>
        </div>

        {/* ============================================================== */}
        {/* 2. FILTER PILLS (COMPACT)                                      */}
        {/* ============================================================== */}
        <div className="flex justify-center gap-2 sm:gap-3 my-1 sm:my-2 flex-shrink-0 flex-wrap">
          {filters.map((f) => {
            const isSelected = selectedFamily === f.id;
            return (
              <button
                key={f.id}
                onClick={() => handleFilterSelect(f.id)}
                className={`text-[10px] sm:text-xs md:text-sm font-semibold py-1 sm:py-1.5 px-2.5 sm:px-4 rounded-full transition-all duration-200 border ${
                  isSelected
                    ? 'bg-amber-400 text-red-950 border-amber-300 shadow-md scale-105 font-bold'
                    : 'bg-red-950/70 text-amber-200/80 border-amber-500/30 hover:border-amber-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* 3. INTERACTIVE CARDS DECK (FITS VIEWPORT WITH ZERO SCROLL)     */}
        {/* ============================================================== */}
        <div className="relative flex-1 flex items-center justify-center my-auto min-h-0 py-1 sm:py-2">
          
          {/* Left Arrow Button */}
          {pageCount > 1 && (
            <button
              onClick={handlePrev}
              className="absolute -left-2 sm:left-0 md:-left-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-950/90 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-red-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Cards Grid / Slide View */}
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 justify-center items-stretch px-6 sm:px-8">
            {currentMembers.map((member) => (
              <article
                key={member.id || member.name}
                onClick={() => shaadiAudio.playDramaticHit()}
                className="indian-card-frame velvet-bg rounded-2xl p-3 sm:p-4 lg:p-5 text-center shadow-xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer relative group flex flex-col justify-between border border-amber-500/40"
              >
                {/* Thin Inner Gold Border */}
                <div className="absolute inset-[3px] rounded-[13px] border border-amber-400/30 pointer-events-none" />

                {/* Top Role Badge */}
                <div className="bg-amber-400 text-red-950 font-yatra text-xs sm:text-sm py-0.5 px-2.5 rounded-md border border-red-900/40 inline-block font-bold mx-auto mb-1.5 sm:mb-2 shadow-sm truncate max-w-[90%]">
                  {member.role}
                </div>

                {/* Avatar Portrait with Golden Ring */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto rounded-full border-3 sm:border-4 border-amber-400 bg-gradient-to-tr from-amber-600 to-red-800 flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl shadow-inner mb-1.5 sm:mb-2 group-hover:rotate-6 transition-transform flex-shrink-0">
                  {member.avatar}
                </div>

                {/* Name & Title */}
                <div className="mb-1 sm:mb-2">
                  <h3 className="text-base sm:text-lg lg:text-xl font-yatra text-amber-300 leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-amber-200/90 font-rozha text-[11px] sm:text-xs lg:text-sm italic truncate mt-0.5">
                    {member.title}
                  </p>
                </div>

                {/* Quote Box */}
                <div className="bg-red-950/70 p-2 sm:p-2.5 rounded-xl border border-amber-500/25 text-amber-100 text-[11px] sm:text-xs font-poppins leading-relaxed mb-2 line-clamp-3">
                  {member.quote}
                </div>

                {/* Stat Badge Footer */}
                <div className="bg-amber-400/20 text-amber-300 font-pixel text-[9px] sm:text-[10.5px] py-1 px-2 rounded-lg border border-amber-400/40 truncate">
                  ⚡ {member.stats}
                </div>
              </article>
            ))}
          </div>

          {/* Right Arrow Button */}
          {pageCount > 1 && (
            <button
              onClick={handleNext}
              className="absolute -right-2 sm:right-0 md:-right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-950/90 border-2 border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-red-950 flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
              aria-label="Next Page"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

        </div>

        {/* ============================================================== */}
        {/* 4. PAGINATION INDICATOR DOTS & COUNTER                         */}
        {/* ============================================================== */}
        <div className="flex flex-col items-center justify-center pb-2 sm:pb-3 flex-shrink-0 gap-1">
          {pageCount > 1 && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {Array.from({ length: pageCount }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    shaadiAudio.playDramaticHit();
                    setCurrentPage(idx);
                  }}
                  className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === idx
                      ? 'w-6 sm:w-8 bg-amber-400 shadow-md'
                      : 'w-2 sm:w-2.5 bg-amber-400/30 hover:bg-amber-400/60'
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>
          )}

          <div className="text-[9px] sm:text-[10.5px] font-pixel text-amber-300/80 tracking-widest mt-0.5">
            ✦ {filteredMembers.length} ROYAL MASTERMINDS ON BOARD ✦
          </div>
        </div>

      </div>
    </section>
  );
}
