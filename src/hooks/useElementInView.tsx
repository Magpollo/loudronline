import { useRef, useEffect, useState } from 'react';

export function useElementInView() {
  const ref = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const root = document.getElementById('homepage-content');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root,
        threshold: 1.0,
        rootMargin: '20px',
      } // Adjust this value as needed
    );

    Object.values(ref.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      Object.values(ref.current).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const setRef = (el: HTMLDivElement | null) => {
    if (el && el.id) {
      ref.current[el.id] = el;
    }
  };

  return { setRef, activeSection };
}
