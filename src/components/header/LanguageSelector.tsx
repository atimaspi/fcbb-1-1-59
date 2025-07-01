
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from '@/contexts/InternationalizationContext';

interface Language {
  code: 'pt' | 'en';
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'pt', name: 'Português', flag: '🇨🇻' },
  { code: 'en', name: 'English', flag: '🇬🇧' }
];

interface LanguageSelectorProps {
  isScrolled?: boolean;
  isMobile?: boolean;
  onClose?: () => void;
}

const LanguageSelector = ({ isScrolled = false, isMobile = false, onClose }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleLanguageChange = (langCode: 'pt' | 'en') => {
    setLanguage(langCode);
    setIsOpen(false);
    onClose?.();
  };

  if (isMobile) {
    return (
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="px-6 py-3 text-sm font-medium text-gray-600">
          {t('accessibility.selectLanguage')}
        </div>
        <div className="space-y-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center space-x-3 w-full px-6 py-3 text-left transition-colors ${
                language === lang.code
                  ? 'text-cv-blue bg-cv-blue/10 border-l-4 border-cv-blue'
                  : 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5'
              }`}
              aria-label={`${t('accessibility.selectLanguage')}: ${lang.name}`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="font-medium">{lang.name}</span>
              {language === lang.code && <Check size={16} className="ml-auto" />}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
          isScrolled 
            ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5' 
            : 'text-white hover:text-cv-yellow hover:bg-white/10'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t('accessibility.selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Globe size={16} />
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline">{currentLanguage?.code.toUpperCase()}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50"
            role="menu"
            aria-label={t('accessibility.selectLanguage')}
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center space-x-3 w-full px-4 py-3 text-left transition-all duration-200 hover:bg-cv-blue/5 hover:text-cv-blue ${
                  language === lang.code ? 'bg-cv-blue/10 text-cv-blue' : 'text-gray-700'
                }`}
                role="menuitem"
                aria-label={`${t('accessibility.selectLanguage')}: ${lang.name}`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium flex-1">{lang.name}</span>
                {language === lang.code && <Check size={16} />}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
