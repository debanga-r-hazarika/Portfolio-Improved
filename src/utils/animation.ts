import { useEffect, useRef } from 'react';

type AnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  animation?: 'fade-up' | 'fade-in';
  delay?: number;
};

export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px',
  animation = 'fade-up',
  delay = 0
}: AnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add animation classes when element enters viewport
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, delay);
          
          // Unobserve after animation
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Set initial styles
    element.style.opacity = '0';
    element.style.transform = animation === 'fade-up' ? 'translateY(20px)' : 'none';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, animation, delay]);

  return elementRef;
};