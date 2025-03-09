import React from 'react';
import { Github, Linkedin, Mail, ChevronDown, FileDown } from 'lucide-react';
import { useScrollAnimation } from '../../utils/animation';

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-24 mt-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6" ref={useScrollAnimation({ animation: 'fade-up' })}>
            Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Debanga Raz</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto" ref={useScrollAnimation({ animation: 'fade-up', delay: 200 })}>
            A tech entrepreneur and developer crafting innovative solutions
          </p>
          
          <div className="mb-12" ref={useScrollAnimation({ animation: 'fade-up', delay: 400 })}>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <FileDown className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          </div>
          
          <div className="flex justify-center space-x-6 mb-12" ref={useScrollAnimation({ animation: 'fade-up', delay: 600 })}>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:Debangaraz2000@gmail.com"
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <a
            href="#about"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
            aria-label="Scroll to about section"
            ref={useScrollAnimation({ animation: 'fade-up', delay: 800 })}
          >
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gray-100 dark:bg-gray-800/50 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gray-100 dark:bg-gray-800/50 rounded-full blur-3xl opacity-20"></div>
      </div>
    </section>
  );
}