import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton } from './ui';

export default function WeddingHeroSection() {
  const [samagriCount, setSamagriCount] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [ganeshBlessingActive, setGaneshBlessingActive] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState(null);
  const toastTimeoutRef = useRef(null);
  const ganeshTimerRef = useRef(null);
  const activeCharTimerRef = useRef(null);

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
    setToastMessage('🐘 || ॐ गं गणपतये नमः || Lord Ganesha showers divine blessings upon Megan & Brad! ✨');
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
    };
  }, []);

  return (
    <section
      id="opening"
      className="relative h-screen min-h-[580px] max-h-screen bg-gradient-to-b from-red-950 via-[#701015] to-red-950 flex flex-col justify-between items-center px-3 sm:px-6 pt-3 pb-3 overflow-hidden select-none"
    >
      {/* Auspicious Hawan Blessing Toaster (Top Center - visible for 2 seconds) */}
      <div
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ease-out pointer-events-none max-w-[90vw] ${
          toastVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-4 scale-95'
        }`}
      >
        <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-red-950 font-pixel text-[11px] sm:text-sm md:text-base py-2 px-4 sm:px-7 rounded-xl sm:rounded-full border-2 border-red-900 shadow-[0_12px_30px_rgba(0,0,0,0.85)] flex items-center justify-center gap-2 text-center whitespace-normal sm:whitespace-nowrap">
          {toastMessage}
        </div>
      </div>
      {/* Decorative Ornate Background Wallpaper Texture & Ambient Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Warm Mandap Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* SECTION HEADER: Royal Title & Auspicious Invocation */}
      <div className="relative z-10 text-center max-w-5xl mx-auto space-y-0.5 sm:space-y-1 shrink-0 px-2">
        <div className="inline-flex items-center gap-2 bg-red-900/90 border-2 border-amber-400/80 px-3 py-0.5 rounded-full shadow-lg text-amber-300 font-pixel text-xs sm:text-sm tracking-wider">
          <span>🪔</span>
          <span>|| ॐ श्री गणेशाय नमः ||</span>
          <span>🪔</span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-yatra gold-gradient-text tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] whitespace-nowrap flex items-center justify-center gap-2 sm:gap-4 mt-0.5">
          <span>MEGAN FOX</span>
          <span className="text-red-500 text-xl sm:text-2xl md:text-3xl inline-block animate-pulse">❤️</span>
          <span>BRAD PITT</span>
        </h1>
      </div>

      {/* CENTERPIECE: THE FULL MADHUBANI WEDDING STAGE SCENE */}
      <div className="relative z-10 w-full max-w-[98vw] xl:max-w-7xl mx-auto flex-1 min-h-0 flex items-center justify-center py-1">
        
        {/* --- MADHUBANI FOLK ART TAPESTRY: CHARACTERS SCATTERED ACROSS FULL CANVAS --- */}

        {/* 1. Left Royal Elephant */}
        <div
          className="hidden md:flex flex-col items-center absolute left-0.5 xl:left-2 bottom-1 z-10 group cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleCharacterTap('left_elephant', () => shaadiAudio.playShehnaiNote(440, 0.4))}
          title="Royal Gajraj (Elephant) - Click for trumpet!"
        >
          <img
            src="/assets/madhubani/left_elephant.png"
            alt="Royal Gajraj Left"
            className="max-h-[22vh] xl:max-h-[25vh] h-auto w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)] filter hover:brightness-110 transition-all"
          />
          <span className={`text-amber-400 font-rozha text-[10px] tracking-wider mt-0.5 bg-red-950/85 px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap transition-all duration-300 pointer-events-none ${
            activeCharacter === 'left_elephant'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            🐘 Shubh Gajraj
          </span>
        </div>

        {/* 2. Welcoming Elder (Namaste Uncle) */}
        <div
          className="hidden lg:flex flex-col items-center absolute left-[1%] xl:left-[2.5%] top-[4%] z-15 group cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleCharacterTap('namaste_uncle', () => shaadiAudio.playPop())}
          title="Welcoming Elder"
        >
          <div className="relative animate-namaste" style={{ animationDelay: '0.9s' }}>
            <img
              src="/assets/madhubani/namanste_man.png"
              alt="Namaste Uncle"
              className="max-h-[21vh] xl:max-h-[24vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none ${
              activeCharacter === 'namaste_uncle'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              🙏 Swagatam!
            </div>
          </div>
          <span className={`text-amber-400 font-rozha text-[10px] tracking-wider mt-0.5 bg-red-950/85 px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap transition-all duration-300 pointer-events-none ${
            activeCharacter === 'namaste_uncle'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Kanyadaan Paksh
          </span>
        </div>

        {/* 3. Swagat Lady */}
        <div
          className="hidden md:flex flex-col items-center absolute left-[5%] xl:left-[7%] top-[24%] z-15 group cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleCharacterTap('swagat_lady', () => shaadiAudio.playPop())}
          title="Swagat Lady"
        >
          <div className="relative animate-namaste">
            <img
              src="/assets/madhubani/clapping_lady.png"
              alt="Swagat Lady"
              className="max-h-[23vh] xl:max-h-[26vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all scale-x-[-1]"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none ${
              activeCharacter === 'swagat_lady'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              🌺 Padhariye!
            </div>
          </div>
          <span className={`text-amber-400 font-rozha text-[10px] tracking-wider mt-0.5 bg-red-950/85 px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap transition-all duration-300 pointer-events-none ${
            activeCharacter === 'swagat_lady'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Vadhu Swagat
          </span>
        </div>

        {/* --- CENTER: THE ROYAL MANDAP & FIRE PAVILION --- */}
        <div className="relative flex flex-col items-center justify-center h-full max-h-[76vh] md:max-h-[80vh] w-auto aspect-[3373/3426] z-20">
          
          {/* Mandap Structure (Transparent PNG) */}
          <div className="relative w-full h-full flex flex-col items-center justify-end">
            <img
              src="/assets/madhubani/mandap.png"
              alt="Royal Vedic Wedding Mandap"
              className="w-full h-full object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.95)] select-none pointer-events-none"
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
                  <polygon points="500,0 580,600 760,600" fill="url(#rayRight)" opacity="0.95" />
                  
                  {/* Ray 5: Rightward sweep */}
                  <polygon points="500,0 780,600 920,600" fill="url(#rayRight)" opacity="0.8" />
                </g>
              </svg>

              {/* Auspicious Divine Text & Sparkles hovering directly in the open arch above the couple */}
              <div className="absolute top-[31%] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none whitespace-nowrap z-30">
                <div className="bg-gradient-to-b from-[#3a000a] via-[#4d000f] to-[#250006] px-5 sm:px-7 py-2 sm:py-2.5 rounded-2xl border-2 border-amber-400 shadow-[0_10px_30px_rgba(0,0,0,0.95)] flex flex-col items-center gap-1 backdrop-blur-md">
                  {/* Top line: Traditional Sacred Sanskrit Header */}
                  <div className="text-amber-300 text-sm sm:text-base md:text-lg font-yatra font-bold tracking-widest drop-shadow-[0_2px_6px_rgba(0,0,0,1)] flex items-center gap-2">
                    <span className="text-amber-400 text-xs sm:text-sm animate-spin" style={{ animationDuration: '4s' }}>✨</span>
                    <span className="text-yellow-300">॥ दिव्य आशीर्वाद ॥</span>
                    <span className="text-amber-400 text-xs sm:text-sm animate-spin" style={{ animationDuration: '4s' }}>✨</span>
                  </div>
                  
                  {/* Ornate Golden Filigree Divider with Center Diamond */}
                  <div className="w-full flex items-center justify-center gap-1.5 opacity-80">
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-amber-300" />
                    <span className="text-amber-400 text-[8px]">✦</span>
                    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-amber-400 to-amber-300" />
                  </div>

                  {/* Subtitle: English Blessing Text */}
                  <div className="text-[10px] sm:text-xs md:text-sm text-amber-100 font-yatra tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,1)] flex items-center gap-1.5">
                    <span>🌺</span>
                    <span className="text-amber-100 font-semibold">Vighnaharta Ganesha Blesses Megan & Brad</span>
                    <span>🌺</span>
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

            {/* INSIDE THE ARCH: Bride (Megan), Holy Hawan Fire in Between, Groom (Brad) */}
            <div className="absolute bottom-[7.2%] left-[18%] right-[18%] h-[40%] flex items-end justify-center gap-2 sm:gap-4 md:gap-5 z-15 pointer-events-auto px-1">
              
              {/* 1. Bride (Megan) with Varmala */}
              <div
                className="relative h-full flex flex-col items-center justify-end group cursor-pointer"
                onClick={() => handleCharacterTap('bride', () => shaadiAudio.playPop())}
              >
                <img
                  src="/assets/madhubani/bride.png"
                  alt="Bride Megan"
                  className={`h-[88%] w-auto object-contain filter scale-x-[-1] group-hover:scale-x-[-1] group-hover:scale-105 transition-all duration-300 ${
                    ganeshBlessingActive
                      ? 'drop-shadow-[0_0_20px_rgba(255,215,0,0.9)] brightness-110'
                      : 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]'
                  }`}
                />
                <span className={`absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 bg-red-950/90 text-amber-300 font-yatra text-[8px] sm:text-[10px] md:text-[11px] px-2.5 py-0.5 rounded border border-amber-400/80 shadow whitespace-nowrap z-20 transition-all duration-300 pointer-events-none ${
                  activeCharacter === 'bride'
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                }`}>
                  MEGAN
                </span>
              </div>

              {/* 2. Sacred Hawan Fire in Between Bride & Groom */}
              <div
                className="relative h-full flex flex-col items-center justify-end z-25 group cursor-pointer"
                onClick={() => handleCharacterTap('hawan', handleOfferSamagri)}
              >
                {/* Subtle rising holy smoke wisps */}
                <div className="text-amber-200 text-xs animate-smoke pointer-events-none mb-1">
                  ☁️ 💨
                </div>

                {/* Hawan Kund Image with animated fire glow - sits firmly on stage floor */}
                <img
                  src="/assets/madhubani/madhubani-havan.png"
                  alt="Sacred Hawan Kund"
                  title="Click to offer sacred Samagri into Agni Kund!"
                  className={`h-[55%] sm:h-[58%] max-h-[170px] md:max-h-[195px] w-auto object-contain animate-flame filter group-hover:scale-105 active:scale-95 transition-all duration-300 ${
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
                  className={`absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-red-950 font-pixel font-bold text-[7px] sm:text-[9px] md:text-[10px] px-2.5 sm:px-3 py-0.5 rounded-full border-2 border-red-900 shadow-xl whitespace-nowrap cursor-pointer hover:shadow-amber-400/50 transition-all duration-300 z-20 pointer-events-none ${
                    activeCharacter === 'hawan'
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
                  }`}
                >
                  🔥 SWAHA (+{samagriCount})
                </button>
              </div>

              {/* 3. Groom (Brad) with Varmala & Sherwani */}
              <div
                className="relative h-full flex flex-col items-center justify-end group cursor-pointer"
                onClick={() => handleCharacterTap('groom', () => shaadiAudio.playPop())}
              >
                <img
                  src="/assets/madhubani/groom.png"
                  alt="Groom Brad"
                  className={`h-[88%] w-auto object-contain filter scale-x-[-1] group-hover:scale-x-[-1] group-hover:scale-105 transition-all duration-300 ${
                    ganeshBlessingActive
                      ? 'drop-shadow-[0_0_20px_rgba(255,215,0,0.9)] brightness-110'
                      : 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]'
                  }`}
                />
                <span className={`absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 bg-red-950/90 text-amber-300 font-yatra text-[8px] sm:text-[10px] md:text-[11px] px-2.5 py-0.5 rounded border border-amber-400/80 shadow whitespace-nowrap z-20 transition-all duration-300 pointer-events-none ${
                  activeCharacter === 'groom'
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                }`}>
                  BRAD
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* 4. Dancing Baraati (Upper Right) */}
        <div
          className="hidden lg:flex flex-col items-center absolute right-[1%] xl:right-[2.5%] top-[4%] z-15 group cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleCharacterTap('dancing_baraati', () => shaadiAudio.playPop())}
          title="Dancing Baraati"
        >
          <div className="relative animate-namaste" style={{ animationDelay: '1.2s' }}>
            <img
              src="/assets/madhubani/hands_up_dancing_man.png"
              alt="Baraati Dancing"
              className="max-h-[21vh] xl:max-h-[24vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none ${
              activeCharacter === 'dancing_baraati'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              💃 Shava Shava!
            </div>
          </div>
          <span className={`text-amber-400 font-rozha text-[10px] tracking-wider mt-0.5 bg-red-950/85 px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap transition-all duration-300 pointer-events-none ${
            activeCharacter === 'dancing_baraati'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Baraat Dhol
          </span>
        </div>

        {/* 5. Aarti Thali Welcome Man (Mid Right) */}
        <div
          className="hidden md:flex flex-col items-center absolute right-[5%] xl:right-[7%] top-[24%] z-15 group cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleCharacterTap('aarti_man', () => shaadiAudio.playPop())}
          title="Aarti Welcome"
        >
          <div className="relative animate-namaste" style={{ animationDelay: '0.6s' }}>
            <img
              src="/assets/madhubani/pooja_thali_man.png"
              alt="Pooja Thali Welcome"
              className="max-h-[23vh] xl:max-h-[26vh] h-auto w-auto object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] filter hover:brightness-110 transition-all scale-x-[-1]"
            />
            <div className={`absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-300 text-red-950 font-bold font-pixel text-[9px] px-2 py-0.5 rounded-md border border-red-900 shadow-md whitespace-nowrap transition-all duration-300 pointer-events-none ${
              activeCharacter === 'aarti_man'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
            }`}>
              🪔 Aarti Swagat!
            </div>
          </div>
          <span className={`text-amber-400 font-rozha text-[10px] tracking-wider mt-0.5 bg-red-950/85 px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap transition-all duration-300 pointer-events-none ${
            activeCharacter === 'aarti_man'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            Aarti Thali
          </span>
        </div>

        {/* 6. Right Royal Elephant */}
        <div
          className="hidden md:flex flex-col items-center absolute right-0.5 xl:right-2 bottom-1 z-10 group cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleCharacterTap('right_elephant', () => shaadiAudio.playShehnaiNote(523, 0.4))}
          title="Royal Gajraj (Elephant) - Click for trumpet!"
        >
          <img
            src="/assets/madhubani/right_elephant.png"
            alt="Royal Gajraj Right"
            className="max-h-[22vh] xl:max-h-[25vh] h-auto w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.85)] filter hover:brightness-110 transition-all"
          />
          <span className={`text-amber-400 font-rozha text-[10px] tracking-wider mt-0.5 bg-red-950/85 px-1.5 py-0.5 rounded border border-amber-500/30 whitespace-nowrap transition-all duration-300 pointer-events-none ${
            activeCharacter === 'right_elephant'
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
          }`}>
            🐘 Shubh Gajraj
          </span>
        </div>

      </div>



    </section>
  );
}
