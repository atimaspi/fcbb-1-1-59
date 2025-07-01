
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface TranslationData {
  [key: string]: string | TranslationData;
}

interface InternationalizationContextType {
  language: 'pt' | 'en';
  setLanguage: (lang: 'pt' | 'en') => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const InternationalizationContext = createContext<InternationalizationContextType | undefined>(undefined);

const translations = {
  pt: {
    nav: {
      inicio: 'Início',
      sobre: 'Sobre',
      competicoes: 'Competições',
      resultados: 'Resultados',
      selecoes: 'Seleções',
      clubes: 'Clubes',
      multimedia: 'Multimédia',
      areaReservada: 'Área Reservada'
    },
    sobre: {
      historia: 'História',
      missaoVisao: 'Missão e Visão',
      direcao: 'Direção',
      orgaosSociais: 'Órgãos Sociais',
      estatutos: 'Estatutos',
      contactos: 'Contactos'
    },
    competicoes: {
      ligaNacional: 'Liga Nacional',
      tacaCaboVerde: 'Taça de Cabo Verde',
      superTaca: 'Super Taça',
      nacionalMasculino: 'Nacional Masculino',
      regionais: 'Competições Regionais',
      calendario: 'Calendário'
    },
    accessibility: {
      skipToMain: 'Saltar para o conteúdo principal',
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      selectLanguage: 'Selecionar idioma'
    }
  },
  en: {
    nav: {
      inicio: 'Home',
      sobre: 'About',
      competicoes: 'Competitions',
      resultados: 'Results',
      selecoes: 'National Teams',
      clubes: 'Clubs',
      multimedia: 'Multimedia',
      areaReservada: 'Reserved Area'
    },
    sobre: {
      historia: 'History',
      missaoVisao: 'Mission & Vision',
      direcao: 'Board',
      orgaosSociais: 'Social Bodies',
      estatutos: 'Statutes',
      contactos: 'Contacts'
    },
    competicoes: {
      ligaNacional: 'National League',
      tacaCaboVerde: 'Cape Verde Cup',
      superTaca: 'Super Cup',
      nacionalMasculino: 'Men\'s National',
      regionais: 'Regional Competitions',
      calendario: 'Calendar'
    },
    accessibility: {
      skipToMain: 'Skip to main content',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      selectLanguage: 'Select language'
    }
  }
};

interface InternationalizationProviderProps {
  children: ReactNode;
}

export const InternationalizationProvider = ({ children }: InternationalizationProviderProps) => {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('fcbb-language');
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: 'pt' | 'en') => {
    setIsLoading(true);
    setLanguage(lang);
    localStorage.setItem('fcbb-language', lang);
    
    // Simulate loading time for potential API calls
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <InternationalizationContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isLoading }}>
      {children}
    </InternationalizationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(InternationalizationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an InternationalizationProvider');
  }
  return context;
};
