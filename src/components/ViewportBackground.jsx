import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * ============================================================================
 * VIEWPORT BACKGROUND MANAGER (Global Pinned Seamless Background)
 * ============================================================================
 *
 * Keeps backgrounds pinned to the full viewport (100vw x 100vh) across all
 * sections. Crossfades between section palettes on scroll so there are ZERO
 * horizontal seams, cut lines, or rectangular slabs moving across the screen.
 *
 * Section Palettes:
 *   1. Section 1 (Mandap Hero): Royal Theme Background + Stardust
 *   2. Section 2 (Farman Invitation): Royal Midnight Blue & Gold Dust
 *   3. Section 3 (Meet the Couple): Deep Royal Emerald & Gold Dust
 *   4. Section 4 (Wedding Events Timeline): Royal Deep Wine & Maroon
 */

export default function ViewportBackground() {
  const { themeConfig } = useTheme();

  const section2BgRef = useRef(null);
  const section3BgRef = useRef(null);
  const section4BgRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const updateBackgrounds = () => {
      const heroEl = document.getElementById('opening');
      if (!heroEl) return;

      const heroRect = heroEl.getBoundingClientRect();
      const maxScroll = heroRect.height - window.innerHeight;
      if (maxScroll <= 0) return;

      const rawProgress = -heroRect.top / maxScroll;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Section 3 exit progress as Section 4 enters (0 -> 1 over 1 viewport height)
      const pExitS3 = Math.min(Math.max((window.innerHeight - heroRect.bottom) / window.innerHeight, 0), 1);

      // 1. Section 2 Royal Midnight Blue (0.16 -> 0.28 in, holds to 0.64, 0.64 -> 0.80 out)
      if (section2BgRef.current) {
        if (progress <= 0.16) {
          section2BgRef.current.style.opacity = '0';
        } else if (progress <= 0.64) {
          const pBg2 = Math.min((progress - 0.16) / 0.12, 1);
          section2BgRef.current.style.opacity = pBg2.toString();
        } else {
          const pExitBg2 = Math.min((progress - 0.64) / 0.16, 1);
          section2BgRef.current.style.opacity = Math.max(0, 1 - pExitBg2).toString();
        }
      }

      // 2. Section 3 Deep Royal Emerald & Section 4 Royal Deep Wine Crossfade
      if (section3BgRef.current && section4BgRef.current) {
        if (heroRect.bottom <= 0) {
          // Fully inside Section 4 timeline
          section3BgRef.current.style.opacity = '0';
          section4BgRef.current.style.opacity = '1';
        } else if (pExitS3 > 0) {
          // Smooth seamless full-viewport crossfade from Emerald to Wine
          // Smooth cubic ease for imperceptible dissolve
          const fadeP = 1 - Math.pow(1 - pExitS3, 1.8);
          section3BgRef.current.style.opacity = Math.max(0, 1 - fadeP).toString();
          section4BgRef.current.style.opacity = Math.min(fadeP * 1.15, 1).toString();
        } else if (progress <= 0.64) {
          section3BgRef.current.style.opacity = '0';
          section4BgRef.current.style.opacity = '0';
        } else {
          const pBg3 = Math.min((progress - 0.64) / 0.16, 1);
          section3BgRef.current.style.opacity = pBg3.toString();
          section4BgRef.current.style.opacity = '0';
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateBackgrounds();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateBackgrounds();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* ============================================================== */}
      {/* 1. BASE SECTION 1 MANDAP HERO BACKGROUND (Dynamic Theme)       */}
      {/* ============================================================== */}
      <div className={`absolute inset-0 transition-colors duration-500 ${themeConfig.bgClass}`}>
        {/* Subtle Stardust Dots */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(${themeConfig.dotColor || '#ffd700'} 1.2px, transparent 1.2px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* 2. SECTION 2 ROYAL MIDNIGHT BLUE BACKGROUND (Crossfades in)    */}
      {/* ============================================================== */}
      <div
        ref={section2BgRef}
        className="absolute inset-0 opacity-0 will-change-[opacity]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #0b2247 0%, #06142a 55%, #020712 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(#ffd700 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] rounded-full blur-3xl bg-blue-600/20" />
      </div>

      {/* ============================================================== */}
      {/* 3. SECTION 3 DEEP ROYAL EMERALD BACKGROUND (Crossfades in)     */}
      {/* ============================================================== */}
      <div
        ref={section3BgRef}
        className="absolute inset-0 opacity-0 will-change-[opacity]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #0e3b2b 0%, #061c14 60%, #020b08 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(#ffd700 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] rounded-full blur-3xl bg-emerald-600/20" />
      </div>

      {/* ============================================================== */}
      {/* 4. SECTION 4 ROYAL DEEP WINE & MAROON BACKGROUND (Seamless)    */}
      {/* ============================================================== */}
      <div
        ref={section4BgRef}
        className="absolute inset-0 opacity-0 will-change-[opacity]"
        style={{
          backgroundColor: '#1b050d',
          backgroundImage: 'radial-gradient(circle at 50% 10%, #2f0714 0%, #170208 80%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(#ffd700 1.2px, transparent 1.2px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full blur-3xl bg-red-900/15" />
      </div>
    </div>
  );
}
