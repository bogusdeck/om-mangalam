import React, { useState } from 'react';
import { Heart, Frown, Smile, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { SectionHeader } from './ui';

export default function RsvpSection() {
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [foodPreference, setFoodPreference] = useState('Veg (Paneer lover)');
  const [totalRsvpCount, setTotalRsvpCount] = useState(482);

  const responses = [
    {
      id: 'yes',
      label: '❤️ YES — Obviously',
      emoji: '🥳',
      bg: 'bg-emerald-600 hover:bg-emerald-500 border-emerald-300 text-white',
      msg: '“Excellent. Your attendance has been noted by 17 aunties and recorded in the WhatsApp master list.”'
    },
    {
      id: 'no',
      label: '😭 NO — I’m dead inside',
      emoji: '💔',
      bg: 'bg-red-700 hover:bg-red-600 border-red-300 text-white',
      msg: '“Lies. Absolute lies. We know you’ll show up unannounced just for the Gulab Jamuns.”'
    },
    {
      id: 'maybe',
      label: '🤡 MAYBE — Classic Indian relative',
      emoji: '🤔',
      bg: 'bg-amber-500 hover:bg-amber-400 border-amber-200 text-red-950',
      msg: '“Translation: You will decide on the day itself based on weather, traffic, and paneer quality.”'
    }
  ];

  const handleSelect = (res) => {
    shaadiAudio.playPop();
    shaadiAudio.playCelebrationFanfare();
    setSelectedResponse(res);
    setTotalRsvpCount(prev => prev + 1);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="rsvp" className="py-20 px-4 bg-gradient-to-b from-red-950 via-red-900 to-red-950 text-center relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <SectionHeader
          badge="★ FINAL HEADCOUNT PROCEDURE ★"
          title="AB BAHANE MAT BANANA."
          subtitle="Will you grace Megan Fox & Brad Pitt’s wedding with your presence?"
        />

        {/* RSVP Card Frame */}
        <div className="indian-border-gold velvet-bg rounded-3xl p-6 sm:p-12 shadow-2xl relative">
          
          {/* Guest Name Input */}
          <div className="mb-8 text-left max-w-lg mx-auto space-y-4">
            <label className="block text-amber-300 font-yatra text-xl">
              ENTER YOUR NAME (FOR SECURITY CHECK):
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Sharma Uncle / Sneha Cousin"
              className="w-full bg-red-950 text-amber-100 placeholder-amber-400/50 p-4 rounded-xl border-2 border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-300 font-poppins text-lg"
            />

            <div className="flex gap-4 items-center">
              <label className="text-amber-200 font-poppins text-xs font-bold">FOOD PREFERENCE:</label>
              <select
                value={foodPreference}
                onChange={(e) => setFoodPreference(e.target.value)}
                className="bg-red-950 text-amber-300 p-2 rounded-lg border border-amber-400 font-poppins text-xs font-bold"
              >
                <option>Veg (Paneer lover)</option>
                <option>Extra Sweet Tooth (Gulab Jamun focus)</option>
                <option>Only coming to judge DJ</option>
              </select>
            </div>
          </div>

          {/* Three Giant Decision Buttons */}
          <div className="grid grid-cols-1 gap-4 mb-10">
            {responses.map((res) => (
              <button
                key={res.id}
                onClick={() => handleSelect(res)}
                className={`w-full py-5 px-6 rounded-2xl font-yatra text-xl sm:text-2xl border-4 shadow-xl transition-all duration-300 transform hover:scale-102 active:scale-98 flex items-center justify-between cursor-pointer ${res.bg} ${
                  selectedResponse?.id === res.id ? 'ring-4 ring-yellow-300 scale-102' : ''
                }`}
              >
                <span>{res.label}</span>
                <span className="text-3xl">{res.emoji}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Humorous Reaction Display */}
          {selectedResponse && (
            <div className="bg-red-900/90 border-4 border-amber-400 rounded-2xl p-6 text-center animate-bounce shadow-2xl">
              <div className="text-amber-400 font-pixel text-xs mb-2">
                STATUS: RSVP CONFIRMED FOR {guestName ? guestName.toUpperCase() : 'GUEST'}
              </div>
              <p className="text-2xl sm:text-3xl font-yatra gold-gradient-text">
                {selectedResponse.msg}
              </p>
            </div>
          )}

          {/* Live RSVP Counter Banner */}
          <div className="mt-8 pt-6 border-t-2 border-dashed border-amber-400/40 text-amber-300 font-pixel text-xs sm:text-sm">
            🎉 TOTAL RSVP RESPONSES RECORDED: <span className="text-yellow-400 text-lg font-bold">{totalRsvpCount}</span> RELATIVES & FRIENDS
          </div>

        </div>

      </div>

    </section>
  );
}
