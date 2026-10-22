/**
 * ===========================================================================
 * WEDDING INVITATION MASTER CONFIGURATION
 * ===========================================================================
 * Single Source of Truth for the entire website.
 * Customize bride & groom names, wedding dates, venues, photos, quotes,
 * and quirky messages here to configure the site for any couple!
 * ===========================================================================
 */

export const WEDDING_CONFIG = {
  // ---------------------------------------------------------------------------
  // 1. GENERAL & SECTION 1 (VEDIC MANDAP HERO) DETAILS
  // ---------------------------------------------------------------------------
  invocation: '|| ॐ श्री गणेशाय नमः ||',
  weddingYear: '2026',
  weddingDate: '18th November 2026',
  time: '7:00 PM ONWARDS',
  venue: 'ROYAL LEELA GRAND',

  // ---------------------------------------------------------------------------
  // 2. BRIDE DETAILS (Used across Sections 1, 2, and 3)
  // ---------------------------------------------------------------------------
  bride: {
    fullName: 'MEGAN FOX',
    shortName: 'MEGAN',
    displayName: 'Megan',
    initials: 'MF',
    roleTitle: 'THE BRIDE',
    // Set to a photo path (e.g., '/assets/photos/bride.jpg') or leave null to use the royal monogram
    photo: null,
    quote: '“Apparently, she said yes willingly.”',
    superpower: 'Shopping for 8 hours without drinking water',
    weakness: 'Cold Coffee & Instagram Reels',
    verdict: 'Approved by 14 Mami-jis & 8 Bua-jis',
    buttonText: 'SEND BLESSINGS',
    initialLikes: 999,
  },

  // ---------------------------------------------------------------------------
  // 3. GROOM DETAILS (Used across Sections 1, 2, and 3)
  // ---------------------------------------------------------------------------
  groom: {
    fullName: 'BRAD PITT',
    shortName: 'BRAD',
    displayName: 'Brad',
    initials: 'BP',
    roleTitle: 'THE GROOM',
    // Set to a photo path (e.g., '/assets/photos/groom.jpg') or leave null to use the royal monogram
    photo: null,
    quote: '“He was given approximately 3 seconds to think.”',
    superpower: 'Finishing Paneer Tikka in 4 seconds',
    weakness: 'Saying "Haji Papa" to everything',
    verdict: 'Will now ask Megan for permission for everything',
    buttonText: 'SALUTE BRAD',
    initialLikes: 404,
  },

  // ---------------------------------------------------------------------------
  // 4. SECTION 2: ROYAL FARMAN INVITATION CARD
  // ---------------------------------------------------------------------------
  invitationCard: {
    // Closed Scroll Front Cover
    closedCover: {
      invocation: '|| श्री गणेशाय नमः ||',
      title: 'वैवाहिक निमंत्रण पत्र',
      subheading: '❖ शुभ परिणय ❖',
      scrollPrompt: 'Scroll down to unfurl royal farman ↑',
    },
    // Opened Parchment Scroll
    openedFarman: {
      headerTagLeft: 'OFFICIAL FARMAN',
      headerTagRight: 'SHUBH VIVAH',
      shubhVivahHeading: '|| शुभ विवाह ||',
      blessingText: 'With the blessings of Elders, Relatives & Well Wishers',
      invitationText: 'Together with their families, cordially invite you to celebrate the wedding of',
      sacredKnotText: 'are officially tying the sacred knot!',
      dateLabel: 'DATE',
      venueLabel: 'VENUE',
      timeLabel: 'TIME',
      paneerGuaranteeBadge: '👑 100% UNLIMITED PANEER GUARANTEED 👑',
      shehnaiAudioPrompt: '✨ CLICK ANYWHERE TO PLAY AUSPICIOUS SHEHNAI ✨',
    },
  },

  // ---------------------------------------------------------------------------
  // 5. SECTION 3: MEET THE COUPLE
  // ---------------------------------------------------------------------------
  meetCouple: {
    heading: 'MEET THE TWO PEOPLE WHO SAID YES',
    subheading: '(Or were gently coerced by their respective Indian mothers)',
  },

  // ---------------------------------------------------------------------------
  // 6. SECTION 4: ROYAL WEDDING EVENTS & ITINERARY
  // ---------------------------------------------------------------------------
  eventsSection: {
    badge: '★ 3-DAY ROYAL EXTRAVAGANZA ★',
    heading: 'WEDDING EVENTS & ITINERARY',
    subheading: 'Clear your schedule. Sleep is strictly optional.',
    events: [
      {
        id: 'haldi',
        emoji: '🌼',
        name: 'HALDI CEREMONY',
        subtitle: 'Yellow Paint War',
        date: '17th November 2026',
        time: '10:00 AM ONWARDS',
        venue: 'Royal Poolside Lawn',
        dressCode: 'Strictly Yellow (Will be ruined anyway)',
        desc: 'Where turmeric is applied with extreme prejudice. Nobody leaves without looking like a yellow Teletubby.',
        cardGradient: 'from-[#78350f]/90 via-[#451a03]/90 to-[#290e02]/90',
        borderColor: 'border-amber-500/50',
      },
      {
        id: 'mehendi',
        emoji: '🌿',
        name: 'MEHENDI KI RAAT',
        subtitle: 'Henna & Hand Cramps',
        date: '17th November 2026',
        time: '4:00 PM ONWARDS',
        venue: 'Mughal Courtyard',
        dressCode: 'Emerald Green & Festive',
        desc: 'Sitting still for 4 straight hours while refusing to drink water so you don’t have to use the restroom.',
        cardGradient: 'from-[#064e3b]/90 via-[#022c22]/90 to-[#011a14]/90',
        borderColor: 'border-emerald-500/50',
      },
      {
        id: 'sangeet',
        emoji: '🎶',
        name: 'SANGEET NIGHT',
        subtitle: 'Bollywood Dance Off',
        date: '17th November 2026',
        time: '7:30 PM ONWARDS',
        venue: 'Grand Kohinoor Ballroom',
        dressCode: 'Bling, Glitz & High Heels',
        desc: 'Where relatives who haven’t danced since 2007 suddenly become Hrithik Roshan and Prabhudeva.',
        cardGradient: 'from-[#701a75]/90 via-[#4a044e]/90 to-[#2a012c]/90',
        borderColor: 'border-pink-500/50',
      },
      {
        id: 'baraat',
        emoji: '🥁',
        name: 'THE ROYAL BARAAT',
        subtitle: 'Road Blockade Operation',
        date: '18th November 2026',
        time: '5:00 PM ONWARDS',
        venue: 'Palace Main Gate',
        dressCode: 'Heavy Sherwanis & Turbans',
        desc: 'Noise level: Legally questionable. Groom rides a horse while relatives dance 2 inches away from moving autos.',
        cardGradient: 'from-[#7c2d12]/90 via-[#431407]/90 to-[#260a03]/90',
        borderColor: 'border-orange-500/50',
      },
      {
        id: 'wedding',
        emoji: '💍',
        name: 'THE SHUBH VIVAH',
        subtitle: 'Sacred Pheras & Vows',
        date: '18th November 2026',
        time: '8:00 PM ONWARDS',
        venue: 'Vedic Mandap Hall',
        dressCode: 'Traditional Royal Indian Wear',
        desc: 'The official 7 sacred vows around the holy hawan fire where Brad & Megan sign away single status forever.',
        cardGradient: 'from-[#831843]/90 via-[#500724]/90 to-[#2c0313]/90',
        borderColor: 'border-rose-500/50',
      },
      {
        id: 'reception',
        emoji: '👑',
        name: 'GRAND RECEPTION',
        subtitle: 'Stage Standing Marathon',
        date: '19th November 2026',
        time: '7:00 PM ONWARDS',
        venue: 'Imperial Leela Banquet',
        dressCode: 'Black Tie, Tuxedos & Heavy Sarees',
        desc: 'Eat unlimited Paneer Tikka, judge the stage decor, take 500 photos with distant relatives, and exit.',
        cardGradient: 'from-[#713f12]/90 via-[#422006]/90 to-[#231102]/90',
        borderColor: 'border-yellow-500/50',
      },
    ],
  },
};

/**
 * Returns formatted couple initials for the browser tab title (e.g. "MF ❤️ BP" or "PC ❤️ NJ")
 */
export function getCoupleInitials(config = WEDDING_CONFIG) {
  const brideInitials =
    config.bride.initials ||
    config.bride.fullName
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

  const groomInitials =
    config.groom.initials ||
    config.groom.fullName
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .toUpperCase();

  return `${brideInitials} ❤️ ${groomInitials}`;
}
