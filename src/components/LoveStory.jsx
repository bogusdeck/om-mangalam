import React, { useState } from 'react';
import { Film, Play, FastForward, Tv } from 'lucide-react';
import { shaadiAudio } from '../utils/audio';
import { SectionHeader } from './ui';

export default function LoveStory() {
  const [activeStep, setActiveStep] = useState(null);
  const [vhsGlitch, setVhsGlitch] = useState(false);

  const timelineEvents = [
    {
      year: '1998',
      title: 'THE PARALLEL UNIVERSES',
      desc: 'They were born. Completely unaware of the financial & emotional consequences awaiting them in 2026.',
      badge: '👶 ERA OF CRAWLING',
      icon: '🍼'
    },
    {
      year: '2018',
      title: 'THE FIRST ENCOUNTER',
      desc: 'First meeting at a coffee shop. Tanish ordered Espresso to sound sophisticated, then added 5 spoons of sugar.',
      badge: '☕ EYE CONTACT',
      icon: '👀'
    },
    {
      year: '2021',
      title: 'JUST FRIENDS™',
      desc: 'Repeatedly declared to everyone: "We are ONLY good friends bhai, nothing like that!" (Narrator: It was exactly like that).',
      badge: '🤝 FRIENDZONE STAGE',
      icon: '🍕'
    },
    {
      year: '2023',
      title: 'WE ARE NOT DATING',
      desc: 'Posting late-night stories together while denying all allegations to inquisitive aunties.',
      badge: '🤫 TOP SECRET',
      icon: '📱'
    },
    {
      year: '2025',
      title: 'PARENTS ENTERED THE CHAT',
      desc: 'The official Biodata exchange! Horoscope matched, WhatsApp family groups created, and 45 relatives joined the panel.',
      badge: '👨‍👩‍👧 RISHTA LOCKED',
      icon: '💥'
    },
    {
      year: '2026',
      title: 'THE INVESTIGATION IS OVER',
      desc: 'THE VERDICT IS IN: They are getting married! No refunds, no exchange allowed.',
      badge: '💍 SHUBH VIVAH',
      icon: '👑'
    }
  ];

  const handleEventClick = (idx) => {
    shaadiAudio.playDramaticHit();
    setActiveStep(idx);
    setVhsGlitch(true);
    setTimeout(() => setVhsGlitch(false), 500);
  };

  return (
    <section id="lovestory" className="py-20 px-4 bg-red-950 text-center relative overflow-hidden">
      
      {/* Background VHS Lines */}
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <SectionHeader
          badge={
            <span className="inline-flex items-center gap-1.5">
              <Film className="w-4 h-4" /> 90s BOLLYWOOD BLOCKBUSTER TIMELINE
            </span>
          }
          title="HOW IT ALL STARTED…"
          subtitle="A saga of denial, caffeine, and parental negotiations"
          className="mb-14"
        />

        {/* Timeline Reel Container */}
        <div className={`relative border-4 border-amber-400 rounded-3xl p-6 sm:p-10 velvet-bg shadow-2xl transition-all duration-300 ${vhsGlitch ? 'invert contrast-200' : ''}`}>
          
          {/* VHS Tape Header Strip */}
          <div className="flex justify-between items-center bg-black text-green-400 font-pixel text-xs p-3 rounded-lg border-2 border-green-500 mb-10 overflow-x-auto">
            <span>VHS PLAYBACK: [01:42:09]</span>
            <span className="blink-fast text-red-500">REC ●</span>
            <span>SP MODE — STEREO</span>
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l-4 border-dashed border-amber-400/60 ml-4 sm:ml-32 space-y-10 text-left">
            {timelineEvents.map((item, idx) => (
              <div key={idx} className="relative pl-8 sm:pl-12 group">
                
                {/* Year Marker Box */}
                <div 
                  onClick={() => handleEventClick(idx)}
                  className={`absolute -left-5 sm:-left-36 top-0 w-10 sm:w-28 h-10 sm:h-12 bg-amber-400 text-red-950 font-yatra text-base sm:text-xl rounded-xl border-2 border-red-900 shadow-lg flex items-center justify-center cursor-pointer transition-transform group-hover:scale-110 ${
                    activeStep === idx ? 'bg-yellow-300 ring-4 ring-amber-300' : ''
                  }`}
                >
                  {item.year}
                </div>

                {/* Event Card Frame */}
                <div 
                  onClick={() => handleEventClick(idx)}
                  className={`bg-red-900/90 border-2 ${activeStep === idx ? 'border-yellow-300 bg-red-800 shadow-[0_0_25px_rgba(255,215,0,0.6)]' : 'border-amber-400/60'} rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer hover:border-amber-400`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <span className="text-amber-300 font-pixel text-xs bg-red-950 px-3 py-1 rounded border border-amber-500/40">
                      {item.badge}
                    </span>
                    <span className="text-3xl">{item.icon}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-yatra text-amber-300 mt-1">
                    {item.title}
                  </h3>

                  <p className="text-amber-100 font-poppins text-sm sm:text-base mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* VHS Tape Bottom Controls */}
          <div className="mt-10 pt-6 border-t-2 border-amber-500/40 flex justify-center gap-4 text-xs font-pixel text-amber-300 flex-wrap">
            <span className="bg-red-900 px-3 py-1.5 rounded border border-amber-500 flex items-center gap-1">
              <Play className="w-3 h-3 fill-current" /> PLAY
            </span>
            <span className="bg-red-900 px-3 py-1.5 rounded border border-amber-500 flex items-center gap-1">
              <FastForward className="w-3 h-3 fill-current" /> FAST FORWARD TO 2026
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
