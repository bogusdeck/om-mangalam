import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton } from './ui';

export default function OpeningCurtain({ onOpenChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullyDismissed, setIsFullyDismissed] = useState(false);

  const handleOpenCurtains = () => {
    if (isOpen) return;

    shaadiAudio.playDramaticHit();
    shaadiAudio.playCelebrationFanfare();
    shaadiAudio.startBGM();

    // Trigger marigold & festive confetti shower
    confetti({
      particleCount: 160,
      spread: 110,
      colors: ['#FF9933', '#FFD700', '#851E18', '#FFF8DC', '#2E7D32'],
      origin: { y: 0.55 }
    });

    setIsOpen(true);
    if (onOpenChange) onOpenChange(true);

    setTimeout(() => {
      setIsFullyDismissed(true);
    }, 2000);
  };

  const handleToggleBack = (e) => {
    e.stopPropagation();
    shaadiAudio.playPop();
    setIsFullyDismissed(false);
    setIsOpen(false);
    if (onOpenChange) onOpenChange(false);
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
          className={`absolute top-0 left-0 right-0 z-30 transition-transform duration-1000 ease-out select-none pointer-events-none ${
            isOpen ? '-translate-y-full' : 'translate-y-0'
          }`}
          style={{
            filter: 'drop-shadow(0 15px 25px rgba(0, 0, 0, 0.85))'
          }}
        >
          <img
            src="/assets/madhubani/top_banner.png"
            alt="Madhubani Wedding Toran Banner"
            className="w-full h-auto object-cover object-top block"
          />
        </div>

        {/* LEFT MADHUBANI CURTAIN */}
        <div
          className={`absolute top-0 bottom-0 left-0 w-1/2 z-20 flex justify-end transition-transform duration-[1700ms] cubic-bezier(0.77, 0, 0.175, 1) ${
            isOpen ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <picture className="w-full h-full block">
            <source media="(min-width: 768px)" srcSet="/assets/madhubani/desktop_curtain_left.png" />
            <img
              src="/assets/madhubani/curtain_left.png"
              alt="Left Madhubani Royal Curtain"
              className="h-full w-full object-cover md:object-fill object-right select-none pointer-events-none"
              style={{
                filter: 'drop-shadow(10px 0 25px rgba(0, 0, 0, 0.8))'
              }}
            />
          </picture>
        </div>

        {/* RIGHT MADHUBANI CURTAIN */}
        <div
          className={`absolute top-0 bottom-0 right-0 w-1/2 z-20 flex justify-start transition-transform duration-[1700ms] cubic-bezier(0.77, 0, 0.175, 1) ${
            isOpen ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          <picture className="w-full h-full block">
            <source media="(min-width: 768px)" srcSet="/assets/madhubani/desktop_curtain_right.png" />
            <img
              src="/assets/madhubani/curtain_right_open.png"
              alt="Right Madhubani Royal Curtain"
              className="h-full w-full object-cover md:object-fill object-left select-none pointer-events-none"
              style={{
                filter: 'drop-shadow(-10px 0 25px rgba(0, 0, 0, 0.8))'
              }}
            />
          </picture>
        </div>

        {/* BOTTOM CENTER INTERACTIVE BUTTON (Click to Open) */}
        {!isOpen && (
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

      {/* Floating Button to Re-close Curtains anytime */}
      {isOpen && (
        <ShaadiButton
          variant="floating"
          onClick={handleToggleBack}
          iconLeft="🎪"
          className="fixed bottom-12 right-4 z-40 px-3 py-2"
          title="Re-draw Curtains"
        >
          CLOSE CURTAINS
        </ShaadiButton>
      )}
    </>
  );
}
