import React, { useState } from 'react';
import { Shield, Sparkles, Award } from 'lucide-react';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton, SectionHeader } from './ui';

export default function FamilySection() {
  const [selectedFamily, setSelectedFamily] = useState('all');

  const familyMembers = [
    {
      role: "BRIDE'S PAPA",
      name: 'Ramesh Sharma',
      title: 'Chief Financial Officer & Card Signer',
      quote: '“Bhai, budget limits is just a state of mind.”',
      avatar: '👨🏻‍💼',
      stats: 'Budget Overruns: +340%',
      side: 'bride'
    },
    {
      role: "BRIDE'S MOM",
      name: 'Sunita Sharma',
      title: 'Head of Operations & Emotional Blackmail',
      quote: '“Khana achha nahi hua toh log kya kahenge?!”',
      avatar: '👩🏻‍💼',
      stats: 'Tears per minute: 4.2',
      side: 'bride'
    },
    {
      role: "GROOM'S MOM",
      name: 'Anita Verma',
      title: 'Future CEO of “Beta, Bahu Ko Bolna…”',
      quote: '“Tanish couldn’t even find his socks yesterday.”',
      avatar: '👩🏻',
      stats: 'Jewelry Weight: 4.8 kg',
      side: 'groom'
    },
    {
      role: "GROOM'S DAD",
      name: 'Rajesh Verma',
      title: 'Sponsor. Investor. Occasional DJ.',
      quote: '“Baraat noise level must cross 120 decibels.”',
      avatar: '👨🏻',
      stats: 'Whisky Stock: Unlimited',
      side: 'groom'
    },
    {
      role: "OVER-ENTHUSIASTIC CHACHA",
      name: 'Mukesh Chacha',
      title: 'Head of Baraat Dance Choreography',
      quote: '“Naagin dance is mandatory for everyone!”',
      avatar: '🕺🏻',
      stats: 'Stamina: 100% (with Old Monk)',
      side: 'groom'
    },
    {
      role: "REEL-CREATOR COUSINS",
      name: 'Sneha & Rohan',
      title: 'Official Instagram Reel Directors',
      quote: '“Hold the pose, the lighting is aesthetic!”',
      avatar: '👯‍♀️',
      stats: 'Photos Taken: 14,890',
      side: 'bride'
    }
  ];

  const filteredMembers = selectedFamily === 'all' 
    ? familyMembers 
    : familyMembers.filter(m => m.side === selectedFamily);

  return (
    <section id="family" className="py-20 px-4 bg-gradient-to-b from-red-950 via-red-900 to-red-950 text-center relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Title */}
        <SectionHeader
          badge="★ CHARACTER CARDS & BOARD OF DIRECTORS ★"
          title="THE PEOPLE RESPONSIBLE FOR THIS"
          subtitle="The masterminds who funded, executed, and micro-managed everything"
        />

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          <ShaadiButton
            variant={selectedFamily === 'all' ? 'gold' : 'red'}
            onClick={() => setSelectedFamily('all')}
          >
            🌟 ALL MASTERMINDS
          </ShaadiButton>
          <ShaadiButton
            variant={selectedFamily === 'bride' ? 'pink' : 'red'}
            onClick={() => setSelectedFamily('bride')}
          >
            👰 BRIDE'S SIDE (SHARMA SQUAD)
          </ShaadiButton>
          <ShaadiButton
            variant={selectedFamily === 'groom' ? 'orange' : 'red'}
            onClick={() => setSelectedFamily('groom')}
          >
            🕺 GROOM'S SIDE (VERMA WARRIORS)
          </ShaadiButton>
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
