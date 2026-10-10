import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { SectionHeader } from './ui';

export default function MainEvents() {
  const [activeEvent, setActiveEvent] = useState(null);

  const events = [
    {
      id: 'haldi',
      emoji: '🌼',
      name: 'HALDI CEREMONY',
      subtitle: 'Yellow Paint War',
      date: '17th November 2026',
      time: '10:00 AM ONWARDS',
      dressCode: 'Strictly Yellow (Will be ruined anyway)',
      desc: 'Where turmeric is violently applied to the couple. Nobody leaves without looking like a yellow Teletubby.',
      bg: 'from-amber-600 to-yellow-700'
    },
    {
      id: 'mehendi',
      emoji: '💃',
      name: 'MEHENDI NIGHT',
      subtitle: 'Henna & Hand Cramps',
      date: '17th November 2026',
      time: '4:00 PM ONWARDS',
      dressCode: 'Green & Festive',
      desc: 'Sitting still for 4 straight hours while refusing to drink water so you don’t have to use the restroom.',
      bg: 'from-emerald-700 to-green-900'
    },
    {
      id: 'sangeet',
      emoji: '🎶',
      name: 'SANGEET NIGHT',
      subtitle: 'Bollywood Dance Off',
      date: '17th November 2026',
      time: '7:30 PM ONWARDS',
      dressCode: 'Bling, Glitz & High Heels',
      desc: 'Where relatives who haven’t danced since 2007 suddenly become Hrithik Roshan and Prabhudeva.',
      bg: 'from-purple-800 to-red-900'
    },
    {
      id: 'baraat',
      emoji: '🥁',
      name: 'THE BARAAT',
      subtitle: 'Road Blockade Operation',
      date: '18th November 2026',
      time: '5:00 PM ONWARDS',
      dressCode: 'Heavy Sherwanis & Turbans',
      desc: 'Noise level: Legally questionable. Groom rides a horse while relatives dance 2 inches away from moving auto-rickshaws.',
      bg: 'from-red-800 to-orange-800'
    },
    {
      id: 'wedding',
      emoji: '💍',
      name: 'THE PHERAS',
      subtitle: 'Shubh Vivah Main Ritual',
      date: '18th November 2026',
      time: '8:00 PM ONWARDS',
      dressCode: 'Traditional Royal Indian Wear',
      desc: 'The official 7 vows around the holy fire where Brad & Megan sign away their remaining single status forever.',
      bg: 'from-red-950 to-amber-900'
    },
    {
      id: 'reception',
      emoji: '🎉',
      name: 'GRAND RECEPTION',
      subtitle: 'Stage Standing marathon',
      date: '19th November 2026',
      time: '7:00 PM ONWARDS',
      dressCode: 'Gowns, Tuxedos & Heavy Sarees',
      desc: 'Eat unlimited Paneer, judge the stage decor, take 500 photos with people you haven’t seen in 12 years, and exit.',
      bg: 'from-yellow-700 to-red-900'
    }
  ];

  const handleEventClick = (evt) => {
    setActiveEvent(evt.id);
    shaadiAudio.playDhol();
    shaadiAudio.playShehnaiNote(659, 0.4);

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  return (
    <section id="events" className="py-20 px-4 bg-red-950 text-center relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Title Header */}
        <SectionHeader
          badge="★ 3-DAY NON-STOP MARATHON ★"
          title="THE MAIN EVENT(S)"
          subtitle="Clear your schedule. Sleep is not on the itinerary."
          className="mb-14"
        />

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((evt) => (
            <div
              key={evt.id}
              onClick={() => handleEventClick(evt)}
              className={`indian-border-gold rounded-3xl p-6 text-left relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br ${evt.bg} ${
                activeEvent === evt.id ? 'ring-4 ring-yellow-300 shadow-[0_0_30px_rgba(255,215,0,0.8)]' : ''
              }`}
            >
              {/* Event Emoji Banner Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-5xl animate-bounce">{evt.emoji}</span>
                <span className="bg-amber-400 text-red-950 font-pixel text-xs px-3 py-1 rounded font-bold border border-red-900">
                  {evt.subtitle}
                </span>
              </div>

              {/* Event Name */}
              <h3 className="text-2xl sm:text-3xl font-yatra text-amber-300 mb-2">
                {evt.name}
              </h3>

              {/* Date & Time Pills */}
              <div className="space-y-1.5 mb-4 font-poppins text-xs sm:text-sm text-amber-100">
                <div className="flex items-center gap-2 bg-red-950/70 p-2 rounded-lg border border-amber-500/30">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-red-950/70 p-2 rounded-lg border border-amber-500/30">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{evt.time}</span>
                </div>
              </div>

              {/* Description Box */}
              <p className="text-amber-100 font-poppins text-sm mb-4 leading-relaxed bg-black/40 p-3 rounded-xl border border-amber-400/20">
                {evt.desc}
              </p>

              {/* Dress Code Footer */}
              <div className="text-xs text-amber-300 font-bold bg-amber-400/20 p-2 rounded border border-amber-400/40 text-center">
                👗 DRESS CODE: {evt.dressCode}
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
