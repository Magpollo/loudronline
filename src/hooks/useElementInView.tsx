import { useRef, useEffect, useState } from 'react';

export function useElementInView() {
  const ref = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
        threshold: 0.4,
        rootMargin: '80px 0px 30px 0px',
      } // Adjust this value as needed
    );
    const currentRef = ref.current;
    Object.values(currentRef).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      Object.values(currentRef).forEach((el) => {
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
