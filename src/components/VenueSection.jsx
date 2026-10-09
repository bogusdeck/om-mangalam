import React, { useState } from 'react';
import { MapPin, Navigation, Car, Calendar, Clock } from 'lucide-react';
import { shaadiAudio } from '../utils/audio';
import { ShaadiButton, SectionHeader } from './ui';

export default function VenueSection() {
  const [vehiclePos, setVehiclePos] = useState(10);
  const [vehicleType, setVehicleType] = useState('🛺'); // Auto rickshaw or Maruti 800

  const handleDrive = () => {
    shaadiAudio.playDhol();
    shaadiAudio.playShehnaiNote(523, 0.3);

    setVehiclePos((prev) => {
      const next = prev + 30;
      if (next > 85) return 85;
      return next;
    });

    // Also open google maps in new tab
    setTimeout(() => {
      window.open('https://maps.google.com/?q=Royal+Leela+Grand+Palace+New+Delhi', '_blank');
    }, 800);
  };

  return (
    <section id="venue" className="py-20 px-4 bg-gradient-to-b from-red-950 via-red-900 to-red-950 text-center relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <SectionHeader
          badge="★ VENUE & NAVIGATION MAP ★"
          title="WHERE THE DRAMA WILL HAPPEN"
          subtitle="Follow the smell of fresh Naan & sound of Dhol"
        />

        {/* Venue Card Frame */}
        <div className="indian-border-gold velvet-bg rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Venue Details Box */}
          <div className="bg-red-900/90 border-4 border-amber-400 rounded-2xl p-6 sm:p-8 mb-8 text-center max-w-2xl mx-auto">
            <h3 className="text-3xl sm:text-4xl font-yatra text-amber-300 mb-2">
              🏰 THE ROYAL LEELA GRAND PALACE
            </h3>
            <p className="text-amber-100 font-poppins text-base sm:text-lg mb-4">
              VIP Ring Road, Grand Banquet Precinct, New Delhi / Jaipur Highway
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-bold font-poppins">
              <div className="bg-red-950/80 p-3 rounded-xl border border-amber-400/40 text-amber-200 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>18th NOVEMBER 2026</span>
              </div>
              <div className="bg-red-950/80 p-3 rounded-xl border border-amber-400/40 text-amber-200 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>7:00 PM ONWARDS</span>
              </div>
            </div>
          </div>

          {/* 90s Pixel Travel Animation Map Track */}
          <div className="my-8 bg-gradient-to-r from-green-950 via-amber-950 to-red-950 p-6 rounded-2xl border-4 border-amber-400 relative overflow-hidden">
            
            <div className="flex justify-between text-xs font-pixel text-amber-300 mb-4">
              <span>🏠 YOUR HOUSE</span>
              <span>🛣️ 90s HIGHWAY</span>
              <span>🏰 SHAADI MANDAP</span>
            </div>

            {/* Highway Road */}
            <div className="relative h-20 bg-gray-900 rounded-xl border-y-2 border-dashed border-yellow-400 flex items-center">
              
              {/* Vehicle Choice Toggle */}
              <div className="absolute left-2 top-2 flex gap-1 z-10">
                <button
                  onClick={() => setVehicleType('🛺')}
                  className={`text-xs px-2 py-0.5 rounded ${vehicleType === '🛺' ? 'bg-amber-400 text-black' : 'bg-red-900 text-white'}`}
                >
                  🛺 AUTO
                </button>
                <button
                  onClick={() => setVehicleType('🚗')}
                  className={`text-xs px-2 py-0.5 rounded ${vehicleType === '🚗' ? 'bg-amber-400 text-black' : 'bg-red-900 text-white'}`}
                >
                  🚗 MARUTI 800
                </button>
              </div>

              {/* Moving Vehicle */}
              <div
                className="absolute text-4xl sm:text-5xl transition-all duration-700 ease-out"
                style={{ left: `${vehiclePos}%` }}
              >
                {vehicleType}
              </div>

              {/* Destination Mandap */}
              <div className="absolute right-3 text-4xl animate-bounce">
                🏰
              </div>

            </div>

          </div>

          {/* Google Maps Button */}
          <ShaadiButton
            onClick={handleDrive}
            playSound={false}
            size="xl"
            iconLeft={<Navigation className="w-7 h-7 fill-current" />}
            className="shadow-[0_0_25px_rgba(255,215,0,0.8)] border-4 border-red-900"
          >
            MUJHE SHAADI TAK LE CHALO →
          </ShaadiButton>

        </div>

      </div>

    </section>
  );
}
