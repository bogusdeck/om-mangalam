import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  THEMES,
  ACTIVE_THEME,
  getTheme,
  getAllThemes,
} from '../config/themeConfig';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // Theme is strictly governed by ACTIVE_THEME in config
  const [themeId, setThemeId] = useState(ACTIVE_THEME);

  // Sync state if ACTIVE_THEME in config changes
  useEffect(() => {
    setThemeId(ACTIVE_THEME);
  }, [ACTIVE_THEME]);

  const themeConfig = getTheme(themeId);

  // In-memory switch (for testing when switcher is enabled) without touching URL
  const setTheme = (newThemeId) => {
    if (!THEMES[newThemeId]) return;
    setThemeId(newThemeId);
    if (typeof window !== 'undefined') {
      document.body.style.backgroundColor = THEMES[newThemeId].hex;
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.backgroundColor = themeConfig.hex;
    }
  }, [themeConfig.hex]);

  const value = {
    themeId,
    themeConfig,
    themes: getAllThemes(),
    setTheme,
    isTheme: (id) => themeId === id,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    const fallbackTheme = getTheme(ACTIVE_THEME);
    return {
      themeId: ACTIVE_THEME,
      themeConfig: fallbackTheme,
      themes: getAllThemes(),
      setTheme: () => {},
      isTheme: (id) => id === ACTIVE_THEME,
    };
  }
  return context;
}
