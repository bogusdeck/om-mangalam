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
  mandapHero: {
    divineBlessingSanskrit: '॥ दिव्य आशीर्वाद ॥',
    blessingSubtitle: (brideName, groomName) => `Vighnaharta Ganesha Blesses ${brideName} & ${groomName}`,
    ganeshToastTemplate: (brideName, groomName) =>
      `🐘 || ॐ गं गणपतये नमः || Lord Ganesha showers divine blessings upon ${brideName} & ${groomName}! ✨`,
    swahaButtonText: '🔥 SWAHA',
    flankCharacters: {
      leftFlank: {
        shehnai: { role: 'Shehnai Ustad', dialogue: '🎺 Mangal Dhun!' },
        nagada: { role: 'Nagada Master', dialogue: '🥁 Dama Dam Mast!' },
        ghoomar: { role: 'Royal Ghoomar', dialogue: '💃 Padharo Sa!' },
      },
      rightFlank: {
        dholak: { role: 'Baraat Dholak', dialogue: '🥁 Dhol Tashan!' },
        baraati: { role: 'Baraat Dhol', dialogue: '💃 Shava Shava!' },
        sangeetNritya: { role: 'Sangeet Nritya', dialogue: '✨ Nachde Ne Saare!' },
      },
    },
  },

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
  // 6. SECTION 4: ROYAL WEDDING EVENTS & ITINERARY (3-DAY TIMELINE)
  // ---------------------------------------------------------------------------
  eventsSection: {
    badge: '★ 3-DAY ROYAL EXTRAVAGANZA ★',
    heading: 'WEDDING EVENTS & ITINERARY',
    subheading: 'Clear your schedule. Sleep is strictly optional.',
    footnote: '🪔 ALL EVENTS INCLUDE 100% UNLIMITED ROYAL BANQUET HOSPITALITY 🪔',
    events: [
      {
        id: 'haldi',
        day: 1,
        dayLabel: 'Day 1',
        dayDate: '17th November 2026',
        title: 'Haldi Ceremony',
        subtitle: 'Yellow Paint War',
        date: '17th November 2026',
        time: '10:00 AM onwards',
        venue: 'Royal Poolside Lawn',
        blurb: 'Where turmeric is applied with extreme prejudice. Nobody leaves without looking like a yellow Teletubby.',
        dress: 'Strictly Yellow (Will be ruined anyway)',
        accent: '#d49a18',
        emoji: '🌼',
      },
      {
        id: 'mehendi',
        day: 1,
        dayLabel: 'Day 1',
        dayDate: '17th November 2026',
        title: 'Mehendi Ki Raat',
        subtitle: 'Henna & Hand Cramps',
        date: '17th November 2026',
        time: '4:00 PM onwards',
        venue: 'Mughal Courtyard',
        blurb: 'Sitting still for 4 straight hours while refusing to drink water so you don’t have to use the restroom.',
        dress: 'Emerald Green & Festive',
        accent: '#134e3a',
        emoji: '🌿',
      },
      {
        id: 'sangeet',
        day: 1,
        dayLabel: 'Day 1',
        dayDate: '17th November 2026',
        title: 'Sangeet Night',
        subtitle: 'Bollywood Dance Off',
        date: '17th November 2026',
        time: '7:30 PM onwards',
        venue: 'Grand Kohinoor Ballroom',
        blurb: 'Where relatives who haven’t danced since 2007 suddenly become Hrithik Roshan and Prabhudeva.',
        dress: 'Bling, Glitz & High Heels',
        accent: '#6b2d7b',
        emoji: '🪩',
      },
      {
        id: 'baraat',
        day: 2,
        dayLabel: 'Day 2',
        dayDate: '18th November 2026',
        title: 'The Royal Baraat',
        subtitle: 'Road Blockade Operation',
        date: '18th November 2026',
        time: '5:00 PM onwards',
        venue: 'Palace Main Gate',
        blurb: 'Noise level: Legally questionable. Groom rides a horse while relatives dance 2 inches away from moving autos.',
        dress: 'Heavy Sherwanis & Turbans',
        accent: '#b3141c',
        emoji: '🎺',
      },
      {
        id: 'vivah',
        day: 2,
        dayLabel: 'Day 2',
        dayDate: '18th November 2026',
        title: 'The Shubh Vivah',
        subtitle: 'Sacred Pheras & Vows',
        date: '18th November 2026',
        time: '8:00 PM onwards',
        venue: 'Vedic Mandap Hall',
        blurb: 'The official 7 sacred vows around the holy hawan fire where Brad & Megan sign away single status forever.',
        dress: 'Traditional Royal Indian Wear',
        accent: '#8a1c3f',
        emoji: '🔥',
      },
      {
        id: 'reception',
        day: 3,
        dayLabel: 'Day 3',
        dayDate: '19th November 2026',
        title: 'Grand Reception',
        subtitle: 'Stage Standing Marathon',
        date: '19th November 2026',
        time: '7:00 PM onwards',
        venue: 'Imperial Leela Banquet',
        blurb: 'Eat unlimited Paneer Tikka, judge the stage decor, take 500 photos with distant relatives, and exit.',
        dress: 'Black Tie, Tuxedos & Heavy Sarees',
        accent: '#b8862b',
        emoji: '👑',
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 7. SECTION 5: THE ROYAL FAMILIES (CHARACTER CARDS & BOARD OF DIRECTORS)
  // ---------------------------------------------------------------------------
  familySection: {
    badge: '★ CHARACTER CARDS & BOARD OF DIRECTORS ★',
    heading: 'THE PEOPLE RESPONSIBLE FOR THIS',
    subheading: 'The masterminds who funded, executed, and micro-managed everything',
    filters: [
      { id: 'all', label: '🌟 ALL MASTERMINDS', variant: 'gold' },
      { id: 'bride', label: "👰 BRIDE'S SIDE (SHARMA SQUAD)", variant: 'pink' },
      { id: 'groom', label: "🕺 GROOM'S SIDE (VERMA WARRIORS)", variant: 'orange' },
    ],
    members: [
      {
        id: 'bride_papa',
        role: "BRIDE'S PAPA",
        name: 'Ramesh Sharma',
        title: 'Chief Financial Officer & Card Signer',
        quote: '“Bhai, budget limits is just a state of mind.”',
        avatar: '👨🏻‍💼',
        stats: 'Budget Overruns: +340%',
        side: 'bride',
      },
      {
        id: 'bride_mom',
        role: "BRIDE'S MOM",
        name: 'Sunita Sharma',
        title: 'Head of Operations & Emotional Blackmail',
        quote: '“Khana achha nahi hua toh log kya kahenge?!”',
        avatar: '👩🏻‍💼',
        stats: 'Tears per minute: 4.2',
        side: 'bride',
      },
      {
        id: 'groom_mom',
        role: "GROOM'S MOM",
        name: 'Anita Verma',
        title: 'Future CEO of “Beta, Bahu Ko Bolna…”',
        quote: '“Brad couldn’t even find his socks yesterday.”',
        avatar: '👩🏻',
        stats: 'Jewelry Weight: 4.8 kg',
        side: 'groom',
      },
      {
        id: 'groom_dad',
        role: "GROOM'S DAD",
        name: 'Rajesh Verma',
        title: 'Sponsor. Investor. Occasional DJ.',
        quote: '“Baraat noise level must cross 120 decibels.”',
        avatar: '👨🏻',
        stats: 'Whisky Stock: Unlimited',
        side: 'groom',
      },
      {
        id: 'chacha',
        role: 'OVER-ENTHUSIASTIC CHACHA',
        name: 'Mukesh Chacha',
        title: 'Head of Baraat Dance Choreography',
        quote: '“Naagin dance is mandatory for everyone!”',
        avatar: '🕺🏻',
        stats: 'Stamina: 100% (with Old Monk)',
        side: 'groom',
      },
      {
        id: 'cousins',
        role: 'REEL-CREATOR COUSINS',
        name: 'Sneha & Rohan',
        title: 'Official Instagram Reel Directors',
        quote: '“Hold the pose, the lighting is aesthetic!”',
        avatar: '👯‍♀️',
        stats: 'Photos Taken: 14,890',
        side: 'bride',
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
