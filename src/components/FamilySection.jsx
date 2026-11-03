import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shaadiAudio } from '../utils/audio';
import { WEDDING_CONFIG } from '../config/weddingConfig';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ============================================================================
 * SECTION 5: THE ROYAL FAMILIES (SOLITAIRE CARD DEAL ON SCROLL)
 * ============================================================================
 *
 * Choreography:
 * 1. Deck Assembly (Start):
 *    All 6 royal character cards start aligned and stacked together in a
 *    single physical deck in the center of the viewport, with organic
 *    deck-stacking jitter and layered shadows.
 *
 * 2. Solitaire Card Deal on Scroll:
 *    As the user scrolls down on this section:
 *    - Section is pinned in place.
 *    - Cards are dealt / thrown one by one from the central deck into their
 *      respective grid slots (Cards 0 to 5 in sequence).
 *    - Each card toss features authentic card game physics: a mid-flight 3D
 *      lift (scale up), directional wrist flick tilt, parabolic trajectory arc,
 *      and a crisp deceleration snap landing on the royal felt.
 *
 * 3. Final Landing & Interaction:
 *    Once dealt, cards rest in their authentic royal 3x2 (desktop) / 2x3 (mobile)
 *    grid layout with hover lifts and dramatic click audio enabled.
 *
 * 4. 100% Reversible:
 *    Scrolling backwards throws the cards back into the single deck stack.
 */

// Stacking jitter for the 6 cards in the initial deck (Card 0 top -> Card 5 bottom)
const DECK_JITTER = [
  { rot: 0, x: 0, y: 0 },
  { rot: 2.2, x: -1.5, y: 1.5 },
  { rot: -2.6, x: 2.2, y: -1 },
  { rot: 1.8, x: -2, y: 2.2 },
  { rot: -1.5, x: 1.8, y: 1 },
  { rot: 1.2, x: -1, y: -1.5 },
];

