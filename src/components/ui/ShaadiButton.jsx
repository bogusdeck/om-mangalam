import React from 'react';
import { shaadiAudio } from '../../utils/audio';

/**
 * Reusable 90s Shaadi Button Component
 * Supports festive variants, sizes, sound effects, and icons.
 */
export default function ShaadiButton({
  children,
  onClick,
  variant = 'gold',
  size = 'md',
  playSound = true,
  soundType = 'pop',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) return;
    if (playSound) {
      if (soundType === 'pop') shaadiAudio.playPop();
      else if (soundType === 'hit') shaadiAudio.playDramaticHit();
      else if (soundType === 'fanfare') shaadiAudio.playCelebrationFanfare();
    }
    if (onClick) onClick(e);
  };

  const variants = {
    // Primary traditional gold gradient
    gold: 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-red-950 font-yatra border-2 border-red-950 shadow-[0_4px_16px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95',
    
    // Rich red velvet accent
    red: 'bg-red-900 hover:bg-red-800 text-amber-200 font-yatra border-2 border-amber-600/50 shadow-md hover:scale-105 active:scale-95',
    
    // Bride pink accent
    pink: 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-yatra border-2 border-pink-300 shadow-lg hover:scale-105 active:scale-95',
    
    // Groom orange accent
    orange: 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-red-950 font-yatra border-2 border-red-900 shadow-lg hover:scale-105 active:scale-95',
    
    // Auspicious celebration green
    green: 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-yatra border-2 border-amber-300 shadow-lg hover:scale-105 active:scale-95',
    
    // Compact preset or filter pill
    pill: 'bg-red-900 hover:bg-amber-400 hover:text-red-950 text-amber-200 font-pixel text-xs rounded-full border border-amber-400/50 font-bold transition-all',
    
    // Floating tool button (e.g., sound mute, curtain redraw)
    floating: 'bg-amber-500/90 hover:bg-amber-400 text-red-950 font-pixel text-[10px] rounded-xl border-2 border-red-900 shadow-xl transition-all',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-full',
    md: 'text-base sm:text-lg px-5 py-2.5 rounded-full',
    lg: 'text-xl sm:text-2xl px-7 py-3.5 rounded-2xl',
    xl: 'text-2xl sm:text-4xl px-10 py-5 rounded-full',
  };

  const variantClass = variants[variant] || variants.gold;
  const sizeClass = variant === 'floating' || variant === 'pill' ? '' : (sizes[size] || sizes.md);
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 select-none ${variantClass} ${sizeClass} ${widthClass} ${disabledClass} ${className}`}
      {...props}
    >
      {iconLeft && <span className="inline-flex items-center">{iconLeft}</span>}
      {children && <span>{children}</span>}
      {iconRight && <span className="inline-flex items-center">{iconRight}</span>}
    </button>
  );
}
