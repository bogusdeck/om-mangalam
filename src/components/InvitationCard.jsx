import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { shaadiAudio } from '../utils/audio';

export default function InvitationCard() {
  return (
    <section id="invitation" className="py-16 px-4 bg-red-950 flex justify-center relative overflow-hidden">
      
      {/* Floating Background Stars & Peacock Motifs */}
      <div className="absolute top-10 left-6 text-5xl opacity-20 animate-spin">🦚</div>
      <div className="absolute bottom-10 right-6 text-5xl opacity-20 animate-spin">🦚</div>

      {/* Main 90s Wedding Card Container */}
      <div 
        className="max-w-3xl w-full velvet-bg indian-card-frame rounded-2xl p-6 sm:p-12 text-center relative shadow-[0_0_50px_rgba(255,215,0,0.4)]"
        onClick={() => shaadiAudio.playShehnaiNote(523, 0.3)}
      >
        
        {/* Top Gold Ribbon / Marigold Trim */}
        <div className="flex justify-between items-center mb-6 border-b-2 border-dashed border-amber-400 pb-3">
          <span className="text-amber-400 font-pixel text-xs tracking-widest">★ 1998 OFFICIAL INVITATION ★</span>
          <span className="text-2xl">🌺</span>
          <span className="text-amber-400 font-pixel text-xs tracking-widest">★ 100% PURE DRAMA ★</span>
        </div>

        {/* Peacock SVG / Emoji Header */}
        <div className="flex items-center justify-center gap-4 my-2">
          <span className="text-4xl sm:text-6xl transform -scale-x-100">🦚</span>
          <div className="border-4 border-amber-400 p-3 rounded-full bg-red-900 shadow-inner">
            <span className="text-4xl sm:text-5xl">🪔</span>
          </div>
          <span className="text-4xl sm:text-6xl">🦚</span>
        </div>

        {/* SHUBH VIVAH Header */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-yatra gold-gradient-text my-4 tracking-wider drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
          || शुभ विवाह ||
        </h2>

        {/* Blessings Subtitle */}
        <div className="my-4 text-amber-200 font-rozha text-lg sm:text-2xl italic bg-red-950/70 py-2 px-4 rounded-lg border border-amber-500/40 inline-block">
          ✨ With the blessings of Google, Relatives & WhatsApp University ✨
        </div>

        {/* The Couple Names */}
        <div className="my-8 py-6 bg-gradient-to-r from-red-900/40 via-amber-500/20 to-red-900/40 rounded-2xl border-2 border-amber-400/60 shadow-inner">
          <div className="text-3xl sm:text-5xl md:text-6xl font-yatra gold-gradient-text flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <span className="hover:scale-110 transition-transform inline-block">MEGAN FOX</span>
            <span className="text-red-500 text-3xl sm:text-5xl animate-ping">❤️</span>
            <span className="hover:scale-110 transition-transform inline-block">BRAD PITT</span>
          </div>
          <p className="text-amber-300 font-script text-2xl sm:text-3xl mt-3">
            are officially tying the knot (and taking all the gifts)!
          </p>
        </div>

        {/* Invitation Text Body */}
        <div className="space-y-4 my-6 text-amber-100 font-poppins text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          <p className="font-bold text-amber-300">
            “Together with their extremely excited & mildly exhausted families,”
          </p>
          <p className="bg-red-900/60 p-4 rounded-xl border border-amber-400/30 shadow">
            request the pleasure of your presence, blessings, photographs, and preferably your <span className="text-amber-300 font-bold underline decoration-amber-400 decoration-2">unfiltered dancing skills</span> on the dance floor.
          </p>
        </div>

        {/* Key Event Quick Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8 text-xs sm:text-sm font-bold">
          <div className="bg-amber-400 text-red-950 p-3 rounded-lg border-2 border-red-900 shadow">
            📅 DATE: 18th NOVEMBER 2026
          </div>
          <div className="bg-amber-400 text-red-950 p-3 rounded-lg border-2 border-red-900 shadow">
            📍 VENUE: ROYAL LEELA GRAND
          </div>
          <div className="bg-amber-400 text-red-950 p-3 rounded-lg border-2 border-red-900 shadow">
            ⏰ TIME: 7:00 PM ONWARDS
          </div>
        </div>

        {/* Bottom Card Guarantee Badge */}
        <div className="mt-6 pt-4 border-t-2 border-dashed border-amber-400/50 flex items-center justify-center gap-2 text-amber-300 text-xs sm:text-sm font-pixel">
          <span>👑 100% UNLIMITED PANEER GUARANTEED 👑</span>
        </div>

      </div>

    </section>
  );
}
