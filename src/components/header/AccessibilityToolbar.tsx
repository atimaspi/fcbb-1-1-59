
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, Type, Contrast, Volume2 } from 'lucide-react';

interface AccessibilityToolbarProps {
  isScrolled?: boolean;
}

const AccessibilityToolbar = ({ isScrolled = false }: AccessibilityToolbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const adjustFontSize = (increment: number) => {
    const newSize = Math.max(80, Math.min(150, fontSize + increment));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast', !highContrast);
  };

  const resetAccessibility = () => {
    setFontSize(100);
    setHighContrast(false);
    document.documentElement.style.fontSize = '';
    document.documentElement.classList.remove('high-contrast');
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-all duration-300 ${
          isScrolled 
            ? 'text-gray-700 hover:text-cv-blue hover:bg-cv-blue/5' 
            : 'text-white hover:text-cv-yellow hover:bg-white/10'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Ferramentas de acessibilidade"
        aria-expanded={isOpen}
        title="Ferramentas de acessibilidade"
      >
        <Accessibility size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Accessibility size={20} className="mr-2" />
              Acessibilidade
            </h3>

            {/* Font Size Controls */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 flex items-center">
                  <Type size={16} className="mr-2" />
                  Tamanho da Fonte
                </span>
                <span className="text-sm text-gray-500">{fontSize}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => adjustFontSize(-10)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
                  aria-label="Diminuir fonte"
                >
                  A-
                </button>
                <div className="flex-1 h-2 bg-gray-200 rounded">
                  <div 
                    className="h-full bg-cv-blue rounded transition-all duration-300"
                    style={{ width: `${((fontSize - 80) / 70) * 100}%` }}
                  />
                </div>
                <button
                  onClick={() => adjustFontSize(10)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
                  aria-label="Aumentar fonte"
                >
                  A+
                </button>
              </div>
            </div>

            {/* High Contrast Toggle */}
            <div className="mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={toggleHighContrast}
                  className="sr-only"
                />
                <div className={`relative w-12 h-6 rounded-full transition-colors ${
                  highContrast ? 'bg-cv-blue' : 'bg-gray-300'
                }`}>
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    highContrast ? 'translate-x-6' : ''
                  }`} />
                </div>
                <span className="ml-3 text-sm font-medium text-gray-600 flex items-center">
                  <Contrast size={16} className="mr-2" />
                  Alto Contraste
                </span>
              </label>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetAccessibility}
              className="w-full px-4 py-2 bg-cv-blue text-white rounded-lg hover:bg-cv-blue/90 transition-colors font-medium"
            >
              Restaurar Padrão
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibilityToolbar;
