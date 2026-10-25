/**
 * ============================================================================
 * SECTION 4: WEDDING EVENTS & ITINERARY (SCROLL-DRIVEN SVG VINE TIMELINE)
 * ============================================================================
 *
 * LAYOUT & MATHEMATICS README:
 * ----------------------------
 * 1. Responsive Vine Coordinates:
 *    - Desktop (width >= 768px): The vine runs down the horizontal center (cx = sectionWidth / 2).
 *      Cards alternate left (odd index) and right (even index), each taking ~42% width (max 460px).
 *      Branches connect from the central vine at (cx, cardCenterY) to each card's inner edge.
 *    - Mobile (width < 768px): The vine runs down the left (cx = 38px, safely inset from the 22px border).
 *      All cards sit on the right (~80% width), with short horizontal branches connecting to them.
 *
 * 2. Computed Cubic Bézier S-Curve:
 *    - The main stem path is calculated dynamically from measured DOM card centers (y_i).
 *    - Between consecutive nodes (y_{i-1} -> y_i), a cubic Bézier curve is computed with alternating
 *      horizontal amplitude (amp = 55px desktop, 12px mobile) and control points at 1/3 and 2/3 heights.
 *    - Stem rendering uses 3 stacked strokes (Madhubani double-line + cream hatch):
 *        .stem-ink   (#1b1210, width 14)
 *        .stem-gold  (#b8862b, width 7)
 *        .stem-hatch (#f7e8c4, width 2, dashed "2 10")
 *    - Revealed via an SVG <mask> driven by GSAP ScrollTrigger scrub, ensuring no strokes or hatch
 *      patterns are ever visible ahead of the growing tip.
 *
 * 3. GSAP ScrollTrigger Orchestration:
 *    - The main vine draws progressively with ScrollTrigger scrub tied to the 60% viewport line.
 *    - Per event, a dedicated timeline triggers when card reaches viewport 60%:
 *        (a) Junction bud scales 0 -> 1 (back.out)
 *        (b) Branch draws from vine to card edge (strokeDashoffset -> 0)
 *        (c) Card slides & fades in (autoAlpha 0 -> 1, y 40 -> 0, x offset -> 0)
 *    - Leaf & tendril decorative nodes pop in along the vine as the tip reaches them.
 *    - Reverses smoothly when scrolling back up.
 *    - Respects `prefers-reduced-motion: reduce` by presenting the finished layout with zero animations.
 *
 * PHASE 2 ART SWAPPING INSTRUCTIONS:
 * ---------------------------------
 * All illustrations and decorative assets are swappable through the single `ART` config object below.
 * - When a key is `null`, clean procedural SVG vectors are drawn in code.
 * - When a key is a URL string (e.g. '/assets/madhubani/bud.png' or '/assets/madhubani/leaf.svg'),
 *   the component renders an SVG `<image>` tag in its place.
 * - Do NOT hard-code asset paths anywhere else.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { shaadiAudio } from '../utils/audio';
import { WEDDING_CONFIG } from '../config/weddingConfig';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// PHASE 2 ASSET CONFIGURATION (Drop-in replacements)
// ============================================================================
export const ART = {
  bud: null,           // e.g. '/assets/vine/bud.png' or null for procedural SVG
  leaf: null,          // e.g. '/assets/vine/leaf.png' or null for procedural SVG
  tendril: null,       // e.g. '/assets/vine/tendril.png' or null for procedural SVG
  dayMedallion: null,  // e.g. '/assets/vine/day_seal.png' or null for procedural SVG
  perch: null,         // e.g. '/assets/vine/bracket.png' or null for procedural SVG
  stemHatch: true,     // Toggle the top cream dashed hatch stroke
  lenis: false,        // Optional smooth-scrolling toggle
};

// ============================================================================
// WEDDING EVENTS DATA (Loaded from Single Source of Truth: WEDDING_CONFIG)
// ============================================================================
export const TIMELINE_EVENTS = WEDDING_CONFIG.eventsSection?.events || [];

// ============================================================================
// PROCEDURAL SVG DECORATIVE ARTWORK (Placeholders when ART config is null)
// ============================================================================

/**
 * Ornate Madhubani Leaf
 */
