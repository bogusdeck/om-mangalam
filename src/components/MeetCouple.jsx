/**
 * ============================================================================
 * SECTION 3: THE BRIDE AND THE GROOM (MADHUBANI FOLK-ART ARCH EDITION)
 * ============================================================================
 *
 * LAYOUT MATHS & CONCEPT ("Two Arches, One Knot"):
 * 1. Desktop (>= 900px):
 *    - 3-column composition:
 *      * Left (Col 1): Bride's 3:4 pointed Madhubani arch card (~340px-380px max-width).
 *      * Centre (Col 2): Sun medallion (~180px-220px) featuring the sacred "weds" emblem
 *        and twin auspicious Madhubani fish (Matsya) motifs beneath.
 *      * Right (Col 3): Groom's 3:4 pointed Madhubani arch card (~340px-380px max-width).
 *    - A ceremonial gold gathbandhan cord (SVG path) loops from the bride's arch through
 *      the centre medallion's knot to the groom's arch, drawing on via GSAP strokeDashoffset.
 *
 * 2. Mobile (< 900px):
 *    - Single-column vertical stack:
 *      Bride's arch -> Centre medallion (compact ~120px) -> Groom's arch.
 *    - A vertical ceremonial cord links the cards top-to-bottom through the medallion.
 *
 * 3. Top Valence (Toran):
 *    - Traditional Madhubani marigold garland (toran strands) hanging across the top,
 *      each strand swaying gently with staggered CSS rotation delays.
 *
 * 4. Drop-in Asset Config (ART):
 *    - All visual assets are centralized in the `ART` config object below.
 *    - In Phase 1, any key set to `null` (or empty array) dynamically renders crisp,
 *      semantic inline SVG & CSS Madhubani folk-art vector artwork with zero dependencies.
 *    - In Phase 2, dropping an image path into `ART` immediately replaces the placeholder.
 * ============================================================================
 */

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shaadiAudio } from '../utils/audio';
import { WEDDING_CONFIG } from '../config/weddingConfig';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ---------------------------------------------------------------------------
// DROP-IN ASSET CONFIG (Phase 1 placeholders -> Phase 2 assets)
// ---------------------------------------------------------------------------
export const ART = {
  archFrame: '/assets/s3/arch-frame.png',
  ribbonPlate: '/assets/s3/ribbon-plate.png',
  centreMedallion: '/assets/s3/centre-medallion.png',
  bgTile: null,
  toranStrand: null,
  portraitBride: null,    // bride photo URL (null displays initials monogram)
  portraitGroom: null,    // groom photo URL (null displays initials monogram)
  petals: {
    lotus: [
      '/assets/s3/petals/lotus-1.png',
      '/assets/s3/petals/lotus-2.png',
      '/assets/s3/petals/lotus-3.png',
      '/assets/s3/petals/lotus-4.png',
    ],
    marigold: [
      '/assets/s3/petals/marigold-1.png',
      '/assets/s3/petals/marigold-2.png',
      '/assets/s3/petals/marigold-3.png',
      '/assets/s3/petals/marigold-4.png',
    ],
  },
  icons: {
    lotus: '/assets/s3/icons/lotus.png',
    fish: '/assets/s3/icons/fish.png',
    sun: '/assets/s3/icons/sun.png',
    conch: '/assets/s3/icons/conch.png',
    diya: '/assets/s3/icons/diya.png',
    feather: '/assets/s3/icons/feather.png',
  },
};

// ---------------------------------------------------------------------------
// INLINE MADHUBANI VECTOR PLACEHOLDER ARTWORK (Phase 1)
// ---------------------------------------------------------------------------

