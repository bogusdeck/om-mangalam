import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import LeftAside from './components/LeftAside';
import MarigoldRain from './components/MarigoldRain';
import ViewportBackground from './components/ViewportBackground';
import ArchitecturalBorderFrame from './components/ArchitecturalBorderFrame';
import WaterWaveTransition from './components/WaterWaveTransition';
import { sectionsConfig } from './config/sectionsConfig';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { WEDDING_CONFIG, getCoupleInitials } from './config/weddingConfig';

function AppContent() {
  const { themeConfig } = useTheme();

  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = getCoupleInitials(WEDDING_CONFIG);
    }
  }, []);

  const curtainsSection = sectionsConfig.find((s) => s.id === 'curtains');
  const mainSections = sectionsConfig.filter((s) => s.enabled && s.id !== 'curtains');

  return (
    <div className="relative min-h-screen text-amber-100 font-poppins overflow-x-clip">
      {/* Global Viewport Pinned Background Crossfade (Zero seams, zero horizontal splits) */}
      <ViewportBackground />

      {/* Global Pinned Architectural Viewport Border Frame */}
      <ArchitecturalBorderFrame />

      {/* Global Sacred Water Wave Scroll Transition (Section 4 -> Section 5) */}
      <WaterWaveTransition />

      {/* Main Interactive Sections Journey */}
      <main className="relative z-10">
        {mainSections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>

      {/* Opening Curtains Overlay (Layered above Architectural Border Frame) */}
      {curtainsSection?.enabled && <curtainsSection.Component />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