function ProceduralLeaf({ x, y, angle, scale = 1, flip = false }) {
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${angle}) scale(${scale}) ${flip ? 'scale(1, -1)' : ''}`}
      className="vine-leaf origin-left"
    >
      <path
        d="M 0 0 C 14 -16, 32 -16, 42 0 C 32 16, 14 16, 0 0 Z"
        fill="#b8862b"
        stroke="#1b1210"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M 2 0 L 38 0"
        stroke="#b3141c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M 12 0 L 18 -7 M 22 0 L 28 -7 M 12 0 L 18 7 M 22 0 L 28 7"
        stroke="#1b1210"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </g>
  );
}

/**
 * Curling Spiral Tendril
 */
function ProceduralTendril({ x, y, angle, scale = 1, flip = false }) {
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${angle}) scale(${scale}) ${flip ? 'scale(1, -1)' : ''}`}
      className="vine-tendril origin-left"
    >
      <path
        d="M 0 0 C 16 -10, 28 -3, 30 11 C 31 22, 19 28, 13 22 C 8 16, 15 9, 21 12"
        fill="none"
        stroke="#1b1210"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M 0 0 C 16 -10, 28 -3, 30 11 C 31 22, 19 28, 13 22 C 8 16, 15 9, 21 12"
        fill="none"
        stroke="#b8862b"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="21" cy="12" r="3" fill="#b3141c" stroke="#1b1210" strokeWidth="1.2" />
    </g>
  );
}

/**
 * Floral Bud at Junction Node
 */
function ProceduralBud({ cx, cy, radius = 14 }) {
  return (
    <g transform={`translate(${cx}, ${cy})`} className="vine-bud">
      <circle cx="0" cy="0" r={radius + 3.5} fill="#1b1210" />
      <circle cx="0" cy="0" r={radius + 1.8} fill="#f7e8c4" />
      <circle cx="0" cy="0" r={radius} fill="#b3141c" stroke="#1b1210" strokeWidth="2.2" />
      {/* 4 lotus petals */}
      <path d="M 0 -11 C -4 -4, -4 4, 0 11 C 4 4, 4 -4, 0 -11 Z" fill="#b8862b" stroke="#1b1210" strokeWidth="1.2" />
      <path d="M -11 0 C -4 -4, 4 -4, 11 0 C 4 4, -4 4, -11 0 Z" fill="#b8862b" stroke="#1b1210" strokeWidth="1.2" />
      {/* Center jewel */}
      <circle cx="0" cy="0" r="3.5" fill="#f7e8c4" stroke="#1b1210" strokeWidth="1.2" />
    </g>
  );
}

/**
 * Hanging Fruit Bracket / Perch
 */
function ProceduralPerch({ x, y, toLeft = true }) {
  const dir = toLeft ? -1 : 1;
  return (
    <g transform={`translate(${x}, ${y})`} className="vine-perch">
      <path
        d={`M 0 -14 C ${dir * 9} -16, ${dir * 16} -9, ${dir * 16} 0 C ${dir * 16} 9, ${dir * 9} 16, 0 14`}
        fill="#b8862b"
        stroke="#1b1210"
        strokeWidth="3"
      />
      <circle cx={dir * 8} cy="0" r="4.5" fill="#b3141c" stroke="#1b1210" strokeWidth="1.5" />
    </g>
  );
}

/**
 * Royal Day Marker Medallion (Appears at Day 1, Day 2, Day 3)
 */
