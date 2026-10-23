import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton } from './ui';

/**
 * Available Curtain Strip Variants
 * (All assets safely preserved in public/assets/)
 */
export const STRIP_TYPES = {
  geometric: {
    id: 'geometric',
    name: 'Geometric Mandap Border',
    src: '/assets/curtain_strips/strip_1_geometric.webp',
  },
  lotus: {
    id: 'lotus',
    name: 'Lotus Vine Garland',
    src: '/assets/curtain_strips/strip_2_lotus.webp',
  },
  motifs: {
    id: 'motifs',
    name: 'Madhubani Motifs (Fish, Peacock, Sun)',
    src: '/assets/curtain_strips/strip_3_motifs.webp',
  },
};

/**
 * Repeating sequence of motifs to create a rich royal curtain
 */
export const BASE_STRIP_PATTERN = ['geometric', 'lotus', 'motifs'];

/**
 * Generates an array of strips for a given panel count.
 * Left panel starts with geometric on the outer edge.
 * Right panel is mirrored so both outer edges and the center meeting seam are symmetrical.
 */
export function generateCurtainStrips(count, side = 'left') {
  const pattern = BASE_STRIP_PATTERN;
  const strips = [];
  for (let i = 0; i < count; i++) {
    strips.push(pattern[i % pattern.length]);
  }
  return side === 'right' ? [...strips].reverse() : strips;
}

/**
 * Calculates optimal number of strips per side based on screen width
 * to maintain slender, authentic fabric pleats without horizontal stretching.
 */
