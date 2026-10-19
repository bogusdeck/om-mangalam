/**
 * ===========================================================================
 * WEDDING THEME CONFIGURATION
 * ===========================================================================
 * Change ACTIVE_THEME below to set the client's theme for the entire website.
 * No URL parameters or browser caches needed!
 * 
 * Options:
 *   - 'maroon'  : Royal Maroon (Velvet Red, Gold Accents)
 *   - 'peacock' : Peacock Teal & Gold (#0F3D3E)
 *   - 'emerald' : Emerald Green with Rani Pink (#134E3A)
 * ===========================================================================
 */
export const ACTIVE_THEME = 'maroon';

// Re-export wedding client config for convenience
export { WEDDING_CONFIG } from './weddingConfig';

/**
 * All Available Themes:
 * To add a new theme for a client in the future, simply add a new entry here.
 */
export const THEMES = {
  maroon: {
    id: 'maroon',
    name: 'Royal Maroon (Current)',
    label: 'Royal Maroon',
    hex: '#701015',
    swatchColor: '#701015',
    borderColor: '#EAB308',
    bgClass: 'bg-gradient-to-b from-red-950 via-[#701015] to-red-950',
    dotColor: '#ffd700',
    dotOpacity: 'opacity-15',
    glowClass: 'bg-amber-500/15',
    badgeClass: 'bg-red-900/90 border-2 border-amber-400/80 text-amber-300',
    titleColor: 'gold-gradient-text',
    heartColor: 'text-red-500',
    charBadgeClass: 'bg-red-950/85 text-amber-400 border border-amber-500/30',
    blessingCardBg: 'bg-gradient-to-b from-[#3a000a] via-[#4d000f] to-[#250006]',
  },
  peacock: {
    id: 'peacock',
    name: 'Peacock Teal & Gold',
    label: 'Peacock Teal',
    hex: '#0F3D3E',
    swatchColor: '#0F3D3E',
    borderColor: '#C9A24A',
    bgClass: 'bg-gradient-to-b from-[#072425] via-[#0F3D3E] to-[#051c1d]',
    dotColor: '#C9A24A',
    dotOpacity: 'opacity-20',
    glowClass: 'bg-[#C9A24A]/20',
    badgeClass: 'bg-[#061f20]/95 border-2 border-[#C9A24A] text-[#F2A33A]',
    titleColor: 'gold-gradient-text',
    heartColor: 'text-[#E0457B]',
    charBadgeClass: 'bg-[#061f20]/90 text-[#F2A33A] border border-[#C9A24A]/40',
    blessingCardBg: 'bg-gradient-to-b from-[#041a1b] via-[#0b2f30] to-[#041a1b]',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald with Rani Pink',
    label: 'Emerald Green',
    hex: '#134E3A',
    swatchColor: '#134E3A',
    borderColor: '#D4A84B',
    bgClass: 'bg-gradient-to-b from-[#09261c] via-[#134E3A] to-[#061c14]',
    dotColor: '#D4A84B',
    dotOpacity: 'opacity-20',
    glowClass: 'bg-[#E0457B]/15',
    badgeClass: 'bg-[#072118]/95 border-2 border-[#D4A84B] text-[#D4A84B]',
    titleColor: 'gold-gradient-text',
    heartColor: 'text-[#E0457B]',
    charBadgeClass: 'bg-[#072118]/90 text-[#D4A84B] border border-[#D4A84B]/40',
    blessingCardBg: 'bg-gradient-to-b from-[#051c14] via-[#0e3b2b] to-[#051c14]',
  },
};

/**
 * Returns the theme object for the given id, falling back to ACTIVE_THEME
 */
export function getTheme(themeId) {
  return THEMES[themeId] || THEMES[ACTIVE_THEME] || THEMES.maroon;
}

/**
 * Returns an array of all configured themes
 */
export function getAllThemes() {
  return Object.values(THEMES);
}
