import React, { useState } from 'react';
import { Utensils, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton } from './ui';

export default function FoodSection() {
  const [thaliItems, setThaliItems] = useState([]);
  const [revealSecret, setRevealSecret] = useState(false);

  const menuCategories = [
    {
      category: '🔥 STARTERS',
      items: [
        { name: 'Paneer Tikka (Unlimited)', icon: '🧀' },
        { name: 'Crispy Samosas', icon: '🥟' },
        { name: 'Hara Bhara Kebab', icon: '🧆' },
        { name: 'Spring Rolls', icon: '🥢' }
      ]
    },
    {
      category: '🥘 MAIN COURSE',
      items: [
        { name: 'Dal Makhani (24-hr simmered)', icon: '🍲' },
        { name: 'Butter Naan (Hot from Tandoor)', icon: '🫓' },
        { name: 'Shahi Paneer', icon: '🫕' },
        { name: 'Hyderabadi Dum Biryani', icon: '🍚' }
      ]
    },
    {
      category: '🍩 DESSERTS',
      items: [
        { name: 'Hot Gulab Jamun (with Rabri)', icon: '🍡' },
        { name: 'Crispy Jalebi', icon: '🥨' },
        { name: 'Kesar Rasgulla', icon: '🧁' },
        { name: 'Kulfi Falooda', icon: '🍨' }
      ]
    },
    {
      category: '🥤 REFRESHMENTS',
      items: [
        { name: 'Masala Chai', icon: '☕' },
        { name: 'Mango Lassi', icon: '🥭' },
        { name: 'Chilled Rooh Afza', icon: '🍷' }
      ]
    }
  ];

  const handleAddToThali = (item) => {
    shaadiAudio.playPop();
    setThaliItems((prev) => [...prev, item]);

    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.7 }
    });
  };

  const clearThali = () => {
    shaadiAudio.playPop();
    setThaliItems([]);
  };

  return (
    <section id="food" className="py-20 px-4 bg-red-950 text-center relative overflow-hidden">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="text-amber-400 font-pixel text-xs sm:text-sm tracking-widest mb-2 blink-fast">
            ★ THE MOST CRITICAL SECTION ★
          </div>
          <h2 className="text-3xl sm:text-5xl font-yatra gold-gradient-text tracking-wide drop-shadow">
            IMPORTANT INFORMATION
          </h2>
          
          <div className="my-6 bg-amber-400 text-red-950 font-yatra text-4xl sm:text-6xl md:text-7xl py-4 px-6 rounded-2xl border-4 border-red-900 shadow-2xl inline-block transform hover:scale-105 transition-transform">
            YES, THERE WILL BE FOOD!
          </div>

          <div 
            onClick={() => setRevealSecret(!revealSecret)}
            className="cursor-pointer max-w-xl mx-auto bg-red-900/80 p-4 rounded-xl border-2 border-amber-400/60 transition-all hover:bg-red-800"
          >
            <p className="text-amber-200 font-rozha text-xl sm:text-2xl italic">
              “Please don't come only for the food.”
            </p>
            {revealSecret && (
              <p className="text-yellow-300 font-yatra text-2xl sm:text-3xl mt-2 animate-bounce">
                “Actually… please do. We made way too much!” 🤤
              </p>
            )}
            <p className="text-amber-400 text-xs font-pixel mt-2">
              (TAP HERE TO REVEAL TRUTH)
            </p>
          </div>
        </div>

        {/* Menu Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {menuCategories.map((cat, idx) => (
            <div key={idx} className="indian-border-gold velvet-bg rounded-2xl p-5 text-left shadow-xl">
              <h3 className="text-xl font-yatra text-amber-300 border-b-2 border-dashed border-amber-400/60 pb-2 mb-3">
                {cat.category}
              </h3>
              <div className="space-y-2">
                {cat.items.map((food, fIdx) => (
                  <button
                    key={fIdx}
                    onClick={() => handleAddToThali(food)}
                    className="w-full text-left bg-red-950/80 hover:bg-amber-400 hover:text-red-950 p-2.5 rounded-lg border border-amber-500/30 text-xs sm:text-sm font-poppins text-amber-100 font-bold transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span>{food.icon} {food.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 text-xs font-pixel">ADD +</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Virtual Thali Builder */}
        <div className="indian-card-frame velvet-bg rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl relative">
          <h3 className="text-3xl font-yatra text-amber-300 mb-2 flex items-center justify-center gap-2">
            <Utensils className="w-7 h-7 text-amber-400" />
            YOUR VIRTUAL GOLDEN THALI
          </h3>
          <p className="text-amber-200 font-poppins text-xs sm:text-sm mb-6">
            Tap items above to pile your plate high!
          </p>

          {/* Golden Thali Plate Graphic */}
          <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-full border-8 border-amber-400 bg-gradient-to-tr from-amber-600 via-amber-800 to-amber-700 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] p-6 flex flex-wrap items-center justify-center gap-3 overflow-y-auto relative">
            {thaliItems.length === 0 ? (
              <div className="text-center text-amber-200 font-script text-2xl">
                Plate is currently empty... <br /> Add Paneer & Gulab Jamun! 🍡
              </div>
            ) : (
              thaliItems.map((item, i) => (
                <div key={i} className="bg-red-950/90 text-amber-300 text-sm font-bold p-2 rounded-full border border-amber-400 shadow animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                  {item.icon}
                </div>
              ))
            )}
          </div>

          {thaliItems.length > 0 && (
            <div className="mt-6 flex justify-center gap-4">
              <ShaadiButton
                variant="red"
                size="md"
                onClick={clearThali}
              >
                🧹 CLEAR PLATE
              </ShaadiButton>
              <div className="bg-amber-400 text-red-950 font-pixel text-xs px-4 py-2.5 rounded-full font-bold">
                ITEMS ON THALI: {thaliItems.length}
              </div>
            </div>
          )}
        </div>

      </div>

    </section>
  );
}
