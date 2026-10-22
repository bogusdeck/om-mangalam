import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { WEDDING_CONFIG } from '../config/weddingConfig';

export default function MainEvents() {
  const eventsConfig = WEDDING_CONFIG.eventsSection || {};
  const eventsList = eventsConfig.events || [];
  const [activeEvent, setActiveEvent] = useState(null);

  // Scroll Border Refs for dynamic slide-in effect
  const sectionRef = useRef(null);
  const topBorderRef = useRef(null);
  const bottomBorderRef = useRef(null);
  const leftBorderRef = useRef(null);
  const rightBorderRef = useRef(null);
  const cornerTLRef = useRef(null);
  const cornerTRRef = useRef(null);
  const cornerBLRef = useRef(null);
  const cornerBRRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateBorderAnimation = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      // Start sliding in when section top enters near bottom of viewport (rect.top <= vh * 0.95)
      // Fully locked in place when section reaches upper viewport (rect.top <= vh * 0.20)
      const enterSpan = vh * 0.75;
      const rawProgress = (vh * 0.95 - rect.top) / enterSpan;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Smooth ease-out curve matching Sections 1, 2, and 3
      const ease = 1 - Math.pow(1 - progress, 2.2);
      const offset = (1 - ease) * 115; // 115% -> 0%
      const cornerOffset = (1 - ease) * 135; // 135% -> 0%

      if (topBorderRef.current) {
        topBorderRef.current.style.transform = `translate3d(0, -${offset}%, 0)`;
      }
      if (bottomBorderRef.current) {
        bottomBorderRef.current.style.transform = `translate3d(0, ${offset}%, 0)`;
      }
      if (leftBorderRef.current) {
        leftBorderRef.current.style.transform = `translate3d(-${offset}%, 0, 0)`;
      }
      if (rightBorderRef.current) {
        rightBorderRef.current.style.transform = `translate3d(${offset}%, 0, 0)`;
      }
      if (cornerTLRef.current) {
        cornerTLRef.current.style.transform = `translate3d(-${cornerOffset}%, -${cornerOffset}%, 0)`;
      }
      if (cornerTRRef.current) {
        cornerTRRef.current.style.transform = `translate3d(${cornerOffset}%, -${cornerOffset}%, 0)`;
      }
      if (cornerBLRef.current) {
        cornerBLRef.current.style.transform = `translate3d(-${cornerOffset}%, ${cornerOffset}%, 0)`;
      }
      if (cornerBRRef.current) {
        cornerBRRef.current.style.transform = `translate3d(${cornerOffset}%, ${cornerOffset}%, 0)`;
      }

      // Smooth slide-up for content cards
      const contentOffset = (1 - ease) * 40;
      const contentOpacity = Math.min(progress * 1.5, 1).toString();

      if (headerRef.current) {
        headerRef.current.style.transform = `translate3d(0, -${(1 - ease) * 25}px, 0)`;
        headerRef.current.style.opacity = contentOpacity;
      }
      if (cardsContainerRef.current) {
        cardsContainerRef.current.style.transform = `translate3d(0, ${contentOffset}px, 0)`;
        cardsContainerRef.current.style.opacity = contentOpacity;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateBorderAnimation();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateBorderAnimation();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleEventClick = (evt, e) => {
    setActiveEvent(evt.id);
    shaadiAudio.playDhol();
    shaadiAudio.playShehnaiNote(659, 0.35);

    const clientX = e?.clientX ? e.clientX / window.innerWidth : 0.5;
    const clientY = e?.clientY ? e.clientY / window.innerHeight : 0.6;

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { x: clientX, y: clientY },
      colors: ['#FFD700', '#FFA500', '#FF1493', '#00FF7F', '#FFF8DC'],
    });
  };

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full min-h-screen md:h-screen flex flex-col justify-between items-center py-5 sm:py-7 md:py-8 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-[#180309] via-[#2d050f] to-[#140207] text-center overflow-hidden"
    >
      {/* ============================================================== */}
      {/* Royal Gold Arch & Sun Medallion Architectural Borders         */}
      {/* ============================================================== */}
      {/* Top Border */}
      <div
        ref={topBorderRef}
        className="absolute top-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] z-30 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(0, -115%, 0)' }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/assets/borders/gold_arch_border_h.png')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
          }}
        />
      </div>

      {/* Bottom Border */}
      <div
        ref={bottomBorderRef}
        className="absolute bottom-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] z-30 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(0, 115%, 0)' }}
      >
        <div
          className="w-full h-full scale-y-[-1]"
          style={{
            backgroundImage: "url('/assets/borders/gold_arch_border_h.png')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
          }}
        />
      </div>

      {/* Left Border */}
      <div
        ref={leftBorderRef}
        className="absolute top-0 bottom-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] z-30 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-115%, 0, 0)' }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/assets/borders/gold_arch_border_v.png')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
          }}
        />
      </div>

      {/* Right Border */}
      <div
        ref={rightBorderRef}
        className="absolute top-0 bottom-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] z-30 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(115%, 0, 0)' }}
      >
        <div
          className="w-full h-full scale-x-[-1]"
          style={{
            backgroundImage: "url('/assets/borders/gold_arch_border_v.png')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
          }}
        />
      </div>

      {/* 4 Corner Sun Medallions */}
      <div
        ref={cornerTLRef}
        className="absolute top-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] h-[22px] sm:h-[26px] md:h-[30px] z-40 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-135%, -135%, 0)' }}
      >
        <img
          src="/assets/borders/gold_arch_corner.png"
          alt="Royal Sun Corner Top Left"
          className="w-full h-full object-contain select-none"
        />
      </div>
      <div
        ref={cornerTRRef}
        className="absolute top-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] h-[22px] sm:h-[26px] md:h-[30px] z-40 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(135%, -135%, 0)' }}
      >
        <img
          src="/assets/borders/gold_arch_corner.png"
          alt="Royal Sun Corner Top Right"
          className="w-full h-full object-contain select-none scale-x-[-1]"
        />
      </div>
      <div
        ref={cornerBLRef}
        className="absolute bottom-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] h-[22px] sm:h-[26px] md:h-[30px] z-40 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-135%, 135%, 0)' }}
      >
        <img
          src="/assets/borders/gold_arch_corner.png"
          alt="Royal Sun Corner Bottom Left"
          className="w-full h-full object-contain select-none scale-y-[-1]"
        />
      </div>
      <div
        ref={cornerBRRef}
        className="absolute bottom-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] h-[22px] sm:h-[26px] md:h-[30px] z-40 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(135%, 135%, 0)' }}
      >
        <img
          src="/assets/borders/gold_arch_corner.png"
          alt="Royal Sun Corner Bottom Right"
          className="w-full h-full object-contain select-none scale-x-[-1] scale-y-[-1]"
        />
      </div>

      {/* ============================================================== */}
      {/* Title Header (Centered & Elegant)                             */}
      {/* ============================================================== */}
      <div
        ref={headerRef}
        className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center flex-shrink-0 z-20 mb-2 sm:mb-3 will-change-transform"
      >
        {eventsConfig.badge && (
          <div className="bg-[#360814]/90 text-amber-300 font-pixel text-[6px] sm:text-[8px] md:text-[10px] px-3 sm:px-4 py-0.5 rounded-full border border-amber-400/50 shadow-sm mb-1 tracking-widest inline-flex items-center gap-1">
            <span>✨</span>
            <span>{eventsConfig.badge}</span>
            <span>✨</span>
          </div>
        )}
        <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-yatra gold-gradient-text tracking-wide drop-shadow leading-tight font-bold">
          {eventsConfig.heading || 'WEDDING EVENTS & ITINERARY'}
        </h2>
        {eventsConfig.subheading && (
          <p className="text-amber-200/90 font-script text-xs sm:text-base md:text-xl mt-0.5">
            {eventsConfig.subheading}
          </p>
        )}
      </div>

      {/* ============================================================== */}
      {/* 6 Royal Event Cards Grid (Screen Height Compact & Responsive) */}
      {/* ============================================================== */}
      <div
        ref={cardsContainerRef}
        className="max-w-6xl w-full flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5 md:gap-4 px-1 sm:px-2 z-20 will-change-transform items-stretch justify-center max-h-[72vh] overflow-y-auto sm:overflow-visible py-1"
      >
        {eventsList.map((evt) => {
          const isSelected = activeEvent === evt.id;

          return (
            <div
              key={evt.id}
              onClick={(e) => handleEventClick(evt, e)}
              className={`group relative rounded-xl sm:rounded-2xl p-2.5 sm:p-3 md:p-3.5 flex flex-col justify-between text-left cursor-pointer transition-all duration-300 bg-gradient-to-br ${
                evt.cardGradient || 'from-red-950/90 to-amber-950/90'
              } border ${
                isSelected
                  ? 'border-amber-300 ring-2 sm:ring-4 ring-amber-400/70 shadow-[0_0_25px_rgba(251,191,36,0.65)] scale-[1.02]'
                  : evt.borderColor || 'border-amber-500/40 hover:border-amber-400 hover:scale-[1.01]'
              } shadow-lg backdrop-blur-xs select-none`}
            >
              {/* Top Banner: Emoji + Event Title + Subtitle Pill */}
              <div className="flex items-start justify-between gap-1.5 mb-1.5 sm:mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl filter drop-shadow">
                    {evt.emoji}
                  </span>
                  <div>
                    <h3 className="font-yatra text-xs sm:text-sm md:text-base font-bold gold-gradient-text tracking-wide leading-tight">
                      {evt.name}
                    </h3>
                    <span className="text-[8px] sm:text-[9.5px] font-pixel text-amber-300/90 uppercase tracking-wider block">
                      {evt.subtitle}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-[10px] sm:text-xs text-amber-300 animate-pulse">
                    ✨
                  </span>
                )}
              </div>

              {/* Event Particulars: Date, Time & Venue in Badges */}
              <div className="grid grid-cols-2 gap-1 mb-1.5 sm:mb-2 text-[8px] sm:text-[10px] md:text-[11px] font-poppins">
                <div className="bg-black/40 border border-amber-500/20 rounded px-1.5 py-1 flex items-center gap-1.5 text-amber-100">
                  <Calendar className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{evt.date}</span>
                </div>
                <div className="bg-black/40 border border-amber-500/20 rounded px-1.5 py-1 flex items-center gap-1.5 text-amber-100">
                  <Clock className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{evt.time}</span>
                </div>
                <div className="col-span-2 bg-black/40 border border-amber-500/20 rounded px-1.5 py-1 flex items-center gap-1.5 text-amber-100">
                  <MapPin className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{evt.venue || WEDDING_CONFIG.venue}</span>
                </div>
              </div>

              {/* Quirky Humor Description */}
              <p className="text-[8.5px] sm:text-[10px] md:text-[11.5px] text-amber-100/95 font-poppins leading-relaxed mb-2 bg-black/30 p-1.5 rounded-lg border border-amber-400/15 flex-1 flex items-center">
                {evt.desc}
              </p>

              {/* Dress Code Pill Footer */}
              <div className="flex items-center justify-between bg-amber-400/15 border border-amber-400/40 rounded-full px-2 py-0.5 text-[7.5px] sm:text-[9px] md:text-[10px] text-amber-200 font-semibold">
                <span className="truncate">👗 {evt.dressCode}</span>
                <span className="text-amber-400 text-[8px] sm:text-[9px] ml-1 flex-shrink-0 group-hover:scale-110 transition-transform">
                  ✦ Click to Celebrate
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Auspicious Footnote */}
      <div className="z-20 text-[6.5px] sm:text-[8px] md:text-[9.5px] text-amber-300/80 font-pixel tracking-wider mt-1 sm:mt-2">
        🪔 ALL EVENTS INCLUDE 100% UNLIMITED ROYAL BANQUET HOSPITALITY 🪔
      </div>
    </section>
  );
}
