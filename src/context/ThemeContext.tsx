'use client'
import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';

type LayoutType = 'hydrogen' | 'helium' | 'lithium' | 'beryllium' | 'boron' | 'carbon';
type ThemeMode = 'light' | 'dark';
type Direction = 'ltr' | 'rtl';
type Color = '' | 'blue' | 'black' | 'teal' | 'violet' | 'rose' | 'yellow';
type Language = 'en' | 'id';

type ThemeContextProps = {
    mode: ThemeMode;
    layout: LayoutType;
    direction: Direction;
    color: Color;
    language: Language;
    setMode: (mode: ThemeMode) => void;
    setLayout: (layout: LayoutType) => void;
    setDirection: (dir: Direction) => void;
    setColor: (color: Color) => void;
    setLanguage: (lang: Language) => void;
};

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: any }) => {
    const [mode, setMode] = useState<ThemeMode>('light');
    const [layout, setLayout] = useState<LayoutType>('hydrogen');
    const [direction, setDirection] = useState<Direction>('ltr');
    const [color, setColor] = useState<Color>('');
    const [language, setLanguage] = useState<Language>('en');

    return (
        <ThemeContext.Provider value={{ mode, layout, direction, color, language, setMode, setLayout, setDirection, setColor, setLanguage }}>
            <div data-theme={mode} data-layout={layout} data-dir={direction} data-color={color} data-lang={language}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
    return ctx;
};
