import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'ES' | 'EN' | 'FR';
type Currency = 'USD' | 'EUR' | 'MXN' | 'COP';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  ES: {
    'home.hero.title': 'Rituales que elevan tu día.',
    'home.hero.subtitle': 'Chocolate vegano premium + botánicos funcionales diseñados para transformar momentos en rituales.',
    'home.hero.btn1': 'Explorar Universos',
    'home.hero.btn2': 'Claim your Ritual Pass',
    'nav.shop': 'Shop',
    'nav.moods': 'Universos',
    'nav.ritual': 'Ritual Builder',
    'nav.impact': 'Impacto',
    'nav.challenge': 'Reto 21 Días',
  },
  EN: {
    'home.hero.title': 'Rituals that elevate your day.',
    'home.hero.subtitle': 'Premium vegan chocolate + functional botanicals designed to transform moments into rituals.',
    'home.hero.btn1': 'Explore Universes',
    'home.hero.btn2': 'Claim your Ritual Pass',
    'nav.shop': 'Shop',
    'nav.moods': 'Universes',
    'nav.ritual': 'Ritual Builder',
    'nav.impact': 'Impact',
    'nav.challenge': '21-Day Challenge',
  },
  FR: {
    'home.hero.title': 'Des rituels qui élèvent votre journée.',
    'home.hero.subtitle': 'Chocolat vegan premium + plantes fonctionnelles conçus pour transformer les moments en rituels.',
    'home.hero.btn1': 'Explorer les Univers',
    'home.hero.btn2': 'Réclamez votre Ritual Pass',
    'nav.shop': 'Boutique',
    'nav.moods': 'Univers',
    'nav.ritual': 'Créateur de Rituel',
    'nav.impact': 'Impact',
    'nav.challenge': 'Défi 21 Jours',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    if (saved === 'EN' || saved === 'FR' || saved === 'ES') return saved;
    return 'ES';
  });
  const [currency, setCurrency] = useState<Currency>('USD');

  useEffect(() => {
    localStorage.setItem('app_language', language);
    const langMap: Record<Language, string> = {
      'ES': 'es',
      'EN': 'en',
      'FR': 'fr'
    };

    const targetLang = langMap[language];
    
    // Set cookie for initial load or next reload
    document.cookie = `googtrans=/es/${targetLang}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/es/${targetLang}; path=/`;

    const triggerTranslation = () => {
      const selectElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = targetLang;
        selectElement.dispatchEvent(new Event('change'));
      } else {
        // Retry after a short delay if Google Translate hasn't loaded yet
        setTimeout(() => {
          const retrySelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (retrySelect) {
            retrySelect.value = targetLang;
            retrySelect.dispatchEvent(new Event('change'));
          }
        }, 1000);
      }
    };

    triggerTranslation();
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currency, setCurrency, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
