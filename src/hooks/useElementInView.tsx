import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export function useElementInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  useEffect(() => {
    if (isInView && ref.current) {
      console.log('Element in view:', isInView);
      console.log('Element id:', ref.current.id);
      setActiveSection(ref.current.id);
    }
  }, [isInView]);

  return { ref, activeSection };
}
