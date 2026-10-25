import React, { useEffect, useRef } from 'react';

/**
 * ============================================================================
 * ARCHITECTURAL VIEWPORT BORDER FRAME (Global Pinned Frame)
 * ============================================================================
 *
 * Keeps decorative borders pinned to the viewport edges (top, bottom, left, right)
 * across the entire website journey.
 *
 * Borders NEVER scroll with the page content or appear in the middle of the screen.
 * Instead, as sections transition on scroll:
 * - Outgoing borders slide out beyond viewport edges:
 *     top: -115%, bottom: +115%, left: -115%, right: +115%, corners: ±135%
 * - Incoming borders slide in from beyond viewport edges into place:
 *     -115% / +115% -> 0%
 *
 * Supported Sections:
 *   1. Section 1 (Vedic Mandap): Red & Gold Madhubani Border
 *   2. Section 2 (Farman Invitation): Royal Midnight Blue & Sun Medallions
 *   3. Section 3 (Meet the Couple): Royal Deep Emerald & Corner Medallions
 *   4. Section 4 (Events Timeline): Royal Gold Arch & Sun Medallions
 */

export default function ArchitecturalBorderFrame() {
  // Section 1: Red Madhubani Refs
  const redContainerRef = useRef(null);
  const redTopRef = useRef(null);
  const redBottomRef = useRef(null);
  const redLeftRef = useRef(null);
  const redRightRef = useRef(null);
  const redCornerTLRef = useRef(null);
  const redCornerTRRef = useRef(null);
  const redCornerBLRef = useRef(null);
  const redCornerBRRef = useRef(null);

  // Section 2: Royal Blue Refs
  const blueContainerRef = useRef(null);
  const blueTopRef = useRef(null);
  const blueBottomRef = useRef(null);
  const blueLeftRef = useRef(null);
  const blueRightRef = useRef(null);
  const blueCornerTLRef = useRef(null);
  const blueCornerTRRef = useRef(null);
  const blueCornerBLRef = useRef(null);
  const blueCornerBRRef = useRef(null);

  // Section 3: Royal Emerald Refs
  const emContainerRef = useRef(null);
  const emTopRef = useRef(null);
  const emBottomRef = useRef(null);
  const emLeftRef = useRef(null);
  const emRightRef = useRef(null);
  const emCornerTLRef = useRef(null);
  const emCornerTRRef = useRef(null);
  const emCornerBLRef = useRef(null);
  const emCornerBRRef = useRef(null);

  // Section 4: Royal Gold Arch Refs
  const goldContainerRef = useRef(null);
  const goldTopRef = useRef(null);
  const goldBottomRef = useRef(null);
  const goldLeftRef = useRef(null);
  const goldRightRef = useRef(null);
  const goldCornerTLRef = useRef(null);
  const goldCornerTRRef = useRef(null);
  const goldCornerBLRef = useRef(null);
  const goldCornerBRRef = useRef(null);

  // Section 5: Royal Magenta Conch & Sun Refs
  const magentaContainerRef = useRef(null);
  const magentaTopRef = useRef(null);
  const magentaBottomRef = useRef(null);
  const magentaLeftRef = useRef(null);
  const magentaRightRef = useRef(null);
  const magentaCornerTLRef = useRef(null);
  const magentaCornerTRRef = useRef(null);
  const magentaCornerBLRef = useRef(null);
  const magentaCornerBRRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const applyTransforms = (container, top, bottom, left, right, cTL, cTR, cBL, cBR, offset, cornerOffset) => {
      if (offset >= 115) {
        if (container.current) container.current.style.display = 'none';
        return;
      }
      if (container.current) container.current.style.display = 'block';

      if (top.current) top.current.style.transform = `translate3d(0, -${offset}%, 0)`;
      if (bottom.current) bottom.current.style.transform = `translate3d(0, ${offset}%, 0)`;
      if (left.current) left.current.style.transform = `translate3d(-${offset}%, 0, 0)`;
      if (right.current) right.current.style.transform = `translate3d(${offset}%, 0, 0)`;

      if (cTL.current) cTL.current.style.transform = `translate3d(-${cornerOffset}%, -${cornerOffset}%, 0)`;
      if (cTR.current) cTR.current.style.transform = `translate3d(${cornerOffset}%, -${cornerOffset}%, 0)`;
      if (cBL.current) cBL.current.style.transform = `translate3d(-${cornerOffset}%, ${cornerOffset}%, 0)`;
      if (cBR.current) cBR.current.style.transform = `translate3d(${cornerOffset}%, ${cornerOffset}%, 0)`;
    };

    const updateBorders = () => {
      const heroEl = document.getElementById('opening');
      if (!heroEl) return;

      const heroRect = heroEl.getBoundingClientRect();
      const maxScroll = heroRect.height - window.innerHeight;
      if (maxScroll <= 0) return;

      const rawProgress = -heroRect.top / maxScroll;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Section 3 exit progress as Section 4 enters (when hero reaches bottom and scrolls off)
      const pExitS3 = Math.min(Math.max((window.innerHeight - heroRect.bottom) / window.innerHeight, 0), 1);

      let redOffset = 115;
      let redCornerOffset = 135;

      let blueOffset = 115;
      let blueCornerOffset = 135;

      let emOffset = 115;
      let emCornerOffset = 135;

      let goldOffset = 115;
      let goldCornerOffset = 135;

      let magentaOffset = 115;
      let magentaCornerOffset = 135;

      const timelineEl = document.getElementById('timeline');

      if (heroRect.bottom <= 0) {
        // Hero has completely scrolled off; we are in Section 4 timeline or Section 5!
        if (timelineEl) {
          const tRect = timelineEl.getBoundingClientRect();
          const pExitS4 = Math.min(Math.max((window.innerHeight - tRect.bottom) / window.innerHeight, 0), 1);
          const scrollPastTimeline = Math.max(0, -tRect.bottom);
          const pEnterS5 = Math.min(Math.max(scrollPastTimeline / 1400, 0), 1);

          if (pExitS4 <= 0) {
            // Pure Section 4
            goldOffset = 0;
            goldCornerOffset = 0;
            magentaOffset = 115;
            magentaCornerOffset = 135;
          } else if (pEnterS5 <= 0) {
            // Phase 1 (0.00 -> 0.48): Section 4 Gold Arch slides OUT beyond screen edges
            const exitEase = Math.pow(pExitS4, 1.8);
            goldOffset = exitEase * 115;
            goldCornerOffset = exitEase * 135;
            magentaOffset = 115;
            magentaCornerOffset = 135;
          } else if (pEnterS5 < 1) {
            // Phase 2 (0.48 -> 1.00): Section 5 Magenta Conch & Sun slides IN from beyond screen edges
            goldOffset = 115;
            goldCornerOffset = 135;
            const enterEase = 1 - Math.pow(1 - pEnterS5, 2.2);
            magentaOffset = (1 - enterEase) * 115;
            magentaCornerOffset = (1 - enterEase) * 135;
          } else {
            // Fully in Section 5
            goldOffset = 115;
            goldCornerOffset = 135;
            magentaOffset = 0;
            magentaCornerOffset = 0;
          }
        } else {
          goldOffset = 0;
          goldCornerOffset = 0;
        }
      } else if (pExitS3 > 0) {
        // Transition from Section 3 to Section 4:
        // FIRST slide out Section 3 border, THEN slide in Section 4 border!
        if (pExitS3 <= 0.48) {
          // Phase 1 (0.00 -> 0.48): Section 3 Emerald borders slide OUT beyond screen edges
          const pExitEm = pExitS3 / 0.48;
          const exitEase = Math.pow(pExitEm, 1.8);
          emOffset = exitEase * 115;
          emCornerOffset = exitEase * 135;

          // Section 4 Gold Arch borders remain waiting off-screen
          goldOffset = 115;
          goldCornerOffset = 135;
        } else {
          // Phase 2 (0.48 -> 1.00): Section 3 Emerald borders are fully off-screen
          emOffset = 115;
          emCornerOffset = 135;

          // Section 4 Gold Arch borders slide IN from beyond screen edges into place
          const pEnterGold = Math.min((pExitS3 - 0.48) / 0.52, 1);
          const enterEase = 1 - Math.pow(1 - pEnterGold, 2.2);
          goldOffset = (1 - enterEase) * 115;
          goldCornerOffset = (1 - enterEase) * 135;
        }
      } else {
        // Section 1 (Mandap): 0.00 -> 0.18
        if (progress <= 0.04) {
          redOffset = 0;
          redCornerOffset = 0;
        } else if (progress < 0.18) {
          const pSlideOld = (progress - 0.04) / 0.14;
          redOffset = pSlideOld * 115;
          redCornerOffset = pSlideOld * 135;
        }

        // Section 2 (Royal Blue): 0.18 -> 0.64 -> 0.80
        if (progress < 0.18) {
          blueOffset = 115;
          blueCornerOffset = 135;
        } else if (progress < 0.32) {
          const pEnterNew = (progress - 0.18) / 0.14;
          const newEase = 1 - Math.pow(1 - pEnterNew, 2.2);
          blueOffset = (1 - newEase) * 115;
          blueCornerOffset = (1 - newEase) * 135;
        } else if (progress <= 0.64) {
          blueOffset = 0;
          blueCornerOffset = 0;
        } else if (progress < 0.80) {
          const pExitNew = (progress - 0.64) / 0.16;
          const exitEase = Math.pow(pExitNew, 2.0);
          blueOffset = exitEase * 115;
          blueCornerOffset = exitEase * 135;
        }

        // Section 3 (Royal Emerald): 0.70 -> 1.00
        if (progress < 0.70) {
          emOffset = 115;
          emCornerOffset = 135;
        } else if (progress < 0.84) {
          const pEnterEm = (progress - 0.70) / 0.14;
          const emEase = 1 - Math.pow(1 - pEnterEm, 2.2);
          emOffset = (1 - emEase) * 115;
          emCornerOffset = (1 - emEase) * 135;
        } else {
          emOffset = 0;
          emCornerOffset = 0;
        }
      }

      applyTransforms(redContainerRef, redTopRef, redBottomRef, redLeftRef, redRightRef, redCornerTLRef, redCornerTRRef, redCornerBLRef, redCornerBRRef, redOffset, redCornerOffset);
      applyTransforms(blueContainerRef, blueTopRef, blueBottomRef, blueLeftRef, blueRightRef, blueCornerTLRef, blueCornerTRRef, blueCornerBLRef, blueCornerBRRef, blueOffset, blueCornerOffset);
      applyTransforms(emContainerRef, emTopRef, emBottomRef, emLeftRef, emRightRef, emCornerTLRef, emCornerTRRef, emCornerBLRef, emCornerBRRef, emOffset, emCornerOffset);
      applyTransforms(goldContainerRef, goldTopRef, goldBottomRef, goldLeftRef, goldRightRef, goldCornerTLRef, goldCornerTRRef, goldCornerBLRef, goldCornerBRRef, goldOffset, goldCornerOffset);
      applyTransforms(magentaContainerRef, magentaTopRef, magentaBottomRef, magentaLeftRef, magentaRightRef, magentaCornerTLRef, magentaCornerTRRef, magentaCornerBLRef, magentaCornerBRRef, magentaOffset, magentaCornerOffset);
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateBorders();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateBorders();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {/* ============================================================== */}
      {/* 1. SECTION 1 BORDER FRAME: RED & GOLD MADHUBANI               */}
      {/* ============================================================== */}
      <div ref={redContainerRef} className="absolute inset-0 pointer-events-none">
        {/* Top Strip */}
        <div
          ref={redTopRef}
          className="absolute top-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] will-change-transform"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/madhubani/border.webp')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
        </div>

        {/* Bottom Strip */}
        <div
          ref={redBottomRef}
          className="absolute bottom-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] will-change-transform"
        >
          <div
            className="w-full h-full scale-y-[-1]"
            style={{
              backgroundImage: "url('/assets/madhubani/border.webp')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
        </div>

        {/* Left Strip */}
        <div
          ref={redLeftRef}
          className="absolute top-0 bottom-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] will-change-transform"
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/madhubani/border-vertical.webp')",
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto',
            }}
          />
        </div>

        {/* Right Strip */}
        <div
          ref={redRightRef}
          className="absolute top-0 bottom-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] will-change-transform"
        >
          <div
            className="w-full h-full scale-x-[-1]"
            style={{
              backgroundImage: "url('/assets/madhubani/border-vertical.webp')",
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto',
            }}
          />
        </div>

        {/* 4 Corner Lotus Blocks */}
        <div
          ref={redCornerTLRef}
          className="absolute top-0 left-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
        >
          <img
            src="/assets/madhubani/corner-piece.webp"
            alt=""
            className="w-full h-full object-contain select-none"
          />
        </div>
        <div
          ref={redCornerTRRef}
          className="absolute top-0 right-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
        >
          <img
            src="/assets/madhubani/corner-piece.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-x-[-1]"
          />
        </div>
        <div
          ref={redCornerBLRef}
          className="absolute bottom-0 left-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
        >
          <img
            src="/assets/madhubani/corner-piece.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-y-[-1]"
          />
        </div>
        <div
          ref={redCornerBRRef}
          className="absolute bottom-0 right-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
        >
          <img
            src="/assets/madhubani/corner-piece.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-x-[-1] scale-y-[-1]"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SECTION 2 BORDER FRAME: ROYAL BLUE & SUN MEDALLIONS        */}
      {/* ============================================================== */}
      <div ref={blueContainerRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }}>
        {/* Top Strip */}
        <div
          ref={blueTopRef}
          className="absolute top-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] will-change-transform"
          style={{ transform: 'translate3d(0, -115%, 0)' }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/madhubani/blue-border-h.webp')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
        </div>

        {/* Bottom Strip */}
        <div
          ref={blueBottomRef}
          className="absolute bottom-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] will-change-transform"
          style={{ transform: 'translate3d(0, 115%, 0)' }}
        >
          <div
            className="w-full h-full scale-y-[-1]"
            style={{
              backgroundImage: "url('/assets/madhubani/blue-border-h.webp')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
        </div>

        {/* Left Strip */}
        <div
          ref={blueLeftRef}
          className="absolute top-0 bottom-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] will-change-transform"
          style={{ transform: 'translate3d(-115%, 0, 0)' }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/madhubani/blue-border-v.webp')",
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto',
            }}
          />
        </div>

        {/* Right Strip */}
        <div
          ref={blueRightRef}
          className="absolute top-0 bottom-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] will-change-transform"
          style={{ transform: 'translate3d(115%, 0, 0)' }}
        >
          <div
            className="w-full h-full scale-x-[-1]"
            style={{
              backgroundImage: "url('/assets/madhubani/blue-border-v.webp')",
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto',
            }}
          />
        </div>

        {/* 4 Corner Sun Medallions */}
        <div
          ref={blueCornerTLRef}
          className="absolute top-0 left-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(-135%, -135%, 0)' }}
        >
          <img
            src="/assets/madhubani/sun-corner-clean.webp"
            alt=""
            className="w-full h-full object-contain select-none"
          />
        </div>
        <div
          ref={blueCornerTRRef}
          className="absolute top-0 right-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(135%, -135%, 0)' }}
        >
          <img
            src="/assets/madhubani/sun-corner-clean.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-x-[-1]"
          />
        </div>
        <div
          ref={blueCornerBLRef}
          className="absolute bottom-0 left-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(-135%, 135%, 0)' }}
        >
          <img
            src="/assets/madhubani/sun-corner-clean.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-y-[-1]"
          />
        </div>
        <div
          ref={blueCornerBRRef}
          className="absolute bottom-0 right-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(135%, 135%, 0)' }}
        >
          <img
            src="/assets/madhubani/sun-corner-clean.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-x-[-1] scale-y-[-1]"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. SECTION 3 BORDER FRAME: ROYAL DEEP EMERALD & GOLD           */}
      {/* ============================================================== */}
      <div ref={emContainerRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }}>
        {/* Top Strip */}
        <div
          ref={emTopRef}
          className="absolute top-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] will-change-transform"
          style={{ transform: 'translate3d(0, -115%, 0)' }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/borders/emerald_border_h.webp')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
        </div>

        {/* Bottom Strip */}
        <div
          ref={emBottomRef}
          className="absolute bottom-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] will-change-transform"
          style={{ transform: 'translate3d(0, 115%, 0)' }}
        >
          <div
            className="w-full h-full scale-y-[-1]"
            style={{
              backgroundImage: "url('/assets/borders/emerald_border_h.webp')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
        </div>

        {/* Left Strip */}
        <div
          ref={emLeftRef}
          className="absolute top-0 bottom-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] will-change-transform"
          style={{ transform: 'translate3d(-115%, 0, 0)' }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/borders/emerald_border_v.webp')",
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto',
            }}
          />
        </div>

        {/* Right Strip */}
        <div
          ref={emRightRef}
          className="absolute top-0 bottom-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] will-change-transform"
          style={{ transform: 'translate3d(115%, 0, 0)' }}
        >
          <div
            className="w-full h-full scale-x-[-1]"
            style={{
              backgroundImage: "url('/assets/borders/emerald_border_v.webp')",
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto',
            }}
          />
        </div>

        {/* 4 Corner Medallions */}
        <div
          ref={emCornerTLRef}
          className="absolute top-0 left-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(-135%, -135%, 0)' }}
        >
          <img
            src="/assets/borders/emerald_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none"
          />
        </div>
        <div
          ref={emCornerTRRef}
          className="absolute top-0 right-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(135%, -135%, 0)' }}
        >
          <img
            src="/assets/borders/emerald_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-x-[-1]"
          />
        </div>
        <div
          ref={emCornerBLRef}
          className="absolute bottom-0 left-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(-135%, 135%, 0)' }}
        >
          <img
            src="/assets/borders/emerald_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-y-[-1]"
          />
        </div>
        <div
          ref={emCornerBRRef}
          className="absolute bottom-0 right-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(135%, 135%, 0)' }}
        >
          <img
            src="/assets/borders/emerald_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-x-[-1] scale-y-[-1]"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. SECTION 4 BORDER FRAME: ROYAL GOLD ARCH & SUN MEDALLIONS    */}
      {/* ============================================================== */}
      <div ref={goldContainerRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }}>
        {/* Top Strip */}
        <div
          ref={goldTopRef}
          className="absolute top-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] will-change-transform"
          style={{ transform: 'translate3d(0, -115%, 0)' }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/borders/gold_arch_border_h.webp')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
        </div>

        {/* Bottom Strip */}
        <div
          ref={goldBottomRef}
          className="absolute bottom-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] will-change-transform"
          style={{ transform: 'translate3d(0, 115%, 0)' }}
        >
          <div
            className="w-full h-full scale-y-[-1]"
            style={{
              backgroundImage: "url('/assets/borders/gold_arch_border_h.webp')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
        </div>

        {/* Left Strip */}
        <div
          ref={goldLeftRef}
          className="absolute top-0 bottom-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] will-change-transform"
          style={{ transform: 'translate3d(-115%, 0, 0)' }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/borders/gold_arch_border_v.webp')",
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto',
            }}
          />
        </div>

        {/* Right Strip */}
        <div
          ref={goldRightRef}
          className="absolute top-0 bottom-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] will-change-transform"
          style={{ transform: 'translate3d(115%, 0, 0)' }}
        >
          <div
            className="w-full h-full scale-x-[-1]"
            style={{
              backgroundImage: "url('/assets/borders/gold_arch_border_v.webp')",
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto',
            }}
          />
        </div>

        {/* 4 Corner Medallions */}
        <div
          ref={goldCornerTLRef}
          className="absolute top-0 left-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(-135%, -135%, 0)' }}
        >
          <img
            src="/assets/borders/gold_arch_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none"
          />
        </div>
        <div
          ref={goldCornerTRRef}
          className="absolute top-0 right-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(135%, -135%, 0)' }}
        >
          <img
            src="/assets/borders/gold_arch_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-x-[-1]"
          />
        </div>
        <div
          ref={goldCornerBLRef}
          className="absolute bottom-0 left-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(-135%, 135%, 0)' }}
        >
          <img
            src="/assets/borders/gold_arch_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-y-[-1]"
          />
        </div>
        <div
          ref={goldCornerBRRef}
          className="absolute bottom-0 right-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(135%, 135%, 0)' }}
        >
          <img
            src="/assets/borders/gold_arch_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-x-[-1] scale-y-[-1]"
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 5. SECTION 5 BORDER FRAME: ROYAL MAGENTA CONCH & SUN MEDALLION */}
      {/* ============================================================== */}
      <div ref={magentaContainerRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }}>
        {/* Top Strip */}
        <div
          ref={magentaTopRef}
          className="absolute top-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] will-change-transform"
          style={{ transform: 'translate3d(0, -115%, 0)' }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/borders/magenta_border_h.webp')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
        </div>

        {/* Bottom Strip */}
        <div
          ref={magentaBottomRef}
          className="absolute bottom-0 left-0 right-0 h-[22px] sm:h-[26px] md:h-[30px] will-change-transform"
          style={{ transform: 'translate3d(0, 115%, 0)' }}
        >
          <div
            className="w-full h-full scale-y-[-1]"
            style={{
              backgroundImage: "url('/assets/borders/magenta_border_h.webp')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: 'auto 100%',
            }}
          />
        </div>

        {/* Left Strip */}
        <div
          ref={magentaLeftRef}
          className="absolute top-0 bottom-0 left-0 w-[22px] sm:w-[26px] md:w-[30px] will-change-transform"
          style={{ transform: 'translate3d(-115%, 0, 0)' }}
        >
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/assets/borders/magenta_border_v.webp')",
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto',
            }}
          />
        </div>

        {/* Right Strip */}
        <div
          ref={magentaRightRef}
          className="absolute top-0 bottom-0 right-0 w-[22px] sm:w-[26px] md:w-[30px] will-change-transform"
          style={{ transform: 'translate3d(115%, 0, 0)' }}
        >
          <div
            className="w-full h-full scale-x-[-1]"
            style={{
              backgroundImage: "url('/assets/borders/magenta_border_v.webp')",
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% auto',
            }}
          />
        </div>

        {/* 4 Corner Medallions (8-Pointed Golden Sun on Magenta) */}
        <div
          ref={magentaCornerTLRef}
          className="absolute top-0 left-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(-135%, -135%, 0)' }}
        >
          <img
            src="/assets/borders/magenta_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none"
          />
        </div>
        <div
          ref={magentaCornerTRRef}
          className="absolute top-0 right-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(135%, -135%, 0)' }}
        >
          <img
            src="/assets/borders/magenta_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-x-[-1]"
          />
        </div>
        <div
          ref={magentaCornerBLRef}
          className="absolute bottom-0 left-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(-135%, 135%, 0)' }}
        >
          <img
            src="/assets/borders/magenta_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-y-[-1]"
          />
        </div>
        <div
          ref={magentaCornerBRRef}
          className="absolute bottom-0 right-0 w-[24px] sm:w-[28px] md:w-[34px] h-[24px] sm:h-[28px] md:h-[34px] z-50 will-change-transform"
          style={{ transform: 'translate3d(135%, 135%, 0)' }}
        >
          <img
            src="/assets/borders/magenta_corner.webp"
            alt=""
            className="w-full h-full object-contain select-none scale-x-[-1] scale-y-[-1]"
          />
        </div>
      </div>
    </div>
  );
}