function DayMarkerMedallion({ cx, cy, dayNumber, dayDate, isMobile = false }) {
  if (ART.dayMedallion) {
    const size = isMobile ? 64 : 96;
    return (
      <g transform={`translate(${cx - size / 2}, ${cy - size / 2})`} className="day-marker">
        <image href={ART.dayMedallion} width={size} height={size} />
      </g>
    );
  }

  const rOuter = isMobile ? 28 : 42;
  const rGold = isMobile ? 25.5 : 38.5;
  const rCream = isMobile ? 22 : 33.5;
  const rRed = isMobile ? 18.5 : 28.5;

  return (
    <g transform={`translate(${cx}, ${cy})`} className="day-marker">
      {/* Drop shadow / halo */}
      <circle cx="0" cy="0" r={rOuter} fill="#1b1210" />
      <circle cx="0" cy="0" r={rGold} fill="#b8862b" stroke="#1b1210" strokeWidth={isMobile ? 1.5 : 2} />
      <circle cx="0" cy="0" r={rCream} fill="#f7e8c4" stroke="#1b1210" strokeWidth={isMobile ? 1.5 : 2} />
      <circle cx="0" cy="0" r={rRed} fill="#b3141c" stroke="#1b1210" strokeWidth={isMobile ? 1.2 : 1.6} />

      {/* Center Day Label */}
      <text
        x="0"
        y={isMobile ? -2.5 : -3}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#f7e8c4"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize={isMobile ? "9.5" : "13"}
        letterSpacing={isMobile ? "0.8" : "1.5"}
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.85)' }}
      >
        DAY {dayNumber}
      </text>

      {/* Date Subtitle Banner Pill */}
      <rect
        x={isMobile ? -28 : -42}
        y={isMobile ? 8 : 12}
        width={isMobile ? 56 : 84}
        height={isMobile ? 13 : 17}
        rx={isMobile ? 6.5 : 8.5}
        fill="#f7e8c4"
        stroke="#1b1210"
        strokeWidth={isMobile ? 1.2 : 1.5}
      />
      <text
        x="0"
        y={isMobile ? 15 : 21}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#1b1210"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize={isMobile ? "6.2" : "8"}
        letterSpacing="0.4"
      >
        {dayDate.replace(' 2026', '')}
      </text>
    </g>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function MainEvents() {
  const eventsConfig = WEDDING_CONFIG.eventsSection || {};
  const [activeEvent, setActiveEvent] = useState(null);

  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const maskPathRef = useRef(null);
  const cardRefs = useRef([]);
  const headerRef = useRef(null);

  // Dynamic SVG Geometry State
  const [vineData, setVineData] = useState({
    mainPathD: '',
    branches: [],
    buds: [],
    perches: [],
    leaves: [],
    dayMedallions: [],
    width: 1200,
    height: 2400,
    isMobile: false,
  });

  // Track prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
      const listener = (e) => setReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Optional Lenis Integration
  useEffect(() => {
    if (!ART.lenis || typeof window === 'undefined') return;

    let lenisInstance = null;
    import('lenis')
      .then(({ default: Lenis }) => {
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        lenisInstance.on('scroll', ScrollTrigger.update);
        const ticker = (time) => {
          lenisInstance.raf(time * 1000);
        };
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
      })
      .catch((err) => {
        console.warn('Lenis could not be initialized:', err);
      });

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
      }
    };
  }, []);

  // ==========================================================================
  // VINE GEOMETRY COMPUTATION
  // ==========================================================================
  const computeVineGeometry = () => {
    if (!sectionRef.current) return;

    const secRect = sectionRef.current.getBoundingClientRect();
    const width = secRect.width;
    const height = secRect.height;
    const isMobile = width < 768;

    // Vine horizontal coordinate: centered on desktop, comfortably offset from border on mobile
    const cx = isMobile ? 38 : width / 2;
    const amp = isMobile ? 12 : 55;

    // Measure cards relative to section
    const measuredCards = cardRefs.current.map((cardEl, idx) => {
      if (!cardEl) return null;
      const r = cardEl.getBoundingClientRect();
      const top = r.top - secRect.top;
      const centerY = top + r.height / 2;
      const left = r.left - secRect.left;
      const right = r.right - secRect.left;
      const isLeft = !isMobile && idx % 2 === 0;

      return {
        idx,
        id: TIMELINE_EVENTS[idx]?.id,
        day: TIMELINE_EVENTS[idx]?.day,
        dayDate: TIMELINE_EVENTS[idx]?.date,
        top,
        centerY,
        left,
        right,
        height: r.height,
        isLeft,
      };
    }).filter(Boolean);

    if (measuredCards.length === 0) return;

    // Identify Day Transitions (Day 1, Day 2, Day 3)
    const dayMarkers = [];
    let currentDay = 0;
    measuredCards.forEach((c) => {
      if (c.day !== currentDay) {
        currentDay = c.day;
        // Day 1 sits comfortably lower between card shoulders so it never overlaps the header subtitle
        const markerY = c.day === 1
          ? (c.top + (isMobile ? 8 : 14))
          : Math.max(c.top - (isMobile ? 42 : 58), 90);
        dayMarkers.push({
          day: c.day,
          dayDate: c.dayDate,
          y: markerY,
          cx,
        });
      }
    });

    // Build the collection of Y nodes the main vine visits in order
    const startY = Math.max(dayMarkers[0]?.y - (isMobile ? 50 : 65), 50);
    const nodes = [
      { y: startY, cx },
      ...dayMarkers.map(d => ({ y: d.y, cx })),
      ...measuredCards.map(c => ({ y: c.centerY, cx })),
    ].sort((a, b) => a.y - b.y);

    // Filter duplicates or nodes too close together
    const filteredNodes = [nodes[0]];
    for (let i = 1; i < nodes.length; i++) {
      if (nodes[i].y - filteredNodes[filteredNodes.length - 1].y >= 15) {
        filteredNodes.push(nodes[i]);
      }
    }

    // Build S-curve cubic Bézier path
    let pathD = `M ${filteredNodes[0].cx} ${filteredNodes[0].y}`;
    let dir = 1;

    for (let i = 1; i < filteredNodes.length; i++) {
      const prev = filteredNodes[i - 1].y;
      const curr = filteredNodes[i].y;
      const dy = curr - prev;

      const cp1x = cx + amp * dir;
      const cp1y = prev + dy / 3;
      const cp2x = cx - amp * dir;
      const cp2y = prev + (2 * dy) / 3;

      pathD += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${cx} ${curr.toFixed(1)}`;
      dir = -dir;
    }

    // Extend vine downward past the last card
    const lastY = filteredNodes[filteredNodes.length - 1].y;
    const endY = Math.min(lastY + 130, height - 35);
    pathD += ` L ${cx} ${endY.toFixed(1)}`;

    // Build branches connecting vine to cards
    const branches = [];
    const buds = [];
    const perches = [];

    measuredCards.forEach((c) => {
      const startX = cx;
      const startY = c.centerY;

      // Target connection point on card edge
      let targetX, cpX;
      if (isMobile) {
        targetX = c.left;
        cpX = startX + (targetX - startX) * 0.45;
      } else if (c.isLeft) {
        targetX = c.right;
        cpX = startX - 25;
      } else {
        targetX = c.left;
        cpX = startX + 25;
      }

      const branchD = `M ${startX} ${startY} C ${cpX} ${startY}, ${cpX} ${startY}, ${targetX} ${startY}`;

      branches.push({
        id: c.id,
        d: branchD,
        startX,
        startY,
        targetX,
        targetY: startY,
        isLeft: c.isLeft,
      });

      buds.push({
        id: c.id,
        cx: startX,
        cy: startY,
      });

      perches.push({
        id: c.id,
        x: targetX,
        y: startY,
        toLeft: c.isLeft,
      });
    });

    // Populate decorative leaves and curling tendrils along the vine
    const leaves = [];
    try {
      const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tempPath.setAttribute('d', pathD);
      const totalLen = tempPath.getTotalLength();

      if (totalLen > 0) {
        const step = isMobile ? 120 : 140;
        let leafIndex = 0;

        for (let l = 75; l < totalLen - 60; l += step) {
          const pt = tempPath.getPointAtLength(l);
          const ptNext = tempPath.getPointAtLength(Math.min(l + 3, totalLen));
          const angle = (Math.atan2(ptNext.y - pt.y, ptNext.x - pt.x) * 180) / Math.PI;

          const flip = leafIndex % 2 === 0;
          const leafAngle = angle + (flip ? -70 : 70);

          leaves.push({
            id: `leaf-${leafIndex}`,
            x: pt.x,
            y: pt.y,
            angle: leafAngle,
            flip,
            hasTendril: leafIndex % 3 === 2,
            lengthProgress: l / totalLen,
          });

          leafIndex++;
        }
      }
    } catch {
      // Fallback in headless test environments
    }

    setVineData({
      mainPathD: pathD,
      branches,
      buds,
      perches,
      leaves,
      dayMedallions: dayMarkers,
      width,
      height,
      isMobile,
    });
  };

  // Measure and rebuild layout on mount, resize, and asset loads
  useEffect(() => {
    let resizeTimer = null;

    const handleRecompute = () => {
      computeVineGeometry();
    };

    handleRecompute();

    if (document.fonts?.ready) {
      document.fonts.ready.then(handleRecompute);
    }
    const timeout = setTimeout(handleRecompute, 350);

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        handleRecompute();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(resizeTimer);
      clearTimeout(timeout);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // ==========================================================================
  // GSAP SCROLL-DRIVEN ANIMATION TIMELINES
  // ==========================================================================
  useEffect(() => {
    if (!vineData.mainPathD || !sectionRef.current || !svgRef.current) return;

    // Reduced motion: skip animation and present finished state immediately
    if (reducedMotion) {
      if (maskPathRef.current) {
        maskPathRef.current.style.strokeDashoffset = '0';
      }
      cardRefs.current.forEach(c => {
        if (c) {
          c.style.opacity = '1';
          c.style.transform = 'none';
        }
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 0. Section 4 Entrance Transition from Section 3:
      // Header and grapevine glide up from bottom inside the pinned gold arch frame
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.6,
        },
      });

      // Section 4 Heading Rises Up from the Bottom (choreographed as Gold Arch border slides in)
      if (headerRef.current) {
        entryTl.fromTo(
          headerRef.current,
          { y: 120, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.28
        );
      }

      // Grapevine Rises Up from the Bottom into Position
      if (svgRef.current) {
        entryTl.fromTo(
          svgRef.current,
          { y: 150, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.32
        );
      }

      // 1. Vine Growth via SVG Mask (Starts smoothly as section enters and grows progressively)
      if (maskPathRef.current) {
        const pathLength = maskPathRef.current.getTotalLength() || 2500;

        gsap.set(maskPathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(maskPathRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 90%',
            scrub: 0.6,
          },
        });
      }

      // 2. Day Medallions Reveal
      const dayNodes = svgRef.current.querySelectorAll('.day-marker');
      dayNodes.forEach(node => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0, transformOrigin: 'center center' },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 3. Leaves & Tendrils Pop-in
      const leafNodes = svgRef.current.querySelectorAll('.vine-leaf');
      leafNodes.forEach(node => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0, transformOrigin: 'left center' },
          {
            scale: 1,
            opacity: 1,
            duration: 0.35,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      const tendrilNodes = svgRef.current.querySelectorAll('.vine-tendril');
      tendrilNodes.forEach(node => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0, transformOrigin: 'left center' },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: node,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 4. Per-Event Branch, Bud, and Card Reveal Timelines
      TIMELINE_EVENTS.forEach((evt, idx) => {
        const cardEl = cardRefs.current[idx];
        const branchGroup = svgRef.current.querySelector(`.branch-group-${evt.id}`);
        const branchPaths = svgRef.current.querySelectorAll(`.branch-${evt.id}`);
        const budEl = svgRef.current.querySelector(`.bud-${evt.id}`);
        const perchEl = svgRef.current.querySelector(`.perch-${evt.id}`);

        if (!cardEl) return;

        const isLeft = !vineData.isMobile && idx % 2 === 0;
        const branchLength = branchPaths[0]?.getTotalLength() || 160;

        branchPaths.forEach(bp => {
          gsap.set(bp, {
            strokeDasharray: branchLength,
            strokeDashoffset: branchLength,
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardEl,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        // (a) Junction bud pops in
        if (budEl) {
          tl.fromTo(
            budEl,
            { scale: 0, opacity: 0, transformOrigin: 'center center' },
            { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2.2)' }
          );
        }

        // (b) Branch draws from vine to card edge
        if (branchPaths.length > 0) {
          tl.to(
            branchPaths,
            { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' },
            '-=0.2'
          );
        }

        // Perch reveals at attachment point
        if (perchEl) {
          tl.fromTo(
            perchEl,
            { scale: 0, opacity: 0, transformOrigin: 'center center' },
            { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(2)' },
            '-=0.25'
          );
        }

        // (c) Card fades in and slides into place
        tl.fromTo(
          cardEl,
          {
            autoAlpha: 0,
            y: 40,
            x: isLeft ? 30 : -30,
          },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            duration: 0.55,
            ease: 'power2.out',
          },
          '-=0.28'
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [vineData, reducedMotion]);

  // Click to Celebrate interactive audio & confetti
  const handleEventClick = (evt, e) => {
    setActiveEvent(evt.id);
    shaadiAudio.playDhol();
    shaadiAudio.playShehnaiNote(659, 0.35);

    const clientX = e?.clientX ? e.clientX / window.innerWidth : 0.5;
    const clientY = e?.clientY ? e.clientY / window.innerHeight : 0.6;

    confetti({
      particleCount: 50,
      spread: 65,
      origin: { x: clientX, y: clientY },
      colors: ['#FFD700', '#FFA500', '#B3141C', '#134E3A', '#FFF8DC'],
    });
  };

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative w-full min-h-screen pt-20 sm:pt-24 md:pt-28 pb-36 sm:pb-48 md:pb-60 px-3 sm:px-6 md:px-12 text-center overflow-x-hidden select-none bg-transparent"
      style={{
        '--red': '#b3141c',
        '--gold': '#b8862b',
        '--ink': '#1b1210',
        '--cream': '#f7e8c4',
      }}
    >
      {/* Target anchor for legacy links pointing to #events */}
      <div id="events" className="absolute -top-12 left-0 pointer-events-none" />

      {/* ============================================================== */}
      {/* Section Header (Centered & Preserved)                          */}
      {/* ============================================================== */}
      <header
        ref={headerRef}
        className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-20 mb-14 sm:mb-20 will-change-transform"
      >
        {eventsConfig.badge && (
          <div className="bg-[#360814]/90 text-amber-300 font-pixel text-[7px] sm:text-[9px] md:text-[10px] px-3.5 sm:px-4 py-1 rounded-full border border-amber-400/50 shadow-md mb-2 tracking-widest inline-flex items-center gap-1.5">
            <span>✨</span>
            <span>{eventsConfig.badge}</span>
            <span>✨</span>
          </div>
        )}
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-yatra gold-gradient-text tracking-wide drop-shadow-md leading-tight font-bold">
          {eventsConfig.heading || 'WEDDING EVENTS & ITINERARY'}
        </h2>
        {eventsConfig.subheading && (
          <p className="text-amber-200/95 font-script text-sm sm:text-lg md:text-2xl mt-1 tracking-wide">
            {eventsConfig.subheading}
          </p>
        )}
      </header>

      {/* ============================================================== */}
      {/* Central SVG Vine Canvas (Layered Stems, Branches & Medallions) */}
      {/* ============================================================== */}
      <svg
        ref={svgRef}
        className="vine absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        aria-hidden="true"
        viewBox={`0 0 ${vineData.width} ${vineData.height}`}
      >
        <defs>
          <filter id="vine-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.75" />
          </filter>

          {/* Clean Scrubbed Growth Mask (Reveals stem layers at exact tip without stroke glitch) */}
          {vineData.mainPathD && (
            <mask id="vine-growth-mask" maskUnits="userSpaceOnUse">
              <path
                ref={maskPathRef}
                d={vineData.mainPathD}
                fill="none"
                stroke="#ffffff"
                strokeWidth="32"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </mask>
          )}
        </defs>

        {/* 1. Stacked Main Vine Stem Paths (Masked for Flawless Growth) */}
        {vineData.mainPathD && (
          <g filter="url(#vine-glow)" mask="url(#vine-growth-mask)">
            {/* .stem-ink: Black base stroke */}
            <path
              className="stem-path stem-ink"
              d={vineData.mainPathD}
              fill="none"
              stroke="#1b1210"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* .stem-gold: Center gold band */}
            <path
              className="stem-path stem-gold"
              d={vineData.mainPathD}
              fill="none"
              stroke="#b8862b"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* .stem-hatch: Top cream dashed hatch stroke */}
            {ART.stemHatch && (
              <path
                className="stem-path stem-hatch"
                d={vineData.mainPathD}
                fill="none"
                stroke="#f7e8c4"
                strokeWidth="2"
                strokeDasharray="2 10"
                strokeLinecap="round"
              />
            )}
          </g>
        )}

        {/* 2. Side Branches Connecting Vine to Cards */}
        {vineData.branches.map((b) => (
          <g key={b.id} className={`branch-group branch-group-${b.id}`}>
            {/* Branch black ink stroke */}
            <path
              className={`branch-path branch-ink branch-${b.id}`}
              d={b.d}
              fill="none"
              stroke="#1b1210"
              strokeWidth="8.5"
              strokeLinecap="round"
            />
            {/* Branch gold core */}
            <path
              className={`branch-path branch-gold branch-${b.id}`}
              d={b.d}
              fill="none"
              stroke="#b8862b"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* 3. Decorative Leaves & Tendrils */}
        {vineData.leaves.map((l) => (
          <g key={l.id}>
            {ART.leaf ? (
              <image
                href={ART.leaf}
                x={l.x - 16}
                y={l.y - 16}
                width="32"
                height="32"
                className="vine-leaf origin-center"
                transform={`rotate(${l.angle}, ${l.x}, ${l.y})`}
              />
            ) : (
              <ProceduralLeaf x={l.x} y={l.y} angle={l.angle} scale={vineData.isMobile ? 0.75 : 1} flip={l.flip} />
            )}

            {l.hasTendril && (
              ART.tendril ? (
                <image
                  href={ART.tendril}
                  x={l.x - 14}
                  y={l.y - 14}
                  width="28"
                  height="28"
                  className="vine-tendril origin-center"
                  transform={`rotate(${l.angle + 30}, ${l.x}, ${l.y})`}
                />
              ) : (
                <ProceduralTendril x={l.x} y={l.y} angle={l.angle + 30} scale={vineData.isMobile ? 0.7 : 0.9} flip={l.flip} />
              )
            )}
          </g>
        ))}

        {/* 4. Day Markers (Day 1, Day 2, Day 3) */}
        {vineData.dayMedallions.map((d) => (
          <DayMarkerMedallion
            key={d.day}
            cx={d.cx}
            cy={d.y}
            dayNumber={d.day}
            dayDate={d.dayDate}
            isMobile={vineData.isMobile}
          />
        ))}

        {/* 5. Buds at Junction Nodes */}
        {vineData.buds.map((bud) => (
          <g key={bud.id} className={`bud-${bud.id}`}>
            {ART.bud ? (
              <image
                href={ART.bud}
                x={bud.cx - 16}
                y={bud.cy - 16}
                width="32"
                height="32"
                className="vine-bud"
              />
            ) : (
              <ProceduralBud cx={bud.cx} cy={bud.cy} radius={vineData.isMobile ? 11 : 14} />
            )}
          </g>
        ))}

        {/* 6. Perches / Brackets at Card Edge */}
        {vineData.perches.map((p) => (
          <g key={p.id} className={`perch-${p.id}`}>
            {ART.perch ? (
              <image
                href={ART.perch}
                x={p.x - 12}
                y={p.y - 12}
                width="24"
                height="24"
                className="vine-perch"
              />
            ) : (
              <ProceduralPerch x={p.x} y={p.y} toLeft={p.toLeft} />
            )}
          </g>
        ))}
      </svg>

      {/* ============================================================== */}
      {/* Event Cards Grid Container                                     */}
      {/* ============================================================== */}
      <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-y-[14vh] md:gap-y-[16vh] gap-x-12 lg:gap-x-20 z-20 items-center">
        {TIMELINE_EVENTS.map((evt, idx) => {
          const isSelected = activeEvent === evt.id;
          const isEven = idx % 2 !== 0;

          return (
            <article
              key={evt.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              onClick={(e) => handleEventClick(evt, e)}
              className={`event group relative p-4 sm:p-5 md:p-6 text-left cursor-pointer transition-all duration-300 rounded-[14px] shadow-xl ${
                isEven
                  ? 'md:col-start-2 md:justify-self-start'
                  : 'md:col-start-1 md:justify-self-end'
              } ${
                vineData.isMobile
                  ? 'ml-[64px] w-[calc(100%-74px)]'
                  : 'w-full md:max-w-[460px]'
              }`}
              style={{
                backgroundColor: '#fffdf5', // Clean cream fill
                border: '3.5px solid #1b1210', // 3px+ crisp black ink outline
                boxShadow: isSelected
                  ? '0 0 0 3px #d49a18, 0 14px 32px rgba(0,0,0,0.75)'
                  : '0 8px 24px rgba(0,0,0,0.5)',
                transform: 'none', // Default CSS visible state for accessibility & no-JS fallback
                opacity: 1,
              }}
            >
              {/* Thin Inner Gold Border */}
              <div className="absolute inset-[3px] rounded-[10px] border border-[#b8862b]/60 pointer-events-none" />

              {/* Top Accent Band (Color derived per event) */}
              <div
                className="absolute top-0 left-0 right-0 h-2 rounded-t-[10px]"
                style={{ backgroundColor: evt.accent }}
              />

              {/* Small Header Particulars: Day / Date / Time / Venue Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 pt-1 text-[9px] sm:text-[10.5px] font-poppins">
                <span
                  className="px-2 py-0.5 rounded-full font-bold text-white text-[8px] sm:text-[9.5px]"
                  style={{ backgroundColor: evt.accent }}
                >
                  {evt.dayLabel}
                </span>

                <div className="bg-[#f7e8c4]/80 text-[#1b1210] border border-[#b8862b]/40 rounded-md px-2 py-0.5 flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3 text-[#b3141c] flex-shrink-0" />
                  <span>{evt.date}</span>
                </div>

                <div className="bg-[#f7e8c4]/80 text-[#1b1210] border border-[#b8862b]/40 rounded-md px-2 py-0.5 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3 text-[#b8862b] flex-shrink-0" />
                  <span>{evt.time}</span>
                </div>

                <div className="w-full bg-[#f7e8c4]/80 text-[#1b1210] border border-[#b8862b]/40 rounded-md px-2 py-0.5 flex items-center gap-1 font-medium truncate">
                  <MapPin className="w-3 h-3 text-[#b3141c] flex-shrink-0" />
                  <span className="truncate">{evt.venue}</span>
                </div>
              </div>

              {/* Event Title + Subtitle */}
              <div className="mb-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-yatra text-lg sm:text-xl md:text-2xl font-bold text-[#1b1210] leading-tight tracking-wide">
                    {evt.title}
                  </h3>
                  <span className="text-xl sm:text-2xl flex-shrink-0">{evt.emoji}</span>
                </div>
                <div className="font-pixel text-[8.5px] sm:text-[10px] text-[#b3141c] font-bold uppercase tracking-wider mt-0.5">
                  {evt.subtitle}
                </div>
              </div>

              {/* Blurb Description */}
              <p className="font-poppins text-xs sm:text-sm text-[#2a1e1b] leading-relaxed mb-3 bg-[#fdf6e7] p-2 sm:p-2.5 rounded-lg border border-[#e6d0a1]">
                {evt.blurb}
              </p>

              {/* Dress Code Pill Footer */}
              <div className="flex items-center justify-between bg-[#1b1210] text-[#f7e8c4] rounded-full px-3 py-1 text-[8.5px] sm:text-[10px] font-semibold border border-[#b8862b]">
                <span className="truncate">👗 {evt.dress}</span>
                <span className="text-amber-300 ml-1.5 flex-shrink-0 text-[8px] sm:text-[9.5px] group-hover:scale-105 transition-transform">
                  ✦ Celebrate
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* Auspicious Footnote (Config-Driven)                           */}
      {/* ============================================================== */}
      <footer className="relative z-20 text-[7.5px] sm:text-[9px] md:text-[10.5px] text-amber-300/90 font-pixel tracking-widest mt-16 sm:mt-24">
        {eventsConfig.footnote || '🪔 ALL EVENTS INCLUDE 100% UNLIMITED ROYAL BANQUET HOSPITALITY 🪔'}
      </footer>
    </section>
  );
}
