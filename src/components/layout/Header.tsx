import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Code, Terminal } from 'lucide-react';
import Logo from '../Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-gray-900/50 border-b border-gray-200/50 dark:border-gray-700/50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <span>Debanga</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-1">
            <a href="#about" className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              About
            </a>
            <a href="#projects" className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              Projects
            </a>
            <a href="#skills" className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              Skills
            </a>
            <a href="#coursework" className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              Coursework
            </a>
            <a href="#soft-skills" className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              Soft Skills
            </a>
            <a href="#contact" className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              Contact
            </a>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all text-gray-600 dark:text-gray-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden mt-4 space-y-1 transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            <a href="#about" className="block px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              About
            </a>
            <a href="#projects" className="block px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              Projects
            </a>
            <a href="#skills" className="block px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              Skills
            </a>
            <a href="#coursework" className="block px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              Coursework
            </a>
            <a href="#soft-skills" className="block px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              Soft Skills
            </a>
            <a href="#contact" className="block px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/50 transition-all">
              Contact
            </a>
            <div className="px-4 py-2">
              <button
                onClick={toggleDarkMode}
                className="w-full p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all text-gray-600 dark:text-gray-300 flex items-center justify-center"
                aria-label="Toggle dark mode"
              >
                <Terminal className="w-4 h-4 mr-2" />
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
        </div>
      </nav>
    </header>
  );
}