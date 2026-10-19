/**
 * ===========================================================================
 * CLIENT WEDDING DETAILS CONFIGURATION
 * ===========================================================================
 * Update bride & groom names, initials, wedding dates, and auspicious texts here
 * for each client accordingly!
 * ===========================================================================
 */

export const WEDDING_CONFIG = {
  // Bride Details
  bride: {
    fullName: 'MEGAN FOX',
    shortName: 'MEGAN',
    displayName: 'Megan',
    initials: 'MF',
  },

  // Groom Details
  groom: {
    fullName: 'BRAD PITT',
    shortName: 'BRAD',
    displayName: 'Brad',
    initials: 'BP',
  },

  // Auspicious Invocation Header (Vedic Sanskrit)
  invocation: '|| ॐ श्री गणेशाय नमः ||',

  // Wedding Date & Venue info
  weddingDate: '18th November 2026',
  weddingYear: '2026',
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