function useResponsiveStripCount() {
  const [stripCount, setStripCount] = useState(() => {
    if (typeof window === 'undefined') return 8;
    const w = window.innerWidth;
    if (w >= 1800) return 11; // 22 total on ultra-widescreen
    if (w >= 1440) return 9;  // 18 total on large laptop/desktop
    if (w >= 1024) return 8;  // 16 total on standard laptop
    if (w >= 768) return 6;   // 12 total on tablet
    if (w >= 640) return 5;   // 10 total on large phone
    return 4;                 // 8 total on standard mobile
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      let count = 4;
      if (w >= 1800) count = 11;
      else if (w >= 1440) count = 9;
      else if (w >= 1024) count = 8;
      else if (w >= 768) count = 6;
      else if (w >= 640) count = 5;
      setStripCount(count);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return stripCount;
}

/**
 * Individual Curtain Strip with realistic fabric sway movement and 3D pleat depth
 */
function CurtainStrip({ stripKey, index, totalStrips, side, isCurtainOpen }) {
  const strip = STRIP_TYPES[stripKey] || STRIP_TYPES.geometric;
  const isLeft = side === 'left';

  // Stagger wave delay across strips for organic ripple effect
  const animationDelay = `${(index * 0.35).toFixed(2)}s`;

  return (
    <div
      className={`relative h-full flex-1 min-w-0 overflow-hidden curtain-strip ${
        isLeft ? 'curtain-sway-left' : 'curtain-sway-right'
      }`}
      style={{
        animationDelay,
        animationPlayState: isCurtainOpen ? 'paused' : 'running',
        transformOrigin: 'top center',
      }}
    >
      {/* Strip Image (tassels anchored to bottom) */}
      <img
        src={strip.src}
        alt={strip.name}
        className="w-full h-full object-cover object-bottom block select-none pointer-events-none"
      />

      {/* Realistic 3D Cylindrical Pleat Shadow Overlay (zero white) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 72%, rgba(0,0,0,0.48) 100%)',
        }}
      />

      {/* Deep fold edge shadow between strips */}
      <div className="absolute top-0 bottom-0 right-0 w-[1.5px] bg-black/50 pointer-events-none" />
    </div>
  );
}

export default function OpeningCurtain({
  onOpenChange,
  leftStrips: customLeftStrips,
  rightStrips: customRightStrips,
}) {
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [isFullyDismissed, setIsFullyDismissed] = useState(false);

  // Automatically adjust number of strips to keep pleat widths slender on widescreen
  const responsiveCount = useResponsiveStripCount();

  const leftStrips = customLeftStrips || generateCurtainStrips(responsiveCount, 'left');
  const rightStrips = customRightStrips || generateCurtainStrips(responsiveCount, 'right');

  const handleOpenCurtains = () => {
    if (curtainsOpen || bannerOpen) return;

    // Audio disabled for development per user request (will be re-enabled later)
    // shaadiAudio.playDramaticHit();
    // shaadiAudio.playCelebrationFanfare();
    // shaadiAudio.startBGM();

    // Trigger marigold & festive confetti shower
    confetti({
      particleCount: 160,
      spread: 110,
      colors: ['#FF9933', '#FFD700', '#851E18', '#FFF8DC', '#2E7D32'],
      origin: { y: 0.55 },
    });

    // Step 1: Left and right curtains sweep away first
    setCurtainsOpen(true);

    // Step 2: Once curtains have parted, head banner moves up
    setTimeout(() => {
      setBannerOpen(true);
    }, 1300);

    // Step 3: Full dismissal after banner finishes rising
    setTimeout(() => {
      setIsFullyDismissed(true);
      if (onOpenChange) onOpenChange(true);
    }, 2300);
  };

  const handleToggleBack = (e) => {
    e.stopPropagation();
    shaadiAudio.playPop();
    setIsFullyDismissed(false);

    // Reverse order: banner lowers down first, then curtains draw closed
    setBannerOpen(false);
    setTimeout(() => {
      setCurtainsOpen(false);
      if (onOpenChange) onOpenChange(false);
    }, 700);
  };

  return (
    <>
      {/* Fullscreen Curtain Overlay */}
      <div
        className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-1000 ${
          isFullyDismissed ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        {/* TOP ORNATE MADHUBANI BANNER (Pelmet / Toran) */}
        <div
          className={`absolute top-0 left-0 right-0 z-30 transition-transform duration-900 ease-in-out select-none pointer-events-none ${
            bannerOpen ? '-translate-y-full' : 'translate-y-0'
          }`}
          style={{
            filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.85))',
          }}
        >
          <img
            src="/assets/madhubani/top_banner.webp"
            alt="Madhubani Wedding Toran Banner"
            className="w-full h-auto block select-none pointer-events-none"
          />
        </div>

        {/* LEFT COMPOSITE CURTAIN (Made of repeated, animated strips) */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-1/2 z-20 flex bg-[#851e18] transition-transform duration-[1500ms] cubic-bezier(0.77, 0, 0.175, 1) ${
            curtainsOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
          style={{
            filter: 'drop-shadow(10px 0 25px rgba(0, 0, 0, 0.8))',
          }}
        >
          {leftStrips.map((stripKey, idx) => (
            <CurtainStrip
              key={`left-strip-${idx}`}
              stripKey={stripKey}
              index={idx}
              totalStrips={leftStrips.length}
              side="left"
              isCurtainOpen={curtainsOpen}
            />
          ))}
        </div>

        {/* RIGHT COMPOSITE CURTAIN (Made of repeated, animated strips) */}
        <div
          className={`absolute top-0 bottom-0 right-0 w-1/2 z-20 flex bg-[#851e18] transition-transform duration-[1500ms] cubic-bezier(0.77, 0, 0.175, 1) ${
            curtainsOpen ? 'translate-x-full' : 'translate-x-0'
          }`}
          style={{
            filter: 'drop-shadow(-10px 0 25px rgba(0, 0, 0, 0.8))',
          }}
        >
          {rightStrips.map((stripKey, idx) => (
            <CurtainStrip
              key={`right-strip-${idx}`}
              stripKey={stripKey}
              index={idx}
              totalStrips={rightStrips.length}
              side="right"
              isCurtainOpen={curtainsOpen}
            />
          ))}
        </div>

        {/* BOTTOM CENTER INTERACTIVE BUTTON (Click to Open) */}
        {!curtainsOpen && (
          <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
            <ShaadiButton
              onClick={handleOpenCurtains}
              playSound={false}
              iconLeft="🪔"
              iconRight="🪔"
              className="whitespace-nowrap"
            >
              OPEN CURTAINS
            </ShaadiButton>
          </div>
        )}
      </div>

      {/* Floating Button to Re-close Curtains anytime (Commented out per user request) */}
      {/* {bannerOpen && (
        <ShaadiButton
          variant="floating"
          onClick={handleToggleBack}
          iconLeft="🎪"
          className="fixed bottom-12 right-4 z-40 px-3 py-2"
          title="Re-draw Curtains"
        >
          CLOSE CURTAINS
        </ShaadiButton>
      )} */}
    </>
  );
}
