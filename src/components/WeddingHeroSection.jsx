import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton } from './ui';
import { useTheme } from '../context/ThemeContext';
import { WEDDING_CONFIG } from '../config/weddingConfig';
import ThemeSwitcher from './ThemeSwitcher';

export default function WeddingHeroSection() {
  const { themeConfig } = useTheme();

  const [samagriCount, setSamagriCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [ganeshBlessingActive, setGaneshBlessingActive] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState(null);
  const [roaringElephant, setRoaringElephant] = useState(null);
  const toastTimeoutRef = useRef(null);
  const ganeshTimerRef = useRef(null);
  const activeCharTimerRef = useRef(null);
  const elephantRoarTimerRef = useRef(null);

  const handleCharacterTap = (charId, soundCallback) => {
    if (soundCallback) soundCallback();
    setActiveCharacter((prev) => (prev === charId ? null : charId));

    if (activeCharTimerRef.current) {
      clearTimeout(activeCharTimerRef.current);
    }
    // Auto-dismiss banner 3 seconds after tapping on mobile
    activeCharTimerRef.current = setTimeout(() => {
      setActiveCharacter(null);
    }, 3000);
  };

  const handleElephantRoar = (side) => {
    shaadiAudio.playElephantTrumpet();
    setRoaringElephant(side);

    if (elephantRoarTimerRef.current) {
      clearTimeout(elephantRoarTimerRef.current);
    }
    elephantRoarTimerRef.current = setTimeout(() => {
      setRoaringElephant(null);
    }, 1300);

    // Auspicious celebratory sparks bursting upwards from the trunk!
    const originX = side === 'left' ? 0.12 : 0.88;
    confetti({
      particleCount: 35,
      spread: 60,
      startVelocity: 26,
      origin: { x: originX, y: 0.82 },
      colors: ['#FFD700', '#FFA500', '#FF4500', '#FFF8DC'],
    });

    setToastMessage(
      side === 'left'
        ? '🐘 TRUUUUMP! Vadhu Paksh Gajraj roars auspicious wedding blessings! 🪔✨'
        : '🐘 TRUUUUMP! Baraat Gajraj trumpets royal festive joy! 🪔✨'
    );
    setToastVisible(true);
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2500);
  };

  const handleOfferSamagri = () => {
    shaadiAudio.playPop();
    shaadiAudio.playShehnaiNote(659, 0.25);
    setSamagriCount((prev) => prev + 1);

    // Festive sparks from holy hawan fire
    confetti({
      particleCount: 35,
      spread: 60,
      startVelocity: 25,
      origin: { y: 0.72 },
      colors: ['#FF4500', '#FFD700', '#FFA500', '#FF8C00', '#851E18'],
    });

    const blessings = [
      '🕉️ “SWAHA! May your plate always be full of Paneer!”',
      '🪔 “Aahuti Accepted! May WhatsApp family groups be silent!”',
      '🔥 “Pavitra Agni Blessed! Shubh Vivah Sampann!”',
      '✨ “Swaha! Unlimited Gulab Jamuns granted!”',
      '🌺 “100% Auntie Approval Confirmed!”',
    ];
    setToastMessage(blessings[samagriCount % blessings.length]);
    setToastVisible(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  const handleGaneshBlessing = () => {
    shaadiAudio.playPop();
    shaadiAudio.playShehnaiNote(784, 0.45);

    // Divine golden sparkles showering down from Ganesha's niche
    confetti({
      particleCount: 50,
      spread: 75,
      startVelocity: 22,
      origin: { x: 0.5, y: 0.25 },
      colors: ['#FFD700', '#FFA500', '#FFE4B5', '#FFF8DC', '#FF6347'],
    });

    setGaneshBlessingActive(true);

    if (ganeshTimerRef.current) {
      clearTimeout(ganeshTimerRef.current);
    }
    ganeshTimerRef.current = setTimeout(() => {
      setGaneshBlessingActive(false);
    }, 2000);

    // Also display blessing message in top toaster
    setToastMessage(`🐘 || ॐ गं गणपतये नमः || Lord Ganesha showers divine blessings upon ${WEDDING_CONFIG.bride.displayName} & ${WEDDING_CONFIG.groom.displayName}! ✨`);
    setToastVisible(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      setToastVisible(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      if (ganeshTimerRef.current) {
        clearTimeout(ganeshTimerRef.current);
      }
      if (activeCharTimerRef.current) {
        clearTimeout(activeCharTimerRef.current);
      }
      if (elephantRoarTimerRef.current) {
        clearTimeout(elephantRoarTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      id="opening"
      className={`relative h-screen min-h-[580px] flex flex-col justify-end items-center overflow-hidden select-none transition-colors duration-500 ${themeConfig.bgClass}`}
    >
      {/* FLOATING THEME PALETTE SWITCHER (Commented out per request - uncomment anytime for live client demos) */}
      {/* <ThemeSwitcher /> */}

      {/* Auspicious Hawan Blessing Toaster (Top Center - visible for 2 seconds) */}
      <div
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ease-out pointer-events-none max-w-[90vw] ${
          toastVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-95'
        }`}
      >
        <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-red-950 font-poppins font-semibold text-[11px] sm:text-sm md:text-base py-2 px-4 sm:px-7 rounded-xl sm:rounded-full border-2 border-red-900 shadow-[0_12px_30px_rgba(0,0,0,0.85)] flex items-center justify-center gap-2 text-center whitespace-normal sm:whitespace-nowrap">
          {toastMessage}
        </div>
      </div>

      {/* Decorative Ornate Background Wallpaper Texture & Ambient Glow */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${themeConfig.dotOpacity}`}
        style={{
          backgroundImage: `radial-gradient(${themeConfig.dotColor} 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px',
        }}
      />
      
      {/* Warm Mandap Radial Lighting */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${themeConfig.glowClass}`}
      />

      {/* AUTHENTIC MADHUBANI ORNATE BORDER FRAME */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {/* Top Border Strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[20px] sm:h-[24px] md:h-[28px]"
          style={{
            backgroundImage: "url('/assets/madhubani/border.jpeg')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
          }}
        />

        {/* Bottom Border Strip */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[20px] sm:h-[24px] md:h-[28px]"
          style={{
            backgroundImage: "url('/assets/madhubani/border.jpeg')",
            backgroundRepeat: 'repeat-x',
            backgroundSize: 'auto 100%',
            transform: 'scaleY(-1)',
          }}
        />

        {/* Left Border Strip */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[20px] sm:w-[24px] md:w-[28px]"
          style={{
            backgroundImage: "url('/assets/madhubani/border-vertical.jpg')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
          }}
        />

        {/* Right Border Strip */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[20px] sm:w-[24px] md:w-[28px]"
          style={{
            backgroundImage: "url('/assets/madhubani/border-vertical.jpg')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            transform: 'scaleX(-1)',
          }}
        />

        {/* 4 Corner Lotus Blocks */}
        <img
          src="/assets/madhubani/corner-piece.png"
          alt="Border Corner"
          className="absolute top-0 left-0 w-[20px] sm:w-[24px] md:w-[28px] h-[20px] sm:h-[24px] md:h-[28px] object-contain select-none z-35"
        />
        <img
          src="/assets/madhubani/corner-piece.png"
          alt="Border Corner"
          className="absolute top-0 right-0 w-[20px] sm:w-[24px] md:w-[28px] h-[20px] sm:h-[24px] md:h-[28px] object-contain select-none z-35 scale-x-[-1]"
        />
        <img
          src="/assets/madhubani/corner-piece.png"
          alt="Border Corner"
          className="absolute bottom-0 left-0 w-[20px] sm:w-[24px] md:w-[28px] h-[20px] sm:h-[24px] md:h-[28px] object-contain select-none z-35 scale-y-[-1]"
        />
        <img
          src="/assets/madhubani/corner-piece.png"
          alt="Border Corner"
          className="absolute bottom-0 right-0 w-[20px] sm:w-[24px] md:w-[28px] h-[20px] sm:h-[24px] md:h-[28px] object-contain select-none z-35 scale-x-[-1] scale-y-[-1]"
        />
      </div>

      {/* SECTION HEADER: Royal Title & Auspicious Invocation with Dynamic Theme Styling */}
      <div className="absolute top-[26px] sm:top-[28px] md:top-[32px] left-1/2 -translate-x-1/2 z-25 text-center max-w-5xl mx-auto space-y-0.5 sm:space-y-1 px-4 pointer-events-none select-none">
        <div className={`inline-flex items-center gap-2 px-3.5 py-0.5 rounded-full shadow-lg font-poppins text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest drop-shadow transition-colors duration-500 ${themeConfig.badgeClass}`}>
          <span>🪔</span>
          <span>{WEDDING_CONFIG.invocation}</span>
          <span>🪔</span>
        </div>

        <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-shrikhand tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] whitespace-nowrap flex items-center justify-center gap-2 sm:gap-3.5 mt-0.5 sm:mt-1 transition-all duration-500 ${themeConfig.titleColor}`}>
          <span>{WEDDING_CONFIG.bride.fullName}</span>
          <span className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl inline-block ${themeConfig.heartColor}`}>❤️</span>
          <span>{WEDDING_CONFIG.groom.fullName}</span>
        </h1>
      </div>

      {/* CENTERPIECE: THE FULL MADHUBANI WEDDING STAGE SCENE */}
      <div className="relative z-10 w-full h-full flex items-end justify-center">
        
        {/* --- MADHUBANI FOLK ART TAPESTRY: CHARACTERS SCATTERED ACROSS CANVAS --- */}

        {/* 1. Left Royal Elephant (Bottom-Left Anchor) */}
        <div
          className={`hidden lg:flex flex-col items-center absolute left-[1.8%] xl:left-[2.2%] bottom-[1.5%] xl:bottom-[4%] group cursor-pointer hover:z-50 transition-transform ${
            activeCharacter === 'left_elephant' ? 'z-50' : 'z-25'
          } ${
            roaringElephant === 'left' ? 'animate-elephant-roar-left' : 'hover:scale-105'
          }`}
          onClick={() => {
            handleElephantRoar('left');
            handleCharacterTap('left_elephant');
          }}
          title="Royal Gajraj (Elephant) - Click to hear and watch the elephant trumpet and roar!"
        >
          <img
            src="/assets/madhubani/left_elephant.png"
            alt="Royal Gajraj Left"
            className="max-h-[24vh] xl:max-h-[25.5vh] h-auto w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)] filter hover:brightness-110 transition-all select-none"
          />
          <span className={`font-rozha text-[10px] tracking-wider mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 pointer-events-none relative z-50 ${themeConfig.charBadgeClass} ${
            activeCharacter === 'left_elephant'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            🐘 Shubh Gajraj (Click to Roar!)
          </span>
        </div>

        {/* 2. Auspicious Kalash Lady (Upper-Left High Flank) */}
        <div
          className={`hidden lg:flex flex-col items-center absolute left-[2.8%] xl:left-[3.8%] top-[5.5%] xl:top-[6.5%] group cursor-pointer hover:scale-105 hover:z-50 transition-all -rotate-2 ${
            activeCharacter === 'kalash_lady' ? 'z-50' : 'z-15'
          }`}
          onClick={() => handleCharacterTap('kalash_lady', () => shaadiAudio.playPop())}
          title="Shubh Kalash Welcome"
        >
          <div className="relative animate-namaste" style={{ animationDelay: '0.3s' }}>
            <img
              src="/assets/madhubani/women-with-kalash.png"
              alt="Kalash Welcome Lady"
              className="max-h-[24.5vh] xl:max-h-[27vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all scale-x-[-1]"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
              activeCharacter === 'kalash_lady'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              🏺 Shubh Kalash!
            </div>
          </div>
          <span className={`font-rozha text-[10px] tracking-wider mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 pointer-events-none relative z-50 ${themeConfig.charBadgeClass} ${
            activeCharacter === 'kalash_lady'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Mangal Kalash
          </span>
        </div>

        {/* 3. Aarti Thali Welcome Man (Upper Left Flank - Tucked Beside Roof) */}
        <div
          className={`hidden lg:flex flex-col items-center absolute left-[15%] xl:left-[16.5%] top-[10.5%] xl:top-[11.5%] group cursor-pointer hover:scale-105 hover:z-50 transition-all rotate-3 ${
            activeCharacter === 'aarti_man' ? 'z-50' : 'z-15'
          }`}
          onClick={() => handleCharacterTap('aarti_man', () => shaadiAudio.playPop())}
          title="Aarti Welcome"
        >
          <div className="relative animate-namaste" style={{ animationDelay: '0.6s' }}>
            <img
              src="/assets/madhubani/pooja_thali_man.png"
              alt="Pooja Thali Welcome"
              className="max-h-[22.5vh] xl:max-h-[25vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
              activeCharacter === 'aarti_man'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              🪔 Aarti Swagat!
            </div>
          </div>
          <span className={`font-rozha text-[10px] tracking-wider mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 pointer-events-none relative z-50 ${themeConfig.charBadgeClass} ${
            activeCharacter === 'aarti_man'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Aarti Thali
          </span>
        </div>

        {/* 4. Welcoming Elder (Namaste Uncle - Mid-Left Stepped Outward) */}
        <div
          className={`hidden lg:flex flex-col items-center absolute left-[1.8%] xl:left-[2.8%] top-[37.5%] xl:top-[38.5%] group cursor-pointer hover:scale-105 hover:z-50 transition-all rotate-1 ${
            activeCharacter === 'namaste_uncle' ? 'z-50' : 'z-15'
          }`}
          onClick={() => handleCharacterTap('namaste_uncle', () => shaadiAudio.playPop())}
          title="Welcoming Elder"
        >
          <div className="relative animate-namaste" style={{ animationDelay: '0.9s' }}>
            <img
              src="/assets/madhubani/namanste_man.png"
              alt="Namaste Uncle"
              className="max-h-[24.5vh] xl:max-h-[27vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
              activeCharacter === 'namaste_uncle'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              🙏 Swagatam!
            </div>
          </div>
          <span className={`font-rozha text-[10px] tracking-wider mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 pointer-events-none relative z-50 ${themeConfig.charBadgeClass} ${
            activeCharacter === 'namaste_uncle'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Kanyadaan Paksh
          </span>
        </div>

        {/* 5. Swagat Lady (Lower-Mid Flank - Tucked Inward Beside Pillar) */}
        <div
          className={`hidden lg:flex flex-col items-center absolute left-[13.5%] xl:left-[15%] top-[39%] xl:top-[40%] group cursor-pointer hover:scale-105 hover:z-50 transition-all -rotate-3 ${
            activeCharacter === 'swagat_lady' ? 'z-50' : 'z-15'
          }`}
          onClick={() => handleCharacterTap('swagat_lady', () => shaadiAudio.playPop())}
          title="Swagat Lady"
        >
          <div className="relative animate-namaste">
            <img
              src="/assets/madhubani/clapping_lady.png"
              alt="Swagat Lady"
              className="max-h-[24vh] xl:max-h-[26.5vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all scale-x-[-1]"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
              activeCharacter === 'swagat_lady'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              🌺 Padhariye!
            </div>
          </div>
          <span className={`font-rozha text-[10px] tracking-wider mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 pointer-events-none relative z-50 ${themeConfig.charBadgeClass} ${
            activeCharacter === 'swagat_lady'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Vadhu Swagat
          </span>
        </div>

        {/* --- CENTER: THE ROYAL MANDAP & FIRE PAVILION --- */}
        <div className="relative flex flex-col items-center justify-end h-full max-h-[83%] w-auto aspect-[3373/3426] z-20 pb-0">
          
          {/* Mandap Structure (Transparent PNG) */}
          <div className="relative w-full h-full flex flex-col items-center justify-end">
            <img
              src="/assets/madhubani/mandap.png"
              alt="Royal Vedic Wedding Mandap"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.95)] select-none pointer-events-none"
            />

            {/* Lord Ganesha seated in the upper decorative medallion niche */}
            <div
              className="absolute top-[23%] left-1/2 -translate-x-1/2 z-25 w-[9%] cursor-pointer group hover:scale-110 transition-transform duration-300"
              onClick={handleGaneshBlessing}
              title="|| ॐ गं गणपतये नमः || Click for auspicious Ganesha blessings!"
            >
              {/* Pulsing divine aura halo ring when blessing is active */}
              {ganeshBlessingActive && (
                <div className="absolute inset-0 -m-3 sm:-m-4 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 rounded-full blur-md animate-ping pointer-events-none" />
              )}
              <img
                src="/assets/madhubani/ganesh.png"
                alt="Lord Ganesha"
                className={`w-full h-auto object-contain transition-all duration-300 ${
                  ganeshBlessingActive
                    ? 'drop-shadow-[0_0_24px_rgba(255,215,0,1)] scale-110 brightness-115'
                    : 'drop-shadow-[0_4px_12px_rgba(255,215,0,0.5)]'
                }`}
              />
            </div>

            {/* DIVINE BLESSING RAY: Radiant God Rays streaming down over Bride & Groom */}
            <div
              className={`absolute top-[28%] bottom-[7.2%] left-[18%] right-[18%] pointer-events-none z-22 transition-all duration-500 ease-out ${
                ganeshBlessingActive
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              {/* Luminous SVG God Rays with Golden Shimmer */}
              <svg
                className="w-full h-full"
                viewBox="0 0 1000 600"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Origin golden glow */}
                  <radialGradient id="divineOriginGlow" cx="50%" cy="0%" r="50%">
                    <stop offset="0%" stopColor="#FFFFF0" stopOpacity="0.95" />
                    <stop offset="25%" stopColor="#FFD700" stopOpacity="0.75" />
                    <stop offset="60%" stopColor="#FFA500" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
                  </radialGradient>

                  {/* Central ray gradient */}
                  <linearGradient id="rayCenter" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="20%" stopColor="#FFD700" stopOpacity="0.7" />
                    <stop offset="60%" stopColor="#FFA500" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                  </linearGradient>

                  {/* Left ray gradient (shining on Megan) */}
                  <linearGradient id="rayLeft" x1="50%" y1="0%" x2="28%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFF5" stopOpacity="0.95" />
                    <stop offset="25%" stopColor="#FFDF00" stopOpacity="0.75" />
                    <stop offset="65%" stopColor="#FFA500" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
                  </linearGradient>

                  {/* Right ray gradient (shining on Brad) */}
                  <linearGradient id="rayRight" x1="50%" y1="0%" x2="72%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFF5" stopOpacity="0.95" />
                    <stop offset="25%" stopColor="#FFDF00" stopOpacity="0.75" />
                    <stop offset="65%" stopColor="#FFA500" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
                  </linearGradient>

                  {/* Ray blur filter for divine heavenly glow */}
                  <filter id="divineRayBlur" x="-10%" y="-10%" width="120%" height="120%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Broad heavenly light cone */}
                <polygon points="500,0 40,600 960,600" fill="url(#divineOriginGlow)" />

                {/* God-ray beams fanning directly over Bride & Groom */}
                <g filter="url(#divineRayBlur)">
                  {/* Ray 1: Leftward sweep */}
                  <polygon points="500,0 80,600 220,600" fill="url(#rayLeft)" opacity="0.8" />
                  
                  {/* Ray 2: Directly over Bride Megan */}
                  <polygon points="500,0 240,600 420,600" fill="url(#rayLeft)" opacity="0.95" />
                  
                  {/* Ray 3: Center shaft over Hawan Kund */}
                  <polygon points="500,0 450,600 550,600" fill="url(#rayCenter)" opacity="0.9" />
                  
                  {/* Ray 4: Directly over Groom Brad */}
                  <polygon points="500,0 700,600 880,600" fill="url(#rayRight)" opacity="0.95" />
                  
                  {/* Ray 5: Rightward sweep */}
                  <polygon points="500,0 870,600 970,600" fill="url(#rayRight)" opacity="0.8" />
                </g>
              </svg>

              {/* Auspicious Divine Text & Sparkles hovering directly in the open arch above the couple */}
              <div className="absolute top-[28%] sm:top-[28.5%] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none whitespace-nowrap z-30">
                <div className={`${themeConfig.blessingCardBg || 'bg-gradient-to-b from-[#3a000a] via-[#4d000f] to-[#250006]'} px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 rounded-xl border border-amber-400/90 shadow-[0_6px_20px_rgba(0,0,0,0.85)] flex flex-col items-center gap-0.5 sm:gap-1 backdrop-blur-md`}>
                  {/* Top line: Traditional Sacred Sanskrit Header (Shrikhand) */}
                  <div className="text-amber-300 text-xs sm:text-sm md:text-base font-shrikhand tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,1)] flex items-center gap-1.5">
                    <span className="text-amber-400 text-[10px] sm:text-xs animate-spin" style={{ animationDuration: '4s' }}>✨</span>
                    <span className="text-yellow-300">॥ दिव्य आशीर्वाद ॥</span>
                    <span className="text-amber-400 text-[10px] sm:text-xs animate-spin" style={{ animationDuration: '4s' }}>✨</span>
                  </div>
                  
                  {/* Ornate Golden Filigree Divider with Center Diamond */}
                  <div className="w-full flex items-center justify-center gap-1 opacity-70">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-amber-300" />
                    <span className="text-amber-400 text-[7px]">✦</span>
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-amber-400 to-amber-300" />
                  </div>

                  {/* Subtitle: English Blessing Text (Poppins) */}
                  <div className="text-[9px] sm:text-[10px] md:text-[11px] text-amber-100 font-poppins tracking-wider drop-shadow-[0_1px_3px_rgba(0,0,0,1)] flex items-center gap-1">
                    <span className="text-[9px] sm:text-[10px]">🌺</span>
                    <span className="text-amber-100 font-medium">Vighnaharta Ganesha Blesses {WEDDING_CONFIG.bride.displayName} & {WEDDING_CONFIG.groom.displayName}</span>
                    <span className="text-[9px] sm:text-[10px]">🌺</span>
                  </div>
                </div>
              </div>

              {/* Shimmering sacred motes drifting along the light */}
              <div className="absolute top-[24%] left-[18%] text-amber-200 text-xs sm:text-sm animate-bounce" style={{ animationDuration: '1s' }}>✨</div>
              <div className="absolute top-[32%] left-[28%] text-amber-300 text-[10px] sm:text-xs animate-pulse">🌟</div>
              <div className="absolute top-[24%] right-[18%] text-amber-200 text-xs sm:text-sm animate-bounce" style={{ animationDuration: '1.2s' }}>✨</div>
              <div className="absolute top-[32%] right-[28%] text-amber-300 text-[10px] sm:text-xs animate-pulse">🌟</div>
              <div className="absolute top-[8%] left-1/2 -translate-x-1/2 text-amber-300 text-sm sm:text-base animate-ping" style={{ animationDuration: '2s' }}>🕉️</div>
            </div>

            {/* INSIDE THE ARCH: Hawan Kund directly centered below Ganesha, flanked by Bride (Left) and Groom (Right) */}
            <div className="absolute bottom-[7.2%] left-[20%] right-[18%] h-[40%] pointer-events-none z-30">
              
              {/* 1. Sacred Hawan Fire - DIRECTLY CENTERED BELOW GANESH */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-full flex flex-col items-center justify-end hover:z-50 group cursor-pointer pointer-events-auto transition-all ${
                  activeCharacter === 'hawan' ? 'z-50' : 'z-30'
                }`}
                onClick={() => handleCharacterTap('hawan', handleOfferSamagri)}
              >
                {/* Hawan Kund Image with animated fire glow - sits firmly on stage floor */}
                <img
                  src="/assets/madhubani/madhubani-havan.png"
                  alt="Sacred Hawan Kund"
                  title="Click to offer sacred Samagri into Agni Kund!"
                  className={`h-[54%] sm:h-[57%] max-h-[170px] md:max-h-[195px] w-auto object-contain animate-flame filter group-hover:scale-105 active:scale-95 transition-all duration-300 ${
                    ganeshBlessingActive
                      ? 'drop-shadow-[0_0_25px_rgba(255,215,0,0.9)] brightness-115'
                      : 'drop-shadow-[0_4px_12px_rgba(255,140,0,0.6)]'
                  }`}
                />

                {/* Swaha Action Pill placed on the platform beam in line with name badges */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOfferSamagri();
                  }}
                  title="Click to offer sacred Samagri into Agni Kund!"
                  className={`absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-red-950 font-poppins font-bold text-[8px] sm:text-[10px] md:text-[11px] px-2.5 sm:px-3 py-0.5 rounded-full border-2 border-red-900 shadow-xl whitespace-nowrap cursor-pointer hover:shadow-amber-400/50 transition-all duration-300 z-50 pointer-events-none ${
                    activeCharacter === 'hawan'
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
                  }`}
                >
                  🔥 SWAHA (+{samagriCount})
                </button>
              </div>

              {/* 2. Bride with Varmala - Highest Z-Index Prominence */}
              <div
                className={`absolute bottom-0 right-[62.5%] sm:right-[63.5%] md:right-[64%] h-full flex flex-col items-center justify-end hover:z-50 group cursor-pointer pointer-events-auto transition-all ${
                  activeCharacter === 'bride' ? 'z-50' : 'z-35'
                }`}
                onClick={() => handleCharacterTap('bride', () => shaadiAudio.playPop())}
              >
                <div className="relative h-[84%] sm:h-[86%] flex items-end justify-center">
                  <div className={`absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
                    activeCharacter === 'bride'
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                  }`}>
                    👰 {WEDDING_CONFIG.bride.shortName}
                  </div>
                  <img
                    src="/assets/madhubani/bride.png"
                    alt={`Bride ${WEDDING_CONFIG.bride.displayName}`}
                    className={`h-full w-auto object-contain filter scale-x-[-1] group-hover:scale-x-[-1] group-hover:scale-105 transition-all duration-300 ${
                      ganeshBlessingActive
                        ? 'drop-shadow-[0_0_20px_rgba(255,215,0,0.9)] brightness-110'
                        : 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]'
                    }`}
                  />
                </div>
              </div>

              {/* 3. Groom with Varmala & Sherwani - Highest Z-Index Prominence */}
              <div
                className={`absolute bottom-0 left-[71.5%] sm:left-[72%] md:left-[72.5%] h-full flex flex-col items-center justify-end hover:z-50 group cursor-pointer pointer-events-auto transition-all ${
                  activeCharacter === 'groom' ? 'z-50' : 'z-35'
                }`}
                onClick={() => handleCharacterTap('groom', () => shaadiAudio.playPop())}
              >
                <div className="relative h-[84%] sm:h-[86%] flex items-end justify-center">
                  <div className={`absolute -top-5 sm:-top-6 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] sm:text-[10px] px-2.5 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
                    activeCharacter === 'groom'
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                  }`}>
                    🤵 {WEDDING_CONFIG.groom.shortName}
                  </div>
                  <img
                    src="/assets/madhubani/groom.png"
                    alt={`Groom ${WEDDING_CONFIG.groom.displayName}`}
                    className={`h-full w-auto object-contain filter scale-x-[-1] group-hover:scale-x-[-1] group-hover:scale-105 transition-all duration-300 ${
                      ganeshBlessingActive
                        ? 'drop-shadow-[0_0_20px_rgba(255,215,0,0.9)] brightness-110'
                        : 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]'
                    }`}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 6. Shehnai Vaadan Player (Upper Roof Flank - Tucked Inward) */}
        <div
          className={`hidden lg:flex flex-col items-center absolute right-[15%] xl:right-[16.5%] top-[10.5%] xl:top-[11.5%] group cursor-pointer hover:scale-105 hover:z-50 transition-all -rotate-6 ${
            activeCharacter === 'shehnai_man' ? 'z-50' : 'z-15'
          }`}
          onClick={() => handleCharacterTap('shehnai_man', () => shaadiAudio.playShehnaiNote(587, 0.5))}
          title="Shehnai Vaadan"
        >
          <div className="relative animate-namaste" style={{ animationDelay: '0.8s' }}>
            <img
              src="/assets/madhubani/shenai-man.png"
              alt="Shehnai Player"
              className="max-h-[22.5vh] xl:max-h-[25vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all scale-x-[-1]"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
              activeCharacter === 'shehnai_man'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              🎶 Mangal Dhun!
            </div>
          </div>
          <span className={`font-rozha text-[10px] tracking-wider mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 pointer-events-none relative z-50 ${themeConfig.charBadgeClass} ${
            activeCharacter === 'shehnai_man'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Shehnai Vaadan
          </span>
        </div>

        {/* 7. Dholak Drummer (Upper-Right High Flank) */}
        <div
          className={`hidden lg:flex flex-col items-center absolute right-[2.8%] xl:right-[3.8%] top-[5%] xl:top-[6%] group cursor-pointer hover:scale-105 hover:z-50 transition-all rotate-3 ${
            activeCharacter === 'dhol_man' ? 'z-50' : 'z-15'
          }`}
          onClick={() => handleCharacterTap('dhol_man', () => shaadiAudio.playDhol())}
          title="Baraat Dholak"
        >
          <div className="relative animate-namaste" style={{ animationDelay: '0.4s' }}>
            <img
              src="/assets/madhubani/dhol-man.png"
              alt="Dholak Drummer"
              className="max-h-[24vh] xl:max-h-[26.5vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
              activeCharacter === 'dhol_man'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              🥁 Dhol Tashan!
            </div>
          </div>
          <span className={`font-rozha text-[10px] tracking-wider mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 pointer-events-none relative z-50 ${themeConfig.charBadgeClass} ${
            activeCharacter === 'dhol_man'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Baraat Dholak
          </span>
        </div>

        {/* 8. Dancing Baraati (Mid-Right Stepped Inward to the Left) */}
        <div
          className={`hidden lg:flex flex-col items-center absolute right-[5%] xl:right-[6%] top-[36%] xl:top-[37%] group cursor-pointer hover:scale-105 hover:z-50 transition-all rotate-4 ${
            activeCharacter === 'dancing_baraati' ? 'z-50' : 'z-15'
          }`}
          onClick={() => handleCharacterTap('dancing_baraati', () => shaadiAudio.playPop())}
          title="Dancing Baraati"
        >
          <div className="relative animate-namaste" style={{ animationDelay: '1.2s' }}>
            <img
              src="/assets/madhubani/hands_up_dancing_man.png"
              alt="Baraati Dancing"
              className="max-h-[24.5vh] xl:max-h-[27vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
              activeCharacter === 'dancing_baraati'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              💃 Shava Shava!
            </div>
          </div>
          <span className={`font-rozha text-[10px] tracking-wider mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 pointer-events-none relative z-50 ${themeConfig.charBadgeClass} ${
            activeCharacter === 'dancing_baraati'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Baraat Dhol
          </span>
        </div>

        {/* 9. Joyful Dancing Lady / Ghoomar Girl (Lower-Mid Right Flank) */}
        <div
          className={`hidden lg:flex flex-col items-center absolute right-[14%] xl:right-[15.5%] top-[39%] xl:top-[40%] group cursor-pointer hover:scale-105 hover:z-50 transition-all -rotate-3 ${
            activeCharacter === 'dancing_lady' ? 'z-50' : 'z-15'
          }`}
          onClick={() => handleCharacterTap('dancing_lady', () => shaadiAudio.playPop())}
          title="Sangeet Nritya"
        >
          <div className="relative animate-namaste" style={{ animationDelay: '1.5s' }}>
            <img
              src="/assets/madhubani/dancing-women.png"
              alt="Dancing Lady"
              className="max-h-[24vh] xl:max-h-[26.5vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all scale-x-[-1]"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${
              activeCharacter === 'dancing_lady'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              💃 Ghoomar!
            </div>
          </div>
          <span className={`font-rozha text-[10px] tracking-wider mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 pointer-events-none relative z-50 ${themeConfig.charBadgeClass} ${
            activeCharacter === 'dancing_lady'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Sangeet Nritya
          </span>
        </div>

        {/* 10. Right Royal Elephant (Bottom-Right Anchor) */}
        <div
          className={`hidden lg:flex flex-col items-center absolute right-[1.8%] xl:right-[2.2%] bottom-[1.5%] xl:bottom-[4%] group cursor-pointer hover:z-50 transition-transform ${
            activeCharacter === 'right_elephant' ? 'z-50' : 'z-25'
          } ${
            roaringElephant === 'right' ? 'animate-elephant-roar-right' : 'hover:scale-105'
          }`}
          onClick={() => {
            handleElephantRoar('right');
            handleCharacterTap('right_elephant');
          }}
          title="Royal Gajraj (Elephant) - Click to hear and watch the elephant trumpet and roar!"
        >
          <img
            src="/assets/madhubani/right_elephant.png"
            alt="Royal Gajraj Right"
            className="max-h-[24vh] xl:max-h-[25.5vh] h-auto w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)] filter hover:brightness-110 transition-all select-none"
          />
          <span className={`font-rozha text-[10px] tracking-wider mt-0.5 px-1.5 py-0.5 rounded whitespace-nowrap transition-all duration-300 pointer-events-none relative z-50 ${themeConfig.charBadgeClass} ${
            activeCharacter === 'right_elephant'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            🐘 Shubh Gajraj (Click to Roar!)
          </span>
        </div>

      </div>
    </section>
  );
}
