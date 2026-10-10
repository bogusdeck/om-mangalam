import React, { useState } from 'react';
import { Send, Sparkles, MessageCircle, Heart, Pin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton, SectionHeader } from './ui';

export default function GuestbookSection() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [blessings, setBlessings] = useState([
    {
      id: 1,
      name: 'Sharma Bua Ji',
      msg: 'Khush raho beta ❤️ May your kitchen always be full of paneer!',
      preset: 'Khush raho ❤️',
      date: 'Just now'
    },
    {
      id: 2,
      name: 'Rohan (Cousin)',
      msg: 'Treat kab de rahe ho?! Still waiting for bachelor party response.',
      preset: 'Treat kab de rahe ho?',
      date: '2 mins ago'
    },
    {
      id: 3,
      name: 'Gupta Uncle',
      msg: 'Bas khana achha hona chahiye. Rest everything is secondary.',
      preset: 'Bas khana achha hona chahiye.',
      date: '5 mins ago'
    },
    {
      id: 4,
      name: 'Pooja (Bestie)',
      msg: 'Shaadi mein dance karna hai. Prepared 6 Bollywood routines!',
      preset: 'Shaadi mein dance karna hai.',
      date: '10 mins ago'
    }
  ]);

  const presets = [
    'Khush raho ❤️',
    'Jaldi good news dena.',
    'Treat kab de rahe ho?',
    'Shaadi mein dance karna hai.',
    'Bas khana achha hona chahiye.'
  ];

  const handlePresetClick = (presetText) => {
    shaadiAudio.playPop();
    setMessage((prev) => (prev ? `${prev} ${presetText}` : presetText));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    shaadiAudio.playCelebrationFanfare();

    const newBlessing = {
      id: Date.now(),
      name: name.trim() || 'Anonymous Well-Wisher',
      msg: message,
      preset: 'Personal Blessing',
      date: 'Just now'
    };

    setBlessings([newBlessing, ...blessings]);
    setName('');
    setMessage('');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="blessings" className="py-20 px-4 bg-red-950 text-center relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <SectionHeader
          badge="★ DIGITAL GUESTBOOK & BLESSINGS WALL ★"
          title="APNA AASHIRWAD CHHOD KE JAANA"
          subtitle="Leave a message for Megan & Brad (or demand a party)"
        />

        {/* Input Form Card */}
        <div className="indian-border-gold velvet-bg rounded-3xl p-6 sm:p-10 shadow-2xl mb-14 text-left max-w-2xl mx-auto">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-amber-300 font-yatra text-lg mb-1">
                YOUR NAME / RELATIVE RELATION:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Verma Chacha Ji / College Friend"
                className="w-full bg-red-950 text-amber-100 placeholder-amber-400/50 p-3.5 rounded-xl border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 font-poppins"
              />
            </div>

            <div>
              <label className="block text-amber-300 font-yatra text-lg mb-1">
                YOUR BLESSING / WARNING MESSAGE:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="3"
                placeholder="Write something heartwarming or hilarious..."
                className="w-full bg-red-950 text-amber-100 placeholder-amber-400/50 p-3.5 rounded-xl border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 font-poppins"
              ></textarea>
            </div>

            {/* Quick Preset Buttons */}
            <div>
              <span className="text-xs font-pixel text-amber-400 block mb-2">
                ⚡ TAP QUICK PRESETS TO INSERT:
              </span>
              <div className="flex flex-wrap gap-2">
                {presets.map((preset, idx) => (
                  <ShaadiButton
                    key={idx}
                    type="button"
                    variant="pill"
                    onClick={() => handlePresetClick(preset)}
                  >
                    {preset}
                  </ShaadiButton>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <ShaadiButton
              type="submit"
              size="lg"
              fullWidth
              iconLeft={<Send className="w-6 h-6 fill-current" />}
            >
              PIN BLESSING ON WALL ✨
            </ShaadiButton>
          </form>

        </div>

        {/* Pinned Blessings Decorative Wall */}
        <div className="bg-red-900/60 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-yatra text-amber-300 mb-6 flex items-center justify-center gap-2">
            <Pin className="w-6 h-6 text-amber-400" />
            PINNED BLESSINGS WALL ({blessings.length})
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="indian-card-frame velvet-bg p-5 rounded-2xl text-left relative transform hover:-rotate-1 transition-transform shadow-xl"
              >
                <div className="flex justify-between items-center mb-2 border-b border-dashed border-amber-400/40 pb-2">
                  <span className="font-yatra text-lg text-amber-300">
                    {b.name}
                  </span>
                  <span className="text-xs font-pixel text-amber-400/70">
                    {b.date}
                  </span>
                </div>
                <p className="text-amber-100 font-poppins text-sm leading-relaxed">
                  {b.msg}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
