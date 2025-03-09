import { useEffect } from 'react';

type TransitionOptions = {
  duration?: number;
  delay?: number;
  easing?: string;
};

export const pageTransition = ({
  duration = 300,
  delay = 0,
  easing = 'ease-in-out'
}: TransitionOptions = {}) => {
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = `opacity ${duration}ms ${easing} ${delay}ms, transform ${duration}ms ${easing} ${delay}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [duration, delay, easing]);
};