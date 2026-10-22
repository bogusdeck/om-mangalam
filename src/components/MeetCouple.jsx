import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Star, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton } from './ui';
import { WEDDING_CONFIG } from '../config/weddingConfig';

export default function MeetCouple({ 
  embedded = false,
  brideCardRef = null,
  groomCardRef = null,
  titleRef = null,
}) {
  const bride = WEDDING_CONFIG.bride || {};
  const groom = WEDDING_CONFIG.groom || {};
  const meetCouple = WEDDING_CONFIG.meetCouple || {};

  const [meganLikes, setMeganLikes] = useState(bride.initialLikes ?? 999);
  const [bradLikes, setBradLikes] = useState(groom.initialLikes ?? 404);
  const [activeEffect, setActiveEffect] = useState(null);

  // Section 3 Scroll Border Refs for dynamic slide-in effect (used when standalone)
  const sectionRef = useRef(null);
  const topBorderRef = useRef(null);
  const bottomBorderRef = useRef(null);
  const leftBorderRef = useRef(null);
  const rightBorderRef = useRef(null);
  const cornerTLRef = useRef(null);
  const cornerTRRef = useRef(null);
  const cornerBLRef = useRef(null);
  const cornerBRRef = useRef(null);

  // Fallback refs if not passed from master orchestrator
  const localBrideRef = useRef(null);
  const localGroomRef = useRef(null);
  const localTitleRef = useRef(null);

  const effectiveBrideRef = brideCardRef || localBrideRef;
  const effectiveGroomRef = groomCardRef || localGroomRef;
  const effectiveTitleRef = titleRef || localTitleRef;

  useEffect(() => {
    if (embedded) return; // When embedded in master scroll journey, master controls borders and cards
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

      // Smooth ease-out curve matching Section 1 & 2
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

      // Standalone mode: Slide in Bride Card from Left and Groom Card from Right
      const cardOffset = (1 - ease) * 105;
      const rot = (1 - ease) * 4;
      const cardOpacity = Math.min(progress * 1.6, 1).toString();

      if (effectiveBrideRef.current) {
        effectiveBrideRef.current.style.transform = `translate3d(-${cardOffset}%, 0, 0) rotate(-${rot}deg)`;
        effectiveBrideRef.current.style.opacity = cardOpacity;
      }
      if (effectiveGroomRef.current) {
        effectiveGroomRef.current.style.transform = `translate3d(${cardOffset}%, 0, 0) rotate(${rot}deg)`;
        effectiveGroomRef.current.style.opacity = cardOpacity;
      }
      if (effectiveTitleRef.current) {
        effectiveTitleRef.current.style.transform = `translate3d(0, ${(1 - ease) * -25}px, 0)`;
        effectiveTitleRef.current.style.opacity = cardOpacity;
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
    updateBorderAnimation(); // Initial setup

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [embedded, effectiveBrideRef, effectiveGroomRef, effectiveTitleRef]);

  const triggerHearts = (person) => {
    shaadiAudio.playPop();
    shaadiAudio.playCelebrationFanfare();
    
    if (person === 'megan') setMeganLikes(prev => prev + 1);
    if (person === 'brad') setBradLikes(prev => prev + 1);

    setActiveEffect(person);
    setTimeout(() => setActiveEffect(null), 1200);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    });
  };

  const content = (
    <>
      {/* Title Header */}
      <div 
        ref={effectiveTitleRef}
        className="max-w-4xl mx-auto mb-1.5 sm:mb-3 md:mb-5 flex-shrink-0 will-change-transform text-center flex flex-col items-center justify-center"
        style={embedded ? { transform: 'translate3d(0, -30px, 0)', opacity: 0 } : undefined}
      >
        <h2 className="text-center text-lg sm:text-3xl md:text-4xl lg:text-5xl font-yatra gold-gradient-text tracking-wide drop-shadow leading-tight">
          {meetCouple.heading || 'MEET THE TWO PEOPLE WHO SAID YES'}
        </h2>
        {meetCouple.subheading && (
          <p className="text-center text-amber-200 font-script text-xs sm:text-base md:text-xl lg:text-2xl mt-0.5">
            {meetCouple.subheading}
          </p>
        )}
      </div>

      {/* Two Decorative Portrait Frames Container */}
      <div className="max-w-5xl lg:max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-5 lg:gap-8 px-2 sm:px-4 items-stretch flex-shrink-1">
        
        {/* THE BRIDE (Slides in from Left) */}
        <div 
          ref={effectiveBrideRef}
          className="relative group flex flex-col will-change-transform"
          style={embedded ? { transform: 'translate3d(-105%, 0, 0) rotate(-4deg)', opacity: 0 } : undefined}
        >
          <div className="indian-border-gold bg-red-900 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl relative velvet-bg transform group-hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between h-full">
            
            {/* Title Badge */}
            <div className="absolute -top-2.5 sm:-top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-red-950 px-3 sm:px-5 py-0.5 rounded-full font-yatra text-[10px] sm:text-sm md:text-base border-2 border-red-900 shadow-lg whitespace-nowrap z-10 tracking-wider">
              {bride.roleTitle || 'THE BRIDE'}
            </div>

            {/* Portrait Frame */}
            <div className="mt-0.5 sm:mt-1 relative border-3 sm:border-6 md:border-8 border-amber-400 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner bg-gradient-to-t from-pink-950/80 via-red-900/60 to-amber-950/80 h-20 sm:h-28 md:h-36 lg:h-40 flex flex-col items-center justify-center p-1.5 sm:p-2 flex-shrink-0">
              
              {bride.photo ? (
                <img 
                  src={bride.photo} 
                  alt={bride.fullName} 
                  className="w-full h-full object-cover object-center rounded-lg"
                />
              ) : (
                /* Royal Monogram & Name Emblem */
                <div className="relative text-center flex flex-col items-center justify-center">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-full border-2 border-amber-400 bg-red-950/90 flex items-center justify-center mb-1 shadow-md">
                    <span className="font-yatra text-amber-300 text-xs sm:text-base md:text-xl tracking-wider">
                      {bride.initials}
                    </span>
                  </div>
                  <div className="bg-amber-400 text-red-950 font-yatra text-xs sm:text-base md:text-xl px-2.5 sm:px-4 py-0.5 rounded-md border border-red-900 shadow inline-block tracking-wide">
                    {bride.fullName}
                  </div>
                </div>
              )}

              {/* Heart Burst Animated Overlay */}
              {activeEffect === 'megan' && (
                <div className="absolute inset-0 bg-pink-500/30 flex items-center justify-center backdrop-blur-xs animate-ping pointer-events-none">
                  <Heart className="w-10 h-10 sm:w-14 sm:h-14 text-pink-300 fill-current" />
                </div>
              )}

              {/* Romantic Sparkle Trail */}
              <div className="absolute top-1.5 right-1.5 text-amber-300">
                <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-300 animate-spin" />
              </div>
            </div>

            {/* Caption & Quirk Badges */}
            <div className="mt-1.5 sm:mt-3 space-y-1 sm:space-y-2">
              {bride.quote && (
                <p className="text-amber-300 font-rozha text-[11px] sm:text-sm md:text-base italic leading-tight">
                  {bride.quote}
                </p>
              )}
              
              <div className="bg-red-950/80 p-1.5 sm:p-2.5 rounded-xl border border-amber-500/40 text-[9px] sm:text-xs text-amber-100 text-left space-y-0.5 font-poppins">
                {bride.superpower && <p><strong>Superpower:</strong> {bride.superpower}</p>}
                {bride.weakness && <p><strong>Weakness:</strong> {bride.weakness}</p>}
                {bride.verdict && <p><strong>Verdict:</strong> {bride.verdict}</p>}
              </div>

              {/* Interactive Heart Explosion Button */}
              <ShaadiButton
                variant="pink"
                size="sm"
                fullWidth
                playSound={false}
                onClick={() => triggerHearts('megan')}
                iconLeft={<Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current animate-pulse text-yellow-300" />}
                iconRight={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-300" />}
              >
                {bride.buttonText || 'SEND BLESSINGS'} ({meganLikes})
              </ShaadiButton>
            </div>

          </div>
        </div>

        {/* THE GROOM (Slides in from Right) */}
        <div 
          ref={effectiveGroomRef}
          className="relative group flex flex-col will-change-transform"
          style={embedded ? { transform: 'translate3d(105%, 0, 0) rotate(4deg)', opacity: 0 } : undefined}
        >
          <div className="indian-border-gold bg-red-900 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 md:p-5 shadow-2xl relative velvet-bg transform group-hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between h-full">
            
            {/* Title Badge */}
            <div className="absolute -top-2.5 sm:-top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-red-950 px-3 sm:px-5 py-0.5 rounded-full font-yatra text-[10px] sm:text-sm md:text-base border-2 border-red-900 shadow-lg whitespace-nowrap z-10 tracking-wider">
              {groom.roleTitle || 'THE GROOM'}
            </div>

            {/* Portrait Frame */}
            <div className="mt-0.5 sm:mt-1 relative border-3 sm:border-6 md:border-8 border-amber-400 rounded-xl sm:rounded-2xl overflow-hidden shadow-inner bg-gradient-to-t from-orange-950/80 via-red-900/60 to-amber-950/80 h-20 sm:h-28 md:h-36 lg:h-40 flex flex-col items-center justify-center p-1.5 sm:p-2 flex-shrink-0">
              
              {groom.photo ? (
                <img 
                  src={groom.photo} 
                  alt={groom.fullName} 
                  className="w-full h-full object-cover object-center rounded-lg"
                />
              ) : (
                /* Royal Monogram & Name Emblem */
                <div className="relative text-center flex flex-col items-center justify-center">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 rounded-full border-2 border-amber-400 bg-red-950/90 flex items-center justify-center mb-1 shadow-md">
                    <span className="font-yatra text-amber-300 text-xs sm:text-base md:text-xl tracking-wider">
                      {groom.initials}
                    </span>
                  </div>
                  <div className="bg-amber-400 text-red-950 font-yatra text-xs sm:text-base md:text-xl px-2.5 sm:px-4 py-0.5 rounded-md border border-red-900 shadow inline-block tracking-wide">
                    {groom.fullName}
                  </div>
                </div>
              )}

              {/* Heart Burst Animated Overlay */}
              {activeEffect === 'brad' && (
                <div className="absolute inset-0 bg-yellow-500/30 flex items-center justify-center backdrop-blur-xs animate-ping pointer-events-none">
                  <Sparkles className="w-10 h-10 sm:w-14 sm:h-14 text-yellow-300" />
                </div>
              )}

              {/* Romantic Sparkle Trail */}
              <div className="absolute top-1.5 right-1.5 text-amber-300">
                <Star className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-300 fill-amber-300 animate-spin" />
              </div>
            </div>

            {/* Caption & Quirk Badges */}
            <div className="mt-1.5 sm:mt-3 space-y-1 sm:space-y-2">
              {groom.quote && (
                <p className="text-amber-300 font-rozha text-[11px] sm:text-sm md:text-base italic leading-tight">
                  {groom.quote}
                </p>
              )}
              
              <div className="bg-red-950/80 p-1.5 sm:p-2.5 rounded-xl border border-amber-500/40 text-[9px] sm:text-xs text-amber-100 text-left space-y-0.5 font-poppins">
                {groom.superpower && <p><strong>Superpower:</strong> {groom.superpower}</p>}
                {groom.weakness && <p><strong>Weakness:</strong> {groom.weakness}</p>}
                {groom.verdict && <p><strong>Verdict:</strong> {groom.verdict}</p>}
              </div>

              {/* Interactive Heart Explosion Button */}
              <ShaadiButton
                variant="orange"
                size="sm"
                fullWidth
                playSound={false}
                onClick={() => triggerHearts('brad')}
                iconLeft={<Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current animate-pulse text-red-900" />}
                iconRight={<Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-900" />}
              >
                {groom.buttonText || 'SALUTE BRAD'} ({bradLikes})
              </ShaadiButton>
            </div>

          </div>
        </div>

      </div>
    </>
  );

  if (embedded) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center pt-8 pb-8 sm:pt-10 sm:pb-10 md:pt-4 md:pb-4 px-3 sm:px-6 md:px-8 pointer-events-auto select-auto overflow-hidden">
        {content}
      </div>
    );
  }

  return (
    <section 
      id="couple" 
      ref={sectionRef}
      className="relative w-full min-h-screen md:h-screen flex flex-col justify-center items-center py-6 sm:py-8 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-[#061c14] via-[#0e3b2b] to-[#051a12] text-center overflow-hidden"
    >
      
      {/* ============================================================== */}
      {/* Royal Emerald & Gold Architectural Borders & Corner Medallions */}
      {/* Dynamic Scroll-driven Border Change Slide-In Effect             */}
      {/* ============================================================== */}
      {/* Top Border Strip */}
      <div 
        ref={topBorderRef}
        className="absolute top-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] z-30 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(0, -115%, 0)' }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/assets/borders/emerald_border_h.png')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
          }}
        />
      </div>

      {/* Bottom Border Strip */}
      <div 
        ref={bottomBorderRef}
        className="absolute bottom-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] z-30 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(0, 115%, 0)' }}
      >
        <div
          className="w-full h-full scale-y-[-1]"
          style={{
            backgroundImage: "url('/assets/borders/emerald_border_h.png')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
          }}
        />
      </div>

      {/* Left Border Strip */}
      <div 
        ref={leftBorderRef}
        className="absolute top-0 bottom-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] z-30 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-115%, 0, 0)' }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/assets/borders/emerald_border_v.png')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
          }}
        />
      </div>

      {/* Right Border Strip */}
      <div 
        ref={rightBorderRef}
        className="absolute top-0 bottom-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] z-30 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(115%, 0, 0)' }}
      >
        <div
          className="w-full h-full scale-x-[-1]"
          style={{
            backgroundImage: "url('/assets/borders/emerald_border_v.png')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
          }}
        />
      </div>

      {/* 4 Corner Medallions */}
      <div 
        ref={cornerTLRef}
        className="absolute top-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] h-[22px] sm:h-[26px] md:h-[30px] z-40 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-135%, -135%, 0)' }}
      >
        <img
          src="/assets/borders/emerald_corner.png"
          alt="Royal Corner Motif Top Left"
          className="w-full h-full object-contain select-none"
        />
      </div>
      <div 
        ref={cornerTRRef}
        className="absolute top-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] h-[22px] sm:h-[26px] md:h-[30px] z-40 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(135%, -135%, 0)' }}
      >
        <img
          src="/assets/borders/emerald_corner.png"
          alt="Royal Corner Motif Top Right"
          className="w-full h-full object-contain select-none scale-x-[-1]"
        />
      </div>
      <div 
        ref={cornerBLRef}
        className="absolute bottom-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] h-[22px] sm:h-[26px] md:h-[30px] z-40 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-135%, 135%, 0)' }}
      >
        <img
          src="/assets/borders/emerald_corner.png"
          alt="Royal Corner Motif Bottom Left"
          className="w-full h-full object-contain select-none scale-y-[-1]"
        />
      </div>
      <div 
        ref={cornerBRRef}
        className="absolute bottom-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] h-[22px] sm:h-[26px] md:h-[30px] z-40 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(135%, 135%, 0)' }}
      >
        <img
          src="/assets/borders/emerald_corner.png"
          alt="Royal Corner Motif Bottom Right"
          className="w-full h-full object-contain select-none scale-x-[-1] scale-y-[-1]"
        />
      </div>
      
      {content}

    </section>
  );
}
