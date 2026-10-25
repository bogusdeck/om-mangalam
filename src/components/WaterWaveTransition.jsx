import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ============================================================================
 * WATER WAVE TRANSITION (Section 4 -> Section 5 Transition)
 * ============================================================================
 *
 * Visual & Motion Choreography:
 * 1. Phase 1 (Enter: 0.00 -> 0.50):
 *    Triggered as Section 4 (Timeline) approaches its end.
 *    Concentric Pichwai water circles of varied sizes populate from the bottom up,
 *    staggering row by row until the entire screen is 100% covered in an ornate
 *    ocean of blue/cyan Seigaiha waves.
 *
 * 2. Phase 2 (Exit: 0.50 -> 1.00):
 *    Section 5 is pinned. As the user continues scrolling, the circles are removed
 *    from bottom to up (the bottom rows float upwards and dissolve first, followed
 *    by the mid and top rows), progressively revealing Section 5 ("THE PEOPLE
 *    RESPONSIBLE FOR THIS") underneath.
 *
 * 3. 100% Reversible: Scrolling back up smoothly reverses the sequence.
 */

export default function WaterWaveTransition() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Progress reference: 0.0 = inactive, 0.5 = 100% covered, 1.0 = transition finished
    let currentProgress = 0;
    let spriteLoaded = false;

    // Load transparent water circle sprite
    const sprite = new Image();
    sprite.src = '/assets/water/water_circle_800.webp';

    /**
     * Compute and render the Seigaiha water circle wave grid
     */
    const render = (progress) => {
      if (!ctx || !spriteLoaded) return;

      ctx.clearRect(0, 0, width, height);

      if (progress <= 0 || progress >= 1.0) {
        if (container) {
          container.style.opacity = '0';
          container.style.pointerEvents = 'none';
        }
        return;
      }

      if (container) {
        container.style.opacity = '1';
        container.style.pointerEvents = 'none';
      }

      // Backdrop ocean blue gradient to guarantee zero gaps
      // Fades in during 0.10 -> 0.45, stays full to 0.55, fades out 0.55 -> 0.95
      let bgAlpha = 0;
      if (progress < 0.5) {
        bgAlpha = Math.min(Math.max((progress - 0.1) / 0.35, 0), 1);
      } else {
        bgAlpha = Math.min(Math.max((0.95 - progress) / 0.4, 0), 1);
      }

      if (bgAlpha > 0) {
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        grad.addColorStop(0, `rgba(4, 18, 33, ${0.98 * bgAlpha})`);
        grad.addColorStop(0.5, `rgba(7, 28, 51, ${0.94 * bgAlpha})`);
        grad.addColorStop(1, `rgba(10, 38, 68, ${0.90 * bgAlpha})`);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      const isMobile = width < 768;
      const numRows = isMobile ? 8 : 10;
      const baseDiameter = isMobile ? 180 : 260;

      // Render rows from TOP to BOTTOM so lower rows overlap upper rows (Seigaiha fish-scale wave pattern)
      for (let r = numRows - 1; r >= 0; r--) {
        // rowNorm: 0 at bottom row, 1 at top row
        const rowNorm = r / (numRows - 1);
        const baseY = (height + (isMobile ? 40 : 70)) - rowNorm * (height + (isMobile ? 100 : 150));

        // ---------------------------------------------------------------------
        // Phase 1 (0.00 -> 0.50): Populate from BOTTOM to TOP
        // Row 0 (bottom) enters first, Row numRows-1 (top) enters last
        // ---------------------------------------------------------------------
        const enterStart = rowNorm * 0.28;
        const enterEnd = enterStart + 0.20;
        const pEnter = Math.min(Math.max((progress - enterStart) / (enterEnd - enterStart), 0), 1);

        // ---------------------------------------------------------------------
        // Phase 2 (0.50 -> 1.00): Remove from BOTTOM to TOP
        // Row 0 (bottom) exits first, Row numRows-1 (top) exits last
        // ---------------------------------------------------------------------
        const exitStart = 0.50 + rowNorm * 0.28;
        const exitEnd = exitStart + 0.20;
        const pExit = Math.min(Math.max((progress - exitStart) / (exitEnd - exitStart), 0), 1);

        // If not yet entered or already fully exited, skip rendering this row
        if (pEnter <= 0 || pExit >= 1.0) continue;

        // Smooth cubic easing for entrance and exit
        const easeIn = 1 - Math.pow(1 - pEnter, 2.4);
        const easeOut = Math.pow(pExit, 2.0);

        // Vertical displacement:
        // Entrance: rises from bottom + 240px to 0
        // Exit: rises upwards by 120px while fading
        const yEnterOffset = (1 - easeIn) * (isMobile ? 180 : 260);
        const yExitOffset = -easeOut * (isMobile ? 100 : 150);
        const rowY = baseY + yEnterOffset + yExitOffset;

        // Scale & Opacity:
        const scaleIn = 0.25 + 0.75 * easeIn;
        const scaleOut = 1.0 - 0.45 * easeOut;
        const rowScale = scaleIn * scaleOut;

        const alphaIn = easeIn;
        const alphaOut = 1.0 - easeOut;
        const rowAlpha = Math.min(Math.max(alphaIn * alphaOut, 0), 1);

        // Columns across the screen width
        const colStep = baseDiameter * (isMobile ? 0.62 : 0.58);
        const cols = Math.ceil(width / colStep) + 3;
        // Stagger every other row by half step for true Seigaiha overlapping crests
        const rowOffsetX = (r % 2 === 0 ? 0 : colStep * 0.5) - colStep;

        for (let c = 0; c < cols; c++) {
          const colX = rowOffsetX + c * colStep;

          // Varied circle sizes (User requirement: "populate these circles different size")
          // Harmonic wave equation provides natural, artistic size variations (±22%)
          const sizeVariance = 1.0 + 0.22 * Math.sin(c * 1.8 + r * 2.5);
          const circleDiam = baseDiameter * rowScale * sizeVariance;

          if (circleDiam <= 8 || rowAlpha <= 0.01) continue;

          // Gentle ambient float offset per circle
          const floatOffset = Math.sin(c * 2.1 + r * 1.7) * 8 * (1 - easeOut);

          ctx.save();
          ctx.globalAlpha = rowAlpha;
          ctx.drawImage(
            sprite,
            colX - circleDiam / 2,
            rowY + floatOffset - circleDiam / 2,
            circleDiam,
            circleDiam
          );
          ctx.restore();
        }
      }
    };

    const renderCurrentProgress = () => {
      render(currentProgress);
    };

    sprite.onload = () => {
      spriteLoaded = true;
      renderCurrentProgress();
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      renderCurrentProgress();
    };

    resizeCanvas();

    // =========================================================================
    // GSAP SCROLLTRIGGER ORCHESTRATION (Two-Stage Continuous Seamless Pipeline)
    // =========================================================================
    // Stage 1: As Section 4 (#timeline) reaches its end (100vh scroll distance)
    //          Water circles populate from BOTTOM to UP (p: 0.00 -> 0.50)
    //          At p = 0.50, entire screen is 100% full of Pichwai water waves.
    //
    // Stage 2: Section 5 (#family) pins at 'top top' for 1400px of scroll
    //          Water circles remove from BOTTOM to UP (p: 0.50 -> 1.00)
    //          Revealing Section 5 ("THE PEOPLE RESPONSIBLE FOR THIS") underneath.
    // =========================================================================
    let trigger1 = null;
    let trigger2 = null;

    const initScrollTrigger = () => {
      const timelineEl = document.getElementById('timeline');
      const familyEl = document.getElementById('family');

      if (!timelineEl || !familyEl) {
        setTimeout(initScrollTrigger, 100);
        return;
      }

      // Stage 1: Approach over timeline's bottom 100vh
      trigger1 = ScrollTrigger.create({
        trigger: timelineEl,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: 0.4,
        onUpdate: (self) => {
          // If we are currently in Stage 1, drive progress 0.00 -> 0.50
          if (self.isActive || (self.progress > 0 && self.progress < 1)) {
            currentProgress = self.progress * 0.50;
            render(currentProgress);
          } else if (self.progress === 0 && (!trigger2 || trigger2.progress === 0)) {
            currentProgress = 0;
            render(0);
          }
        },
      });

      // Stage 2: Section 5 Pinned Reveal
      trigger2 = ScrollTrigger.create({
        trigger: familyEl,
        start: 'top top',
        end: '+=1400',
        pin: familyEl,
        pinSpacing: true,
        scrub: 0.4,
        onUpdate: (self) => {
          // Drive progress 0.50 -> 1.00
          if (self.isActive || (self.progress > 0 && self.progress < 1)) {
            currentProgress = 0.50 + self.progress * 0.50;
            render(currentProgress);
          } else if (self.progress === 1) {
            currentProgress = 1.0;
            render(1.0);
          } else if (self.progress === 0 && trigger1 && trigger1.progress === 1) {
            currentProgress = 0.50;
            render(0.50);
          }
        },
      });
    };

    const timer = setTimeout(initScrollTrigger, 200);

    window.addEventListener('resize', resizeCanvas);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resizeCanvas);
      if (trigger1) trigger1.kill();
      if (trigger2) trigger2.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[45] opacity-0 overflow-hidden"
      style={{ willChange: 'opacity' }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
