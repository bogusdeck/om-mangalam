import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { shaadiAudio } from '../utils/audio';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import { useTheme } from '../context/ThemeContext';

export default function InvitationCard({ embedded = false, coverRef = null, onCardClick = null }) {
  const { themeConfig } = useTheme();
  const closedCover = WEDDING_CONFIG.invitationCard?.closedCover || {};
  const openedFarman = WEDDING_CONFIG.invitationCard?.openedFarman || {};

  return (
    <div 
      id={embedded ? undefined : "invitation"}
      className={`${embedded ? '' : 'py-16 px-2 sm:px-4'} flex justify-center items-center relative transition-colors duration-500`}
    >
      {/* Scroll 3D Perspective Container with authentic 2400:1792 Farman Aspect Ratio */}
      <div 
        className="w-full max-w-3xl lg:max-w-4xl relative select-none mx-auto"
        style={{ 
          aspectRatio: '2400 / 1792',
          perspective: '2500px' 
        }}
      >
        
        {/* ============================================================== */}
        {/* 1. INTERNAL OPENED SCROLL (Madhubani Royal Parchment)          */}
        {/* ============================================================== */}
        <div 
          className="relative w-full h-full cursor-pointer select-none"
          onClick={() => {
            shaadiAudio.playShehnaiNote(523, 0.3);
            if (onCardClick) onCardClick();
          }}
        >
          {/* Base Artwork Image: Open Scroll with Cream Parchment Field */}
          <img 
            src="/assets/scroll/scroll_open.png"
            alt="Royal Wedding Farman Opened"
            className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.65)] pointer-events-none"
          />

          {/* Sacred Royal Parchment Content Overlay */}
          {/* Safe bounds strictly inside cream parchment: top 27%, bottom 26%, left 15%, right 15% */}
          <div 
            className="absolute inset-0 flex flex-col justify-between items-center text-center pointer-events-auto py-0.5 sm:py-1 md:py-1.5"
            style={{
              top: '27%',
              bottom: '26%',
              left: '15%',
              right: '15%',
            }}
          >
            {/* Top Invocation Header */}
            <div className="flex flex-col items-center justify-center leading-tight">
              <div className="flex items-center justify-center gap-1 sm:gap-2">
                <span className="text-[#854d0e] font-pixel text-[5.5px] sm:text-[7.5px] md:text-[9.5px] tracking-wider uppercase">
                  ★ {WEDDING_CONFIG.weddingYear} {openedFarman.headerTagLeft || 'OFFICIAL FARMAN'} ★
                </span>
                <span className="text-[9px] sm:text-xs">🪔</span>
                <span className="text-[#854d0e] font-pixel text-[5.5px] sm:text-[7.5px] md:text-[9.5px] tracking-wider uppercase">
                  ★ {openedFarman.headerTagRight || 'SHUBH VIVAH'} ★
                </span>
              </div>

              <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-yatra text-[#780016] tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)] font-bold my-0.5">
                {openedFarman.shubhVivahHeading || '|| शुभ विवाह ||'}
              </h2>

              <p className="text-[#854d0e] font-rozha text-[6px] sm:text-[8px] md:text-[10px] italic">
                ✨ {openedFarman.blessingText || 'With the blessings of Elders, Relatives & Well Wishers'} ✨
              </p>
            </div>

            {/* Couple Announcement Plaque */}
            <div className="w-full flex flex-col items-center justify-center leading-tight px-1 sm:px-2">
              <p className="text-[#78350f] font-rozha text-[6px] sm:text-[8px] md:text-[9.5px] italic">
                {openedFarman.invitationText || 'Together with their families, cordially invite you to celebrate the wedding of'}
              </p>
              
              <div className="text-xs sm:text-xl md:text-2xl lg:text-3xl font-yatra text-[#780016] flex flex-wrap items-center justify-center gap-1 sm:gap-2.5 font-extrabold my-0.5 drop-shadow-sm max-w-full">
                <span className="hover:scale-105 transition-transform inline-block">{WEDDING_CONFIG.bride.fullName}</span>
                <span className={`text-xs sm:text-base md:text-xl inline-block ${themeConfig.heartColor || 'text-red-600'}`}>❤️</span>
                <span className="hover:scale-105 transition-transform inline-block">{WEDDING_CONFIG.groom.fullName}</span>
              </div>

              <p className="text-[#991b1b] font-script text-[8px] sm:text-xs md:text-sm font-semibold">
                {openedFarman.sacredKnotText || 'are officially tying the sacred knot!'}
              </p>
            </div>

            {/* Event Particulars in 3 Royal Badges */}
            <div className="w-full grid grid-cols-3 gap-1 sm:gap-1.5 max-w-sm sm:max-w-md">
              <div className="bg-[#fff9ea]/95 border border-[#b45309]/40 rounded sm:rounded-lg py-0.5 px-1 shadow-sm flex flex-col justify-center items-center">
                <span className="text-[5px] sm:text-[7px] md:text-[8px] uppercase font-bold text-[#854d0e] tracking-wider">📅 {openedFarman.dateLabel || 'DATE'}</span>
                <span className="text-[6px] sm:text-[8.5px] md:text-[10.5px] font-extrabold text-[#780016] leading-tight">
                  {WEDDING_CONFIG.weddingDate.toUpperCase()}
                </span>
              </div>
              <div className="bg-[#fff9ea]/95 border border-[#b45309]/40 rounded sm:rounded-lg py-0.5 px-1 shadow-sm flex flex-col justify-center items-center">
                <span className="text-[5px] sm:text-[7px] md:text-[8px] uppercase font-bold text-[#854d0e] tracking-wider">📍 {openedFarman.venueLabel || 'VENUE'}</span>
                <span className="text-[6px] sm:text-[8.5px] md:text-[10.5px] font-extrabold text-[#780016] truncate max-w-full leading-tight" title={WEDDING_CONFIG.venue}>
                  {WEDDING_CONFIG.venue}
                </span>
              </div>
              <div className="bg-[#fff9ea]/95 border border-[#b45309]/40 rounded sm:rounded-lg py-0.5 px-1 shadow-sm flex flex-col justify-center items-center">
                <span className="text-[5px] sm:text-[7px] md:text-[8px] uppercase font-bold text-[#854d0e] tracking-wider">⏰ {openedFarman.timeLabel || 'TIME'}</span>
                <span className="text-[6px] sm:text-[8.5px] md:text-[10.5px] font-extrabold text-[#780016] leading-tight">
                  {WEDDING_CONFIG.time}
                </span>
              </div>
            </div>

            {/* Unlimited Paneer Guarantee Badge & Audio Prompt */}
            <div className="w-full flex flex-col items-center justify-center space-y-0.5 pb-0.5 sm:pb-1">
              <span className="inline-block bg-gradient-to-r from-[#fef3c7] via-[#fde68a] to-[#fef3c7] text-[#780016] border border-[#d97706]/70 px-2 sm:px-3 py-0.5 rounded-full text-[5.5px] sm:text-[7.5px] md:text-[9.5px] font-pixel shadow-sm font-bold">
                {openedFarman.paneerGuaranteeBadge || '👑 100% UNLIMITED PANEER GUARANTEED 👑'}
              </span>
              <p className="text-[#854d0e] font-pixel text-[5px] sm:text-[6.5px] md:text-[8px] tracking-wider">
                {openedFarman.shehnaiAudioPrompt || '✨ CLICK ANYWHERE TO PLAY AUSPICIOUS SHEHNAI ✨'}
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. CLOSED ROYAL SCROLL COVER (Sun Medallion Front Cover)       */}
        {/* ============================================================== */}
        <div
          ref={coverRef}
          className="absolute inset-0 z-20 w-full h-full cursor-pointer select-none will-change-transform"
          style={{
            transformOrigin: '50% 16.74%', // Exact pivot along the top wooden scroll rod!
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          onClick={() => {
            shaadiAudio.playShehnaiNote(659, 0.35);
            if (onCardClick) onCardClick();
          }}
        >
          {/* Base Artwork Image: Closed Scroll with Sun Medallion */}
          <img 
            src="/assets/scroll/scroll_closed.png"
            alt="Royal Wedding Farman Closed"
            className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)] pointer-events-none"
          />

          {/* Cover Overlay Content - Centered in Royal Crimson Field */}
          <div 
            className="absolute flex flex-col items-center justify-between pointer-events-auto"
            style={{
              top: '28.5%',
              bottom: '27%',
              left: '16%',
              right: '16%',
            }}
          >
            {/* Top Header: Auspicious Invocation */}
            <div className="flex flex-col items-center text-center">
              <div className="text-[6.5px] sm:text-[8.5px] md:text-[10.5px] font-yatra gold-gradient-text tracking-widest bg-[#26050e]/90 px-2.5 sm:px-3 py-0.5 rounded-full border border-amber-400/50 shadow-sm">
                {closedCover.invocation || '|| श्री गणेशाय नमः ||'}
              </div>
              <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-yatra gold-gradient-text tracking-wider drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] mt-0.5 sm:mt-1 font-bold">
                {closedCover.title || 'वैवाहिक निमंत्रण पत्र'}
              </h2>
              <div className="flex items-center gap-1 sm:gap-2 mt-0.5">
                <span className="h-[1px] w-4 sm:w-10 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"></span>
                <span className="text-[7px] sm:text-[10px] text-amber-300">✦ 🪔 ✦</span>
                <span className="h-[1px] w-4 sm:w-10 bg-gradient-to-r from-transparent via-amber-400/70 to-transparent"></span>
              </div>
            </div>

            {/* Center: Couple Royal Announcement (Pure Floating Gold Typography on Royal Crimson) */}
            <div className="flex flex-col items-center justify-center text-center px-2 sm:px-4 py-0.5 max-w-lg w-full mx-auto">
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5">
                <span className="h-[1px] w-6 sm:w-14 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></span>
                <span className="text-[7px] sm:text-[9.5px] md:text-[11.5px] font-yatra text-amber-300 tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  {closedCover.subheading || '❖ शुभ परिणय ❖'}
                </span>
                <span className="h-[1px] w-6 sm:w-14 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent"></span>
              </div>

              <div className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-yatra gold-gradient-text flex items-center justify-center gap-1.5 sm:gap-2.5 font-extrabold drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] my-0.5">
                <span className="hover:scale-105 transition-transform inline-block">{WEDDING_CONFIG.bride.fullName}</span>
                <span className={`text-[11px] sm:text-lg md:text-2xl inline-block drop-shadow animate-pulse ${themeConfig.heartColor || 'text-red-500'}`}>❤️</span>
                <span className="hover:scale-105 transition-transform inline-block">{WEDDING_CONFIG.groom.fullName}</span>
              </div>

              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[6px] sm:text-[8px] md:text-[10.5px] text-amber-200/95 font-rozha tracking-wider mt-0.5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                <span>✨ {WEDDING_CONFIG.weddingDate.toUpperCase()}</span>
                <span className="text-amber-400">•</span>
                <span className="truncate max-w-[130px] sm:max-w-[220px]">{WEDDING_CONFIG.venue} ✨</span>
              </div>
            </div>

            {/* Bottom Opening Prompt: strictly above the twin peacocks */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#26050e]/90 px-2 sm:px-3.5 py-0.5 rounded-full border border-amber-400/50 shadow-sm">
                <span className="text-amber-300 font-pixel text-[4.5px] sm:text-[6.5px] md:text-[8px] tracking-wider inline-flex items-center gap-1">
                  <span>📜</span>
                  <span>{closedCover.scrollPrompt || 'Scroll down to unfurl royal farman ↑'}</span>
                  <span>📜</span>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
