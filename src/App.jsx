import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import LeftAside from './components/LeftAside';
import MarigoldRain from './components/MarigoldRain';
import ArchitecturalBorderFrame from './components/ArchitecturalBorderFrame';
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

  return (
    <div className={`relative min-h-screen ${themeConfig.bgClass} text-amber-100 font-poppins overflow-x-clip transition-colors duration-500`}>
      {/* Global Pinned Architectural Viewport Border Frame */}
      <ArchitecturalBorderFrame />

      {/* Main Interactive Sections Journey */}
      <main className="relative">
        {sectionsConfig
          .filter((section) => section.enabled)
          .map(({ id, Component }) => (
            <Component key={id} />
          ))}
      </main>
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

