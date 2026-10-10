import React, { useState } from 'react';
import { Camera, Sparkles, Heart, Stamp } from 'lucide-react';
import { shaadiAudio } from '../utils/audio';
import { SectionHeader } from './ui';

export default function PhotoAlbum() {
  const [stamps, setStamps] = useState({});

  const photos = [
    {
      id: 1,
      caption: '“They thought they looked cool.”',
      frameStyle: 'golden',
      emoji: '🕶️ 👫🏻',
      sub: 'First trip together before families started asking questions.'
    },
    {
      id: 2,
      caption: '“Evidence has been recovered.”',
      frameStyle: 'polaroid',
      emoji: '🍕 🥤',
      sub: 'Eating 3 midnight pizzas after swearing to start a diet.'
    },
    {
      id: 3,
      caption: '“Before the relatives discovered Instagram.”',
      frameStyle: 'vhs',
      emoji: '💃🏻 🕺🏻',
      sub: 'Dancing at a cousin’s sangeet without knowing their turn was next.'
    },
    {
      id: 4,
      caption: '“Zero filter, 100% confidence.”',
      frameStyle: 'floral',
      emoji: '🌸 💑🏻 🌺',
      sub: 'Traditional outfit trial day (Brad complained about the sherwani itch).'
    },
    {
      id: 5,
      caption: '“When parents asked: Any questions?”',
      frameStyle: 'golden',
      emoji: '🤐 🫣',
      sub: 'Both stared at the ceiling for 45 seconds in total silence.'
    },
    {
      id: 6,
      caption: '“The final freedom photo.”',
      frameStyle: 'polaroid',
      emoji: '✈️ 🏝️',
      sub: 'Taken 5 minutes before signing the wedding venue contract.'
    }
  ];

  const handleAddStamp = (id) => {
    shaadiAudio.playPop();
    const stampTypes = ['APPROVED BY MAMI 📜', 'SHUBH VIVAH 🪔', '100% CRINGE 💖', 'INSTA VIRAL 🔥'];
    const randomStamp = stampTypes[Math.floor(Math.random() * stampTypes.length)];
    setStamps((prev) => ({ ...prev, [id]: randomStamp }));
  };

  return (
    <section id="photos" className="py-20 px-4 bg-red-950 text-center relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <SectionHeader
          badge="★ NOSTALGIC PHOTO GALLERY (1998-2026) ★"
          title="SOME PHOTOGRAPHS BEFORE WE BECOME RESPONSIBLE ADULTS"
          subtitle="Click any photo to apply an official Auntie Stamp of Approval"
          className="mb-14"
        />

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => handleAddStamp(photo.id)}
              className="indian-card-frame velvet-bg rounded-2xl p-6 relative cursor-pointer group transform hover:scale-105 transition-all duration-300 shadow-2xl flex flex-col justify-between"
            >
              
              {/* Stamp Sticker Overlay */}
              {stamps[photo.id] && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-red-950 font-pixel text-xs px-3 py-1 rounded-full border-2 border-red-900 shadow-lg z-20 animate-bounce">
                  {stamps[photo.id]}
                </div>
              )}

              {/* Photo Canvas Container */}
              <div className="bg-gradient-to-tr from-red-900 via-amber-900 to-red-950 border-4 border-amber-400 rounded-xl p-8 aspect-4/3 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                <span className="text-6xl sm:text-7xl group-hover:scale-125 transition-transform duration-300">
                  {photo.emoji}
                </span>
                <span className="text-amber-300 font-script text-2xl mt-4">
                  Megan & Brad
                </span>
              </div>

              {/* Caption & Subtitle */}
              <div className="mt-4 space-y-2">
                <p className="text-amber-300 font-rozha text-lg italic">
                  {photo.caption}
                </p>
                <p className="text-amber-100 font-poppins text-xs bg-red-950/80 p-2 rounded border border-amber-500/30">
                  {photo.sub}
                </p>
              </div>

              {/* Bottom Stamp Action Hint */}
              <div className="mt-4 text-xs font-pixel text-amber-400/80 flex items-center justify-center gap-1">
                <Stamp className="w-3 h-3" />
                <span>TAP TO STAMP PHOTO</span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
