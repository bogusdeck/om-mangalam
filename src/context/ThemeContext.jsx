import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  THEMES,
  ACTIVE_THEME,
  getTheme,
  getAllThemes,
} from '../config/themeConfig';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlTheme = params.get('theme');
      if (urlTheme && THEMES[urlTheme]) return urlTheme;
    }
    return ACTIVE_THEME;
  };

  const [themeId, setThemeId] = useState(getInitialTheme);

  // Sync state if ACTIVE_THEME in config changes
  useEffect(() => {
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const urlTheme = params ? params.get('theme') : null;
    if (urlTheme && THEMES[urlTheme]) {
      setThemeId(urlTheme);
    } else {
      setThemeId(ACTIVE_THEME);
    }
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