/** Pointed Cusped Madhubani Arch Window SVG Definition */
function ArchWindowDefs() {
  return (
    <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
      <defs>
        {/* Arch clip path in relative coordinates (0 to 1) */}
        <clipPath id="madhubani-arch-clip" clipPathUnits="objectBoundingBox">
          <path d="M 0,0.38 C 0,0.22 0.22,0.18 0.45,0.06 C 0.48,0.02 0.5,0 0.5,0 C 0.5,0 0.52,0.02 0.55,0.06 C 0.78,0.18 1,0.22 1,0.38 L 1,1 L 0,1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** 3:4 Decorative Madhubani Arch Frame Placeholder */
function ArchFramePlaceholder({ className = '' }) {
  return (
    <svg 
      viewBox="0 0 300 400" 
      className={`w-full h-full select-none pointer-events-none ${className}`}
      preserveAspectRatio="none"
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Card Base */}
      <rect x="4" y="4" width="292" height="392" fill="#fff8e7" stroke="#1b1210" strokeWidth="3" />
      <rect x="10" y="10" width="280" height="380" stroke="#b8862b" strokeWidth="1.5" />
      
      {/* Geometric Madhubani Triangle/Chevron Border (Top & Sides) */}
      <g stroke="#1b1210" strokeWidth="1.5" fill="#b3141c">
        <polygon points="12,12 24,24 12,24" />
        <polygon points="288,12 276,24 288,24" />
        <polygon points="40,12 52,24 28,24" />
        <polygon points="80,12 92,24 68,24" />
        <polygon points="120,12 132,24 108,24" />
        <polygon points="160,12 172,24 148,24" />
        <polygon points="200,12 212,24 188,24" />
        <polygon points="240,12 252,24 228,24" />
      </g>

      {/* Spandrel Corner Motifs (Mithila Peacock / Floral Fill) */}
      <g stroke="#1b1210" strokeWidth="1.5" fill="#b8862b">
        {/* Left Spandrel */}
        <circle cx="48" cy="54" r="10" />
        <path d="M 36,72 C 38,50 64,42 78,54 C 64,68 46,78 36,72 Z" fill="#b3141c" />
        <line x1="28" y1="36" x2="68" y2="76" stroke="#1b1210" strokeWidth="1" />
        <line x1="36" y1="28" x2="76" y2="68" stroke="#1b1210" strokeWidth="1" />
        {/* Right Spandrel (Mirrored) */}
        <circle cx="252" cy="54" r="10" />
        <path d="M 264,72 C 262,50 236,42 222,54 C 236,68 254,78 264,72 Z" fill="#b3141c" />
        <line x1="272" y1="36" x2="232" y2="76" stroke="#1b1210" strokeWidth="1" />
        <line x1="264" y1="28" x2="224" y2="68" stroke="#1b1210" strokeWidth="1" />
      </g>

      {/* Architectural Pillars */}
      <rect x="22" y="145" width="14" height="235" fill="#f7e8c4" stroke="#1b1210" strokeWidth="2" />
      <line x1="29" y1="145" x2="29" y2="380" stroke="#b8862b" strokeWidth="1.5" />
      <rect x="264" y="145" width="14" height="235" fill="#f7e8c4" stroke="#1b1210" strokeWidth="2" />
      <line x1="271" y1="145" x2="271" y2="380" stroke="#b8862b" strokeWidth="1.5" />

      {/* Cusped Arch Outer Moulding with Madhubani Dots */}
      <path 
        d="M 36,152 C 36,88 102,72 144,38 C 147,35 150,32 150,32 C 150,32 153,35 156,38 C 198,72 264,88 264,152" 
        stroke="#1b1210" 
        strokeWidth="3.5"
      />
      <path 
        d="M 40,152 C 40,94 104,78 144,46 C 147,43 150,40 150,40 C 150,40 153,43 156,46 C 196,78 260,94 260,152" 
        stroke="#b8862b" 
        strokeWidth="2"
      />

      {/* Sacred Arch Apex Kalash / Sun Finial */}
      <circle cx="150" cy="22" r="7" fill="#b3141c" stroke="#1b1210" strokeWidth="2" />
      <circle cx="150" cy="22" r="3" fill="#b8862b" />
      <polygon points="150,8 145,15 155,15" fill="#b8862b" stroke="#1b1210" strokeWidth="1.5" />

      {/* Decorative Stage Plinth Border at Bottom */}
      <rect x="10" y="380" width="280" height="10" fill="#b8862b" stroke="#1b1210" strokeWidth="1.5" />
    </svg>
  );
}

/** Central Sun Medallion & Twin Fish (Matsya) Emblem */
function CentreMedallionPlaceholder({ className = '', rotating = true }) {
  return (
    <div className={`relative w-44 h-44 sm:w-52 sm:h-52 select-none flex items-center justify-center ${className}`}>
      {/* 60s Slowly Rotating Ray Ring */}
      <svg 
        viewBox="0 0 240 240" 
        className={`absolute inset-0 w-full h-full ${rotating ? 'animate-medallion-spin' : ''}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 16 Radiating Madhubani Sun Rays */}
        <g stroke="#1b1210" strokeWidth="2">
          {[...Array(16)].map((_, i) => {
            const rot = i * 22.5;
            const isRed = i % 2 === 0;
            return (
              <g key={i} transform={`rotate(${rot} 120 120)`}>
                <polygon 
                  points="120,6 113,28 127,28" 
                  fill={isRed ? '#b3141c' : '#b8862b'} 
                />
                <circle cx="120" cy="34" r="3" fill="#1b1210" />
              </g>
            );
          })}
        </g>
      </svg>

      {/* Fixed Center Core Medallion */}
      <svg 
        viewBox="0 0 240 240" 
        className="w-full h-full relative z-10"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Ring & Border */}
        <circle cx="120" cy="120" r="76" fill="#fff8e7" stroke="#1b1210" strokeWidth="3.5" />
        <circle cx="120" cy="120" r="70" stroke="#b8862b" strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="120" cy="120" r="64" fill="#f7e8c4" stroke="#1b1210" strokeWidth="2" />

        {/* Traditional Auspicious Madhubani Twin Fish (Matsya Motif) */}
        {/* Left Fish (Facing Right) */}
        <g stroke="#1b1210" strokeWidth="1.5">
          <path d="M 80,154 C 95,142 110,146 118,158 C 110,166 92,166 80,154 Z" fill="#b8862b" />
          <polygon points="76,154 68,146 68,162" fill="#b3141c" />
          <circle cx="112" cy="154" r="2.5" fill="#1b1210" />
          <path d="M 94,148 C 96,154 94,160 92,163" stroke="#1b1210" strokeWidth="1" />
          <path d="M 102,150 C 104,154 102,158 100,161" stroke="#1b1210" strokeWidth="1" />
        </g>

        {/* Right Fish (Facing Left) */}
        <g stroke="#1b1210" strokeWidth="1.5">
          <path d="M 160,154 C 145,142 130,146 122,158 C 130,166 148,166 160,154 Z" fill="#b8862b" />
          <polygon points="164,154 172,146 172,162" fill="#b3141c" />
          <circle cx="128" cy="154" r="2.5" fill="#1b1210" />
          <path d="M 146,148 C 144,154 146,160 148,163" stroke="#1b1210" strokeWidth="1" />
          <path d="M 138,150 C 136,154 138,158 140,161" stroke="#1b1210" strokeWidth="1" />
        </g>

        {/* Knot Anchor Ring */}
        <circle cx="120" cy="158" r="4.5" fill="#b3141c" stroke="#1b1210" strokeWidth="1.5" />

        {/* Live Sacred Sanskrit/English "weds" Typography */}
        <text 
          x="120" 
          y="114" 
          textAnchor="middle" 
          className="font-shrikhand text-[22px] tracking-widest uppercase font-bold"
          fill="#b3141c"
          stroke="#1b1210"
          strokeWidth="0.8"
        >
          weds
        </text>

        {/* Auspicious Sacred Vermilion Bindi / Floral Core */}
        <circle cx="120" cy="84" r="5" fill="#b3141c" stroke="#1b1210" strokeWidth="1.5" />
        <circle cx="120" cy="84" r="2" fill="#b8862b" />
      </svg>
    </div>
  );
}

/** Stat Row SVG Icons (Flat Madhubani Vectors) */
function StatIcon({ type = 'lotus' }) {
  if (ART.icons[type]) {
    return <img src={ART.icons[type]} alt="" className="w-4 h-4 object-contain flex-shrink-0" />;
  }

  if (type === 'lotus') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="#1b1210" strokeWidth="1.5">
        <path d="M 12,3 C 10,8 10,13 12,18 C 14,13 14,8 12,3 Z" fill="#b3141c" />
        <path d="M 12,7 C 7,10 6,15 10,18 C 10,14 11,10 12,7 Z" fill="#b8862b" />
        <path d="M 12,7 C 17,10 18,15 14,18 C 14,14 13,10 12,7 Z" fill="#b8862b" />
        <path d="M 7,18 C 12,20 12,20 17,18" stroke="#1b1210" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === 'fish') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="#1b1210" strokeWidth="1.5">
        <path d="M 3,12 C 7,7 15,8 21,12 C 15,16 7,17 3,12 Z" fill="#b8862b" />
        <polygon points="21,12 23,8 23,16" fill="#b3141c" />
        <circle cx="7" cy="11.5" r="1.5" fill="#1b1210" />
      </svg>
    );
  }

  if (type === 'sun') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="#1b1210" strokeWidth="1.5">
        <circle cx="12" cy="12" r="5" fill="#b8862b" />
        <circle cx="12" cy="12" r="2.5" fill="#b3141c" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
        <line x1="5" y1="5" x2="7" y2="7" />
        <line x1="17" y1="17" x2="19" y2="19" />
        <line x1="5" y1="19" x2="7" y2="17" />
        <line x1="17" y1="7" x2="19" y2="5" />
      </svg>
    );
  }

  if (type === 'conch') {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" stroke="#1b1210" strokeWidth="1.5">
        <path d="M 6,17 C 4,14 6,7 13,5 C 19,3 21,8 19,12 C 17,16 12,19 6,17 Z" fill="#fff8e7" />
        <path d="M 13,5 C 15,9 14,14 8,16" stroke="#b8862b" strokeWidth="1.2" />
        <path d="M 10,7 C 12,10 11,13 7,15" stroke="#1b1210" strokeWidth="1" />
        <circle cx="6" cy="17" r="1.5" fill="#b3141c" />
      </svg>
    );
  }

  return null;
}

/** Top Marigold Toran Garland with Staggered Sway Animations */
function MarigoldToran({ strandCount = 9 }) {
  const delays = ['0s', '0.4s', '0.8s', '0.2s', '0.6s', '1.0s', '0.3s', '0.7s', '0.5s'];
  const durations = ['3.2s', '3.8s', '4.1s', '2.9s', '3.5s', '4.0s', '3.3s', '3.7s', '3.1s'];

  return (
    <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none flex flex-col items-center">
      {/* Top Auspicious Gold Cord */}
      <div className="w-full h-2 bg-[#b8862b] border-y border-[#1b1210]" />

      {/* Hanging Garland Strands */}
      <div className="w-full max-w-5xl px-4 flex justify-between">
        {[...Array(strandCount)].map((_, i) => {
          const delay = delays[i % delays.length];
          const duration = durations[i % durations.length];
          const isLong = i % 2 === 0;

          return (
            <div
              key={i}
              className="toran-strand origin-top flex flex-col items-center"
              style={{
                animation: `toranSway ${duration} ease-in-out infinite alternate`,
                animationDelay: delay,
              }}
            >
              {/* String */}
              <div className="w-[1.5px] h-3 bg-[#b8862b]" />

              {/* Marigold Blossom 1 (Gold) */}
              <div className="w-4 h-4 rounded-full bg-[#b8862b] border-[1.5px] border-[#1b1210] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b3141c]" />
              </div>

              {/* Mango Leaf */}
              <div className="w-2.5 h-3 bg-[#0e3b2b] border border-[#1b1210] rotate-45 -my-0.5" />

              {/* Marigold Blossom 2 (Red) */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#b3141c] border-[1.5px] border-[#1b1210] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#fff8e7]" />
              </div>

              {isLong && (
                <>
                  <div className="w-2.5 h-3 bg-[#0e3b2b] border border-[#1b1210] -rotate-45 -my-0.5" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#b8862b] border-[1.5px] border-[#1b1210] flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#b3141c]" />
                  </div>
                </>
              )}

              {/* Brass Bell Finial */}
              <div className="w-2 h-2.5 bg-[#b8862b] border border-[#1b1210] rounded-b-sm mt-0.5" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// MAIN COMPONENT: MeetCouple
// ---------------------------------------------------------------------------
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

  // References for standalone and orchestration
  const sectionRef = useRef(null);
  const localBrideRef = useRef(null);
  const localGroomRef = useRef(null);
  const localTitleRef = useRef(null);
  const medallionRef = useRef(null);
  const toranRef = useRef(null);
  const desktopCordRef = useRef(null);
  const mobileCordTopRef = useRef(null);
  const mobileCordBottomRef = useRef(null);
  const bridePlateRef = useRef(null);
  const groomPlateRef = useRef(null);
  const petalContainerRef = useRef(null);

  const effectiveBrideRef = brideCardRef || localBrideRef;
  const effectiveGroomRef = groomCardRef || localGroomRef;
  const effectiveTitleRef = titleRef || localTitleRef;

  // Active Petals Counter for Spam Prevention (Cap <= 60)
  const activePetalsRef = useRef([]);

  // -------------------------------------------------------------------------
  // GSAP SCROLL REVEAL ORCHESTRATION (Plays once on scroll)
  // -------------------------------------------------------------------------
  useEffect(() => {
    const prefersReducedMotion = 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return; // Keep final states immediately

    // Set initial stroke-dashoffset for Gathbandhan cords
    const initCord = (cordEl) => {
      if (!cordEl) return 0;
      const length = cordEl.getTotalLength ? cordEl.getTotalLength() : 300;
      cordEl.style.strokeDasharray = length;
      cordEl.style.strokeDashoffset = length;
      return length;
    };

    const dCordLen = initCord(desktopCordRef.current);
    const mCordTopLen = initCord(mobileCordTopRef.current);
    const mCordBottomLen = initCord(mobileCordBottomRef.current);

    const triggerTarget = embedded 
      ? effectiveTitleRef.current?.closest('.sticky, [ref="coupleLayerRef"]') || effectiveTitleRef.current 
      : sectionRef.current;

    if (!triggerTarget) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerTarget,
          start: 'top 75%',
          once: true,
        },
      });

      // 1. Toran drops in from ceiling
      if (toranRef.current) {
        tl.from(toranRef.current, {
          y: -30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      // 2. Arch cards rise up and fade in (in standalone mode)
      if (!embedded) {
        if (effectiveBrideRef.current && effectiveGroomRef.current) {
          tl.from([effectiveBrideRef.current, effectiveGroomRef.current], {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
          }, '-=0.5');
        }
      }

      // 3. Ribbon plates slide in from the outer sides
      if (bridePlateRef.current && groomPlateRef.current) {
        tl.from(bridePlateRef.current, {
          x: -30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        }, '-=0.4');
        tl.from(groomPlateRef.current, {
          x: 30,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        }, '<');
      }

      // 4. Medallion scales in with joyful back.out bounce
      if (medallionRef.current) {
        tl.from(medallionRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.9,
          ease: 'back.out(1.7)',
        }, '-=0.6');
      }

      // 5. Gathbandhan cord draws in connecting arches to medallion
      if (desktopCordRef.current && dCordLen > 0) {
        tl.to(desktopCordRef.current, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: 'power2.inOut',
        }, '-=0.5');
      }
      if (mobileCordTopRef.current && mCordTopLen > 0) {
        tl.to(mobileCordTopRef.current, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        }, '-=0.8');
      }
      if (mobileCordBottomRef.current && mCordBottomLen > 0) {
        tl.to(mobileCordBottomRef.current, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        }, '-=0.6');
      }
    });

    return () => ctx.revert();
  }, [embedded, effectiveBrideRef, effectiveGroomRef, effectiveTitleRef]);

  // -------------------------------------------------------------------------
  // PETAL BURST LOGIC (14 petals, capped <= 60, clean up after 1.2-2.0s)
  // -------------------------------------------------------------------------
  const triggerPetalBurst = (e, person) => {
    // Audio feedbacks
    shaadiAudio.playPop();
    shaadiAudio.playCelebrationFanfare();

    // Increment Counter
    if (person === 'megan') setMeganLikes((prev) => prev + 1);
    if (person === 'brad') setBradLikes((prev) => prev + 1);

    const prefersReducedMotion = 
      typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !petalContainerRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const isBride = person === 'megan';
    const petalImages = isBride ? ART.petals.lotus : ART.petals.marigold;
    const hasCustomPetals = Array.isArray(petalImages) && petalImages.length > 0;

    const PETAL_COUNT = 14;
    const MAX_PETALS_ON_SCREEN = 60;

    // Prune oldest if above capacity
    while (activePetalsRef.current.length + PETAL_COUNT > MAX_PETALS_ON_SCREEN) {
      const oldest = activePetalsRef.current.shift();
      if (oldest && oldest.parentNode) oldest.remove();
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
      const petal = document.createElement('div');
      petal.className = 'fixed pointer-events-none z-50';
      petal.style.left = `${originX}px`;
      petal.style.top = `${originY}px`;

      if (hasCustomPetals) {
        const imgUrl = petalImages[i % petalImages.length];
        petal.innerHTML = `<img src="${imgUrl}" alt="" class="w-4 h-4 object-contain select-none" />`;
      } else {
        // Built-in Madhubani flat vector petal placeholder
        const fill = isBride 
          ? (i % 2 === 0 ? '#b3141c' : '#b8862b') 
          : (i % 2 === 0 ? '#b8862b' : '#d97706');
        
        petal.innerHTML = `
          <svg viewBox="0 0 16 16" width="14" height="14">
            <path d="M 8,1 C 3,5 3,11 8,15 C 13,11 13,5 8,1 Z" fill="${fill}" stroke="#1b1210" stroke-width="1.5" />
          </svg>
        `;
      }

      petalContainerRef.current.appendChild(petal);
      activePetalsRef.current.push(petal);

      // Random trajectory physics (flying up and outwards)
      const angle = (Math.random() * 140 + 20) * (Math.PI / 180); // upward arc 20deg to 160deg
      const distance = Math.random() * 90 + 60;
      const targetX = Math.cos(angle) * (Math.random() > 0.5 ? distance : -distance);
      const targetY = -Math.sin(angle) * distance - (Math.random() * 40 + 20);
      const rotation = (Math.random() - 0.5) * 540;
      const duration = Math.random() * 0.8 + 1.2; // 1.2s to 2.0s

      gsap.to(petal, {
        x: targetX,
        y: targetY,
        rotation: rotation,
        opacity: 0,
        duration: duration,
        ease: 'power2.out',
        onComplete: () => {
          if (petal.parentNode) petal.remove();
          activePetalsRef.current = activePetalsRef.current.filter((p) => p !== petal);
        },
      });
    }
  };

  // -------------------------------------------------------------------------
  // CARD BUILDER: ARCH, RIBBON, QUOTE, STATS, BUTTON
  // -------------------------------------------------------------------------
  const renderCard = (personKey) => {
    const isBride = personKey === 'megan';
    const data = isBride ? bride : groom;
    const likes = isBride ? meganLikes : bradLikes;
    const cardRef = isBride ? effectiveBrideRef : effectiveGroomRef;
    const plateRef = isBride ? bridePlateRef : groomPlateRef;

    const photoUrl = isBride ? (ART.portraitBride || data.photo) : (ART.portraitGroom || data.photo);
    const initialText = data.initials || (isBride ? 'MF' : 'BP');
    const roleTag = data.roleTitle || (isBride ? 'The Bride' : 'The Groom');
    const fullName = data.fullName || (isBride ? 'Megan Fox' : 'Brad Pitt');
    const quote = data.quote || (isBride ? 'Apparently, she said yes willingly.' : 'He was given approximately 3 seconds to think.');
    const superpower = data.superpower || (isBride ? 'Shopping for 8 hours without drinking water' : 'Finishing Paneer Tikka in 4 seconds');
    const weakness = data.weakness || (isBride ? 'Cold Coffee & Instagram Reels' : 'Saying "Haji Papa" to everything');
    const verdict = data.verdict || (isBride ? 'Approved by 14 Mami-jis & 8 Bua-jis' : 'Will now ask Megan for permission for everything');
    const buttonLabel = data.buttonText || (isBride ? 'Send Blessings' : 'Salute Brad');

    return (
      <div
        ref={cardRef}
        className={`w-full max-w-[340px] sm:max-w-[370px] lg:max-w-[390px] flex flex-col items-center will-change-transform ${
          isBride ? 'hover:-translate-y-1.5 hover:-rotate-2' : 'hover:-translate-y-1.5 hover:rotate-2'
        } transition-transform duration-300 ease-out`}
      >
        {/* 1. THE ARCH FRAME (3:4 aspect ratio with window inside) */}
        <div className="relative w-full aspect-[3/4] select-none">
          {/* Window Container (12% sides, 9% top, 11% bottom) */}
          <div 
            className="absolute left-[12%] right-[12%] top-[9%] bottom-[11%] flex items-center justify-center overflow-hidden z-0"
            style={{ clipPath: 'url(#madhubani-arch-clip)' }}
          >
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={fullName}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              /* Flat Monogram Initials in Cream/Gold Circle */
              <div className="w-full h-full bg-[#f7e8c4] flex flex-col items-center justify-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#fff8e7] border-[3px] border-[#1b1210] flex items-center justify-center">
                  <span className={`font-shrikhand text-3xl sm:text-4xl ${isBride ? 'text-[#b3141c]' : 'text-[#b8862b]'}`}>
                    {initialText}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Arch Frame (Overlays on top with transparent cutout window) */}
          {ART.archFrame ? (
            <img 
              src={ART.archFrame} 
              alt="" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-10"
            />
          ) : (
            <ArchFramePlaceholder className="z-10" />
          )}
        </div>

        {/* 2. THE RIBBON PLATE (Overlaps bottom of arch by ~18-20%, live text) */}
        <div
          ref={plateRef}
          className="relative z-20 -mt-[18%] sm:-mt-[20%] w-[94%] mx-auto will-change-transform"
        >
          {ART.ribbonPlate ? (
            <div className="relative w-full py-2.5 sm:py-3.5 px-6 flex flex-col items-center justify-center text-center min-h-[58px] sm:min-h-[68px]">
              <img 
                src={ART.ribbonPlate} 
                alt="" 
                className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none" 
              />
              <span className="relative z-10 block font-poppins font-bold text-[9px] sm:text-[10px] tracking-widest uppercase text-[#b3141c]">
                {roleTag}
              </span>
              <h3 className="relative z-10 font-shrikhand text-lg sm:text-xl md:text-2xl text-[#2b1418] leading-tight mt-0.5">
                {fullName}
              </h3>
            </div>
          ) : (
            <div className="relative bg-[#f7e8c4] border-[3px] border-[#1b1210] py-2 px-3 sm:px-4 text-center">
              {/* Gold Inner Accent Line */}
              <div className="absolute inset-[2.5px] border border-[#b8862b] pointer-events-none" />
              <span className="block font-poppins font-bold text-[9px] sm:text-[10px] tracking-widest uppercase text-[#b3141c]">
                {roleTag}
              </span>
              <h3 className="font-shrikhand text-lg sm:text-xl md:text-2xl text-[#2b1418] leading-tight mt-0.5">
                {fullName}
              </h3>
            </div>
          )}
        </div>

        {/* 3. THE QUOTE (Italic, display/voice font, flat gold line beneath) */}
        <div className="w-full text-center mt-2.5 px-3">
          <p className="font-shrikhand italic text-xs sm:text-sm text-[#fff8e7] leading-snug">
            {quote}
          </p>
          <div className="w-16 h-[2px] bg-[#b8862b] mx-auto mt-1.5" />
        </div>

        {/* 4. THE STAT LIST (Cream scroll panel, 3px ink border, thin gold line inside) */}
        <div className="relative w-full bg-[#fff8e7] border-[3px] border-[#1b1210] p-3 sm:p-4 mt-2.5 text-left">
          {/* Inner Thin Gold Accent Border */}
          <div className="absolute inset-[3px] border border-[#b8862b] pointer-events-none" />

          {/* Row 1: Superpower */}
          <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#2b1418]">
            <StatIcon type="lotus" />
            <div>
              <strong className="font-bold text-[#1b1210]">Superpower:</strong>{' '}
              <span className="font-poppins">{superpower}</span>
            </div>
          </div>

          <div className="h-[1px] bg-[#b8862b]/35 my-2" />

          {/* Row 2: Weakness */}
          <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#2b1418]">
            <StatIcon type="fish" />
            <div>
              <strong className="font-bold text-[#1b1210]">Weakness:</strong>{' '}
              <span className="font-poppins">{weakness}</span>
            </div>
          </div>

          <div className="h-[1px] bg-[#b8862b]/35 my-2" />

          {/* Row 3: Verdict */}
          <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#2b1418]">
            <StatIcon type="sun" />
            <div>
              <strong className="font-bold text-[#1b1210]">Verdict:</strong>{' '}
              <span className="font-poppins">{verdict}</span>
            </div>
          </div>
        </div>

        {/* 5. THE BUTTON (Solid red for Bride, solid gold for Groom, 3px ink border) */}
        <button
          type="button"
          onClick={(e) => triggerPetalBurst(e, isBride ? 'megan' : 'brad')}
          className={`w-full mt-3 py-2.5 px-4 flex items-center justify-center gap-2 border-[3px] border-[#1b1210] font-poppins font-bold text-xs sm:text-sm tracking-wide cursor-pointer transition-transform active:translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#b8862b] focus-visible:outline-offset-2 ${
            isBride ? 'bg-[#b3141c] text-[#fff8e7]' : 'bg-[#b8862b] text-[#1b1210]'
          }`}
        >
          <StatIcon type={isBride ? 'lotus' : 'conch'} />
          <span>{buttonLabel} ({likes})</span>
          <span className="sr-only" aria-live="polite">
            Current count: {likes}
          </span>
        </button>
      </div>
    );
  };

  // -------------------------------------------------------------------------
  // CORE SECTION CONTENT (Integrated into standalone or embedded container)
  // -------------------------------------------------------------------------
  const sectionContent = (
    <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center z-10 px-3 sm:px-6">
      {/* SECTION HEADING & SUBTITLE */}
      <div 
        ref={effectiveTitleRef}
        className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 md:mb-8 will-change-transform"
      >
        <h2 className="font-shrikhand text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#b8862b] tracking-wider uppercase leading-tight">
          {meetCouple.heading || 'MEET THE TWO PEOPLE WHO SAID YES'}
        </h2>
        {meetCouple.subheading && (
          <p className="font-shrikhand italic text-xs sm:text-sm md:text-base text-[#f7e8c4] mt-1 tracking-wide">
            {meetCouple.subheading}
          </p>
        )}
      </div>

      {/* 3-COLUMN DESKTOP / 1-COLUMN MOBILE LAYOUT WITH GATHBANDHAN CORD */}
      <div className="relative w-full flex flex-col min-[900px]:flex-row items-center justify-center gap-6 sm:gap-8 min-[900px]:gap-4 lg:gap-8">
        
        {/* DESKTOP GATHBANDHAN GOLD CORD (SVG Path across 3 columns) */}
        <svg 
          className="hidden min-[900px]:block absolute inset-0 w-full h-full pointer-events-none z-15 select-none"
          viewBox="0 0 1000 500" 
          preserveAspectRatio="none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={desktopCordRef}
            d="M 330,230 C 400,280 430,240 500,240 C 570,240 600,280 670,230"
            stroke="#b8862b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>

        {/* LEFT COLUMN: THE BRIDE */}
        {renderCard('megan')}

        {/* MOBILE TOP CORD (Between Bride and Medallion) */}
        <svg 
          className="block min-[900px]:hidden w-8 h-10 -my-3 pointer-events-none z-15"
          viewBox="0 0 40 50" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={mobileCordTopRef}
            d="M 20,0 C 10,25 30,25 20,50"
            stroke="#b8862b"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* CENTRE COLUMN: THE SACRED SUN MEDALLION & KNOT */}
        <div ref={medallionRef} className="relative z-20 flex-shrink-0 my-2 min-[900px]:my-0">
          {ART.centreMedallion ? (
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 select-none flex items-center justify-center">
              <img 
                src={ART.centreMedallion} 
                alt="Sacred Wedding Sun Medallion" 
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <CentreMedallionPlaceholder rotating={false} />
          )}
        </div>

        {/* MOBILE BOTTOM CORD (Between Medallion and Groom) */}
        <svg 
          className="block min-[900px]:hidden w-8 h-10 -my-3 pointer-events-none z-15"
          viewBox="0 0 40 50" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={mobileCordBottomRef}
            d="M 20,0 C 30,25 10,25 20,50"
            stroke="#b8862b"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* RIGHT COLUMN: THE GROOM */}
        {renderCard('brad')}
      </div>
    </div>
  );

  // -------------------------------------------------------------------------
  // RENDER MODES: EMBEDDED (Section 3 in Master Hero) VS STANDALONE
  // -------------------------------------------------------------------------
  return (
    <>
      {/* SVG Global Definitions for Pointed Arch Clip Path */}
      <ArchWindowDefs />

      {/* Floating Petal Burst Container (Fixed Coordinates, DOM Capped) */}
      <div ref={petalContainerRef} className="fixed inset-0 pointer-events-none z-50 overflow-hidden" />

      {embedded ? (
        <div 
          className="relative w-full h-full flex flex-col justify-center items-center py-6 sm:py-10 px-3 sm:px-6 pointer-events-auto select-auto overflow-y-auto"
          style={{
            '--red': '#b3141c',
            '--gold': '#b8862b',
            '--ink': '#1b1210',
            '--cream': '#f7e8c4',
            '--cream-card': '#fff8e7',
            '--text': '#2b1418',
          }}
        >
          {/* Hanging Marigold Toran */}
          <div ref={toranRef} className="w-full">
            <MarigoldToran />
          </div>

          {/* Optional Tiled Background Pattern */}
          {ART.bgTile && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 z-0"
              style={{
                backgroundImage: `url('${ART.bgTile}')`,
                backgroundSize: '220px 220px',
                backgroundRepeat: 'repeat',
              }}
            />
          )}

          {sectionContent}
        </div>
      ) : (
        <section
          id="couple"
          ref={sectionRef}
          className="relative w-full min-h-screen flex flex-col justify-center items-center py-10 sm:py-14 px-3 sm:px-6 bg-[#061c14] text-center overflow-hidden"
          style={{
            '--red': '#b3141c',
            '--gold': '#b8862b',
            '--ink': '#1b1210',
            '--cream': '#f7e8c4',
            '--cream-card': '#fff8e7',
            '--text': '#2b1418',
          }}
        >
          {/* Hanging Marigold Toran */}
          <div ref={toranRef} className="w-full">
            <MarigoldToran />
          </div>

          {/* Optional Tiled Background Pattern */}
          {ART.bgTile && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 z-0"
              style={{
                backgroundImage: `url('${ART.bgTile}')`,
                backgroundSize: '220px 220px',
                backgroundRepeat: 'repeat',
              }}
            />
          )}

          {sectionContent}
        </section>
      )}
    </>
  );
}
