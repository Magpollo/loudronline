import EventsWidget from '@/components/EventsWidget';
import Link from 'next/link';
import ShopCTA from '@/components/ShopCallToAction';
import ReadsWidget from '@/components/ReadsWidget';
import VideosWidget from '@/components/VideosWidget';
import { ReactElement } from 'react';

const categories = [
  {
    id: 1,
    name: 'Events',
    slug: 'events',
  },
  {
    id: 2,
    name: 'Shop',
    slug: 'shop',
  },
  {
    id: 3,
    name: 'Reads',
    slug: 'reads',
  },
  {
    id: 4,
    name: 'Videos',
    slug: 'videos',
  },
  {
    id: 5,
    name: 'Quicklinks',
    slug: 'quicklinks',
  },
];

export default function Home(): ReactElement {
  return (
    <main className="flex flex-col px-4">
      <div className="sticky py-4 top-[70px] md:top-[64px] z-30 w-full bg-white dark:bg-[#1d2023] md:fixed md:z-50">
      <div className="h-fit w-full no-scrollbar flex flex-row items-center p-2 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/#${category.slug}`}
            >
              <div className="px-4 py-2 text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer hover">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <EventsWidget className="md:mt-14" />
      <ShopCTA />
      <ReadsWidget props={{ className: 'my-10' }} />
      <VideosWidget props={{ className: 'my-5' }} />
    </main>
  );
}
