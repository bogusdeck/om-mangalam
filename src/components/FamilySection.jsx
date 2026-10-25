import React, { useState } from 'react';
import { Shield, Sparkles, Award } from 'lucide-react';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton, SectionHeader } from './ui';
import { WEDDING_CONFIG } from '../config/weddingConfig';

export default function FamilySection() {
  const familyConfig = WEDDING_CONFIG.familySection || {};
  const [selectedFamily, setSelectedFamily] = useState('all');

  const familyMembers = familyConfig.members || [];
  const filters = familyConfig.filters || [
    { id: 'all', label: '🌟 ALL MASTERMINDS', variant: 'gold' },
    { id: 'bride', label: "👰 BRIDE'S SIDE (SHARMA SQUAD)", variant: 'pink' },
    { id: 'groom', label: "🕺 GROOM'S SIDE (VERMA WARRIORS)", variant: 'orange' },
  ];

  const filteredMembers = selectedFamily === 'all' 
    ? familyMembers 
    : familyMembers.filter(m => m.side === selectedFamily);

  return (
    <section id="family" className="py-20 px-4 bg-gradient-to-b from-red-950 via-red-900 to-red-950 text-center relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <SectionHeader
          badge={familyConfig.badge || '★ CHARACTER CARDS & BOARD OF DIRECTORS ★'}
          title={familyConfig.heading || 'THE PEOPLE RESPONSIBLE FOR THIS'}
          subtitle={familyConfig.subheading || 'The masterminds who funded, executed, and micro-managed everything'}
        />

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {filters.map((f) => (
            <ShaadiButton
              key={f.id}
              variant={selectedFamily === f.id ? f.variant : 'red'}
              onClick={() => setSelectedFamily(f.id)}
            >
              {f.label}
            </ShaadiButton>
          ))}
        </div>

        {/* Character Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, idx) => (
            <div 
              key={idx}
              onClick={() => shaadiAudio.playDramaticHit()}
              className="indian-card-frame velvet-bg rounded-2xl p-6 text-center shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
            >
              {/* Top Role Badge */}
              <div className="bg-amber-400 text-red-950 font-yatra text-lg py-1 px-3 rounded-lg border-2 border-red-900 mb-4 inline-block font-bold">
                {member.role}
              </div>

              {/* Avatar Studio Portrait Placeholder */}
              <div className="w-28 h-28 mx-auto rounded-full border-4 border-amber-400 bg-gradient-to-tr from-amber-600 to-red-800 flex items-center justify-center text-6xl shadow-inner mb-4 group-hover:rotate-6 transition-transform">
                {member.avatar}
              </div>

              {/* Name & Title */}
              <h3 className="text-2xl font-yatra text-amber-300 mb-1">
                {member.name}
              </h3>
              <p className="text-amber-200 font-rozha text-sm italic mb-3">
                {member.title}
              </p>

              {/* Quote Box */}
              <div className="bg-red-950/80 p-3 rounded-xl border border-amber-500/30 text-amber-100 text-xs sm:text-sm font-poppins mb-4">
                {member.quote}
              </div>

              {/* Stat Footer */}
              <div className="bg-amber-400/20 text-amber-300 font-pixel text-xs py-1.5 px-3 rounded-lg border border-amber-400/40">
                ⚡ {member.stats}
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
