import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function FloatingNav() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);

      // Update active section
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 transition-transform duration-300 ${isVisible ? 'translate-x-0' : 'translate-x-20'}`}>
      <div className="flex flex-col items-center gap-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full py-4 px-2 shadow-lg">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />}
        </button>
        
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700"></div>
        
        {['hero', 'about', 'projects', 'skills', 'contact'].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className={`w-3 h-3 rounded-full transition-all ${
              activeSection === section
                ? 'bg-indigo-600 dark:bg-indigo-400 scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            aria-label={`Navigate to ${section} section`}
          />
        ))}
      </div>
    </div>
  );
}