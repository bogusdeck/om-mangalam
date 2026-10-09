import React from 'react';

/**
 * Reusable Section Header with Festive Badge, Yatra Title, and Script Subtitle
 */
export default function SectionHeader({
  badge,
  title,
  subtitle,
  className = '',
}) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {badge && (
        <div className="inline-block bg-amber-400 text-red-950 font-pixel text-xs px-3 py-1 rounded-full mb-3 border-2 border-red-900 font-bold shadow-md">
          {badge}
        </div>
      )}
      {title && (
        <h2 className="text-4xl sm:text-6xl font-yatra gold-gradient-text tracking-wide drop-shadow-md">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-amber-200 font-script text-2xl sm:text-3xl mt-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
