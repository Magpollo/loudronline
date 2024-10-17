'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/Footer';

export default function FooterWrapper() {
  const pathname = usePathname();

  // Add paths where you don't want to show the footer
  const hideFooterPaths = [
    '/games/music-head/game',
    '/games',
    '/games/music-head',
  ];

  if (hideFooterPaths.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
