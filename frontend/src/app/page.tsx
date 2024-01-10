import EventsWidget from '@/components/EventsWidget';
import Link from 'next/link';

import { ReactElement } from 'react';

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

export default async function Home(): Promise<ReactElement> {
  const categories: { data: Category[] } = await getCategories();

  return (
    <main className="flex flex-col px-4 overflow-hidden">
      <div className="flex justify-center">
        <div className="h-fit w-fit no-scrollbar flex flex-row items-center p-2 overflow-x-scroll">
          {categories.data &&
            categories.data.map((category: Category) => (
              <Link
                key={category.id}
                href={`/#${category.attributes.slug}`}
              >
                <div className="px-4 py-2 text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer hover">
                  {category.attributes.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
      <EventsWidget props={{ className: 'mt-10' }} />
    </main>
  );
}

async function getCategories(): Promise<{ data: Category[] }> {
  const res = await fetch(
    'http://localhost:1337/api/post-categories?sort[0]=id:asc&fields[0]=name&fields[1]=id&fields[2]=slug&publicationState=live&locale[0]=en',
    {
      method: 'GET',
      headers: {
        Authorization: `bearer ${process.env.STRAPI_CLIENT_SECRET}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();
  return data;
}
