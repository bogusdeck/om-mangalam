import React from 'react';

/**
 * Reusable Traditional 90s Shaadi Card Frame
 */
export default function ShaadiCard({
  children,
  className = '',
  onClick,
  hoverable = false,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`indian-card-frame velvet-bg rounded-2xl relative shadow-2xl ${
        hoverable ? 'hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
