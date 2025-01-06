import { useRef, useEffect, useState } from 'react';

//detect which section is in view
export function useElementInView() {
  const ref = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // if the element is intersecting, set the active section to the id of the element
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // trigger when 50% of the element is visible
        rootMargin: '80px 0px 30px 0px', // add 80px to the top and 30px to the bottom of the viewport
      }
    );
    const currentRef = ref.current; // get the current ref
    Object.values(currentRef).forEach((el) => {
      // loop through the elements and observe them
      if (el) observer.observe(el); // observe the element if it exists
    });

    // cleanup function to remove the observer when the component unmounts
    return () => {
      Object.values(currentRef).forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // function to set the ref for the element
  const setRef = (el: HTMLDivElement | null) => {
    if (el && el.id) {
      ref.current[el.id] = el;
    }
  };

  return { setRef, activeSection };
}
