'use client';

import Link from 'next/link';
import React, { ReactElement, ReactNode } from 'react';
import { useElementInView } from '@/hooks/useElementInView';

const categories = [
  { id: 1, name: 'Events', slug: 'events' },
  { id: 2, name: 'Shop', slug: 'shop' },
  { id: 3, name: 'Reads', slug: 'reads' },
  { id: 4, name: 'Watch', slug: 'watch' },
];

interface HomeContentProps {
  children: ReactNode;
}

export default function HomeContent({
  children,
}: HomeContentProps): ReactElement {
  const { setRef, activeSection } = useElementInView();

  return (
    <main
      id="homepage-content"
      className="flex flex-col px-4"
    >
      <div className="sticky left-0 right-0 px-4 py-4 top-[70px] md:top-[64px] z-30 w-full bg-white dark:bg-[#1d2023] md:fixed">
        <div className="h-fit w-full no-scrollbar flex flex-row items-center p-2 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/#${category.slug}`}
            >
              <div
                className={`px-4 py-2 text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer ${
                  activeSection === category.slug
                    ? 'bg-black text-white dark:bg-white dark:text-black font-semibold'
                    : ''
                }`}
              >
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            // clone the child element and add the ref
            ref: setRef,
          } as React.RefAttributes<HTMLDivElement>);
        }
        return child;
      })}
    </main>
  );
}