export default function FamilySection() {
  const familyConfig = WEDDING_CONFIG.familySection || {};
  const familyMembers = familyConfig.members || [];

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const deckMatRef = useRef(null);
  const dealHintRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const gridEl = gridRef.current;
    if (!sectionEl || !gridEl) return;

    // Small delay to ensure styles and layouts have settled
    let ctx;
    const initAnimation = () => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      ctx = gsap.context(() => {
        // Measure offset delta between each card's grid slot and the deck center
        const computeDeltas = () => {
          const gCenterX = gridEl.offsetWidth / 2;
          const gCenterY = gridEl.offsetHeight / 2;

          return cards.map((card) => {
            const cX = card.offsetLeft + card.offsetWidth / 2;
            const cY = card.offsetTop + card.offsetHeight / 2;
            return {
              x: gCenterX - cX,
              y: gCenterY - cY,
            };
          });
        };

        let deltas = computeDeltas();

        // Master ScrollTrigger timeline pinned for dealing, viewing, and gathering before Section 6
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: 'top top',
            end: '+=4200',
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              deltas = computeDeltas();
            },
          },
        });

        // 1. Initial State: Stack all cards directly in the single center deck
        cards.forEach((card, i) => {
          const jitter = DECK_JITTER[i % DECK_JITTER.length];
          const d = deltas[i] || { x: 0, y: 0 };

          gsap.set(card, {
            x: d.x + jitter.x,
            y: d.y + jitter.y,
            rotation: jitter.rot,
            scale: 1,
            zIndex: 35 - i, // Card 0 is top of deck, Card 5 is bottom
            transformOrigin: '50% 50%',
            force3D: true,
          });
        });

        // 2. Deal hint visible initially, fades out as dealing starts
        if (dealHintRef.current) {
          masterTl.to(
            dealHintRef.current,
            { opacity: 0, scale: 0.9, duration: 0.04, ease: 'power1.out' },
            0.13
          );
        }

        // 3. Central deck base silhouette fades out as last cards leave
        if (deckMatRef.current) {
          masterTl.to(
            deckMatRef.current,
            { opacity: 0, scale: 0.85, duration: 0.06, ease: 'power2.inOut' },
            0.42
          );
        }

        // ==============================================================
        // 4. Sequential Card Dealing ("Throws" cards one by one onto screen)
        // Timeline schedule:
        // 0.00 -> 0.14: Initial Hold (Water wave transition clears, full single deck visible)
        // 0.14 -> 0.48: Dealing phase (Cards thrown one by one into grid slots)
        // 0.48 -> 0.70: Reading / Hold Phase (All 6 cards landed, interactive, viewable)
        // 0.70 -> 0.90: Card Gathering ("Bring all cards together first into deck")
        // 0.90 -> 1.00: Gathered Deck Hold & Unpin transition to Section 6 Baraat
        // ==============================================================
        const dealStart = 0.14;
        const dealSpan = 0.33; // 0.14 to 0.47
        const dealStep = dealSpan / cards.length;
        const throwDuration = dealStep * 1.35; // Slight rhythmic overlap like Solitaire deal

        cards.forEach((card, i) => {
          const startTime = dealStart + i * dealStep;
          const d = deltas[i] || { x: 0, y: 0 };
          const jitter = DECK_JITTER[i % DECK_JITTER.length];

          // Dynamic throw flick: left cards tilt CCW (-8.5deg), right cards tilt CW (+8.5deg)
          let throwTilt = 0;
          if (d.x > 30) throwTilt = -8.5;
          else if (d.x < -30) throwTilt = 8.5;
          else throwTilt = i % 2 === 0 ? 3 : -3;

          masterTl.fromTo(
            card,
            {
              x: d.x + jitter.x,
              y: d.y + jitter.y,
              rotation: jitter.rot,
              scale: 1,
              zIndex: 35 - i,
            },
            {
              keyframes: [
                {
                  // Mid-flight arc: lift upwards in 3D and tilt
                  x: (d.x + jitter.x) * 0.45,
                  y: (d.y + jitter.y) * 0.45 - 28,
                  rotation: throwTilt,
                  scale: 1.08,
                  zIndex: 50,
                  duration: throwDuration * 0.45,
                  ease: 'power2.out',
                },
                {
                  // Snap landing into target grid slot
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  zIndex: 10 + i,
                  duration: throwDuration * 0.55,
                  ease: 'power2.out',
                },
              ],
            },
            startTime
          );

          // Audio click snap on card landing
          masterTl.call(
            () => {
              shaadiAudio.playPop();
            },
            null,
            startTime + throwDuration
          );
        });

        // ==============================================================
        // 5. Card Gathering Phase ("Bring all cards together first")
        // As user scrolls towards Section 6:
        // Central deck mat reappears, and cards fly back into the deck stack!
        // ==============================================================
        if (deckMatRef.current) {
          masterTl.to(
            deckMatRef.current,
            { opacity: 1, scale: 1, duration: 0.05, ease: 'power2.out' },
            0.70
          );
        }

        const gatherStart = 0.70;
        const gatherSpan = 0.18; // 0.70 to 0.88
        const gatherStep = gatherSpan / cards.length;
        const gatherDuration = gatherStep * 1.35;

        // Cards gather in reverse order (Card 5 -> Card 0) back into the central deck stack
        cards.forEach((card, i) => {
          // Reverse index so bottom-right card returns first, top-left card lands on top
          const reverseIndex = (cards.length - 1) - i;
          const gatherTime = gatherStart + reverseIndex * gatherStep;
          const d = deltas[i] || { x: 0, y: 0 };
          const jitter = DECK_JITTER[i % DECK_JITTER.length];

          let throwTilt = 0;
          if (d.x > 30) throwTilt = -8.5;
          else if (d.x < -30) throwTilt = 8.5;
          else throwTilt = i % 2 === 0 ? 3 : -3;

          masterTl.fromTo(
            card,
            {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              zIndex: 10 + i,
            },
            {
              keyframes: [
                {
                  // Mid-flight arc back to center
                  x: (d.x + jitter.x) * 0.45,
                  y: (d.y + jitter.y) * 0.45 - 28,
                  rotation: -throwTilt,
                  scale: 1.08,
                  zIndex: 50,
                  duration: gatherDuration * 0.45,
                  ease: 'power2.in',
                },
                {
                  // Snap back into deck position
                  x: d.x + jitter.x,
                  y: d.y + jitter.y,
                  rotation: jitter.rot,
                  scale: 1,
                  zIndex: 35 - i,
                  duration: gatherDuration * 0.55,
                  ease: 'power2.out',
                },
              ],
            },
            gatherTime
          );

          // Audio pop as each card settles back into the deck stack
          masterTl.call(
            () => {
              shaadiAudio.playPop();
            },
            null,
            gatherTime + gatherDuration
          );
        });

        // Buffer hold at the end so assembled deck is admired before unpinning towards Section 6
        masterTl.to({}, { duration: 0.11 }, 0.89);
      }, sectionRef);
    };

    const timer = setTimeout(initAnimation, 120);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [familyMembers.length]);

  return (
    <section
      id="family"
      ref={sectionRef}
      className="relative z-10 w-full h-screen min-h-screen max-h-screen overflow-hidden flex flex-col justify-between pt-4 sm:pt-5 md:pt-6 pb-4 sm:pb-5 md:pb-6 px-2.5 sm:px-6 md:px-10 text-center select-none"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full justify-between relative">
        
        {/* ============================================================== */}
        {/* 1. TOP HEADER & TITLE                                          */}
        {/* ============================================================== */}
        <div className="text-center pt-0.5 sm:pt-1 flex-shrink-0 z-20">
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
        {/* 2. SOLITAIRE CARD DECK & REVEAL GRID                           */}
        {/* ============================================================== */}
        <div className="w-full flex-1 flex items-center justify-center min-h-0 my-auto py-1 sm:py-2 relative">
          
          {/* Central Deck Base Silhouette / Golden Mat */}
          <div
            ref={deckMatRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex flex-col items-center justify-center select-none aspect-[1792/2400] h-full max-h-[248px] sm:max-h-[290px] md:max-h-[345px] lg:max-h-[375px] w-auto"
          >
            <div className="w-full h-full rounded-xl border-2 border-dashed border-amber-400/40 bg-amber-950/25 backdrop-blur-[1px] shadow-[0_0_20px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center p-2 text-center">
              <div className="font-pixel text-[8.5px] sm:text-[10px] text-amber-300/70 tracking-widest uppercase">
                👑 ROYAL DECK 👑
              </div>
              <div className="font-rozha text-amber-200/50 text-[9px] sm:text-[11px] italic mt-0.5">
                Solitaire Deal
              </div>
            </div>
          </div>

          {/* Cards Grid: position:relative ensures offsetLeft/offsetTop are pure grid coordinates */}
          <div
            ref={gridRef}
            className="relative grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6 lg:gap-8 justify-center items-center h-full max-h-[570px] sm:max-h-[630px] md:max-h-[710px] w-full max-w-sm sm:max-w-2xl md:max-w-5xl lg:max-w-6xl mx-auto"
          >
            {familyMembers.map((member, index) => (
              <div
                key={member.id || member.name}
                ref={(el) => (cardsRef.current[index] = el)}
                className="relative aspect-[1792/2400] h-full max-h-[248px] sm:max-h-[290px] md:max-h-[345px] lg:max-h-[375px] mx-auto will-change-transform select-none"
              >
                <article
                  onClick={() => shaadiAudio.playDramaticHit()}
                  className="relative w-full h-full rounded-xl shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-transform duration-300 cursor-pointer group select-none"
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
                      <p className="font-rozha text-red-900/90 text-[7px] sm:text-[8px] md:text-[9.5px] lg:text-[10.5px] italic leading-tight mt-0.5 px-0.5">
                        {member.title}
                      </p>
                    </div>

                    {/* Quote Box */}
                    <div className="w-full bg-red-950/10 rounded border border-red-900/15 py-0.5 px-1 text-red-950 text-[6.5px] sm:text-[7.5px] md:text-[8.5px] lg:text-[9.5px] font-poppins leading-tight italic my-auto line-clamp-2">
                      {member.quote}
                    </div>
                  </div>

                  {/* 3. Funny Tag Pill: Anchored at the bottom of the card */}
                  <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-auto max-w-[90%] bg-amber-400 text-red-950 font-pixel text-[6px] sm:text-[7.5px] md:text-[9px] lg:text-[10px] font-bold py-0.5 px-2 rounded border border-red-950/50 shadow-sm text-center tracking-wide z-10 whitespace-nowrap pointer-events-none">
                    ⚡ {member.stats}
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* Deal On Scroll Hint Indicator */}
          <div
            ref={dealHintRef}
            className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none z-30 transition-all duration-300 whitespace-nowrap"
          >
            <div className="bg-red-950/85 backdrop-blur border border-amber-400/60 text-amber-300 font-pixel text-[8px] sm:text-[9.5px] px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
              <span>🎴</span>
              <span>SCROLL DOWN TO DEAL CARDS</span>
              <span>↓</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
