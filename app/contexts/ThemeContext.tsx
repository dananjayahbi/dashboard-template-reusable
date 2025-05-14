'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';

// Define theme modes and customization options
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'cyan';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  primaryColor: ThemeColor;
  setPrimaryColor: (color: ThemeColor) => void;
  actualMode: PaletteMode; // The actual mode applied ('light' or 'dark')
}

// Define theme color tokens
const themeColors: Record<ThemeColor, { main: string, light: string, dark: string }> = {
  blue: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
  purple: { main: '#9c27b0', light: '#ba68c8', dark: '#7b1fa2' },
  green: { main: '#2e7d32', light: '#4caf50', dark: '#1b5e20' },
  orange: { main: '#ed6c02', light: '#ff9800', dark: '#e65100' },
  red: { main: '#d32f2f', light: '#ef5350', dark: '#c62828' },
  cyan: { main: '#0288d1', light: '#29b6f6', dark: '#01579b' },
};

// Create context
const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  setMode: () => {},
  primaryColor: 'blue',
  setPrimaryColor: () => {},
  actualMode: 'light',
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

// Theme provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Get stored theme preferences or use defaults
  const [mode, setMode] = useState<ThemeMode>('system');
  const [primaryColor, setPrimaryColor] = useState<ThemeColor>('blue');
  const [actualMode, setActualMode] = useState<PaletteMode>('light');
  // Effect to load theme preferences from localStorage (client-side only)
  useEffect(() => {
    const storedMode = localStorage.getItem('themeMode') as ThemeMode;
    const storedColor = localStorage.getItem('themeColor') as ThemeColor;
    
    if (storedMode) {
      setMode(storedMode);
    }
    
    if (storedColor && themeColors[storedColor]) {
      setPrimaryColor(storedColor);
    }
  }, []); // Only run once on component mount
  
  // Separate effect to handle mode changes and system preferences
  useEffect(() => {
    // Initialize system preference detection
    if (mode === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setActualMode(systemPrefersDark ? 'dark' : 'light');
      
      // Listen for changes in system preferences
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        setActualMode(e.matches ? 'dark' : 'light');
      };
      
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setActualMode(mode === 'dark' ? 'dark' : 'light');
    }
  }, [mode]);

  // Effect to save theme preferences when they change
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
    localStorage.setItem('themeColor', primaryColor);
  }, [mode, primaryColor]);

  // Function to update the theme mode
  const handleSetMode = (newMode: ThemeMode) => {
    setMode(newMode);
    if (newMode !== 'system') {
      setActualMode(newMode === 'dark' ? 'dark' : 'light');
    }
  };

  // Create the MUI theme based on current preferences
  const theme = createTheme({
    palette: {
      mode: actualMode,
      primary: themeColors[primaryColor],
      // Add more customizations as needed
    },
    components: {
      // Customize MUI components as needed
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: actualMode === 'dark' ? '#555' : '#ccc',
              borderRadius: '4px',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ 
      mode, 
      setMode: handleSetMode, 
      primaryColor,
      setPrimaryColor,
      actualMode
    }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
