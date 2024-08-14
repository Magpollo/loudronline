'use client';

import { useState, useCallback } from 'react';
import { formatDate, getStrapiMedia } from '@/utils/helpers';
import Link from 'next/link';
import Image from 'next/image';

export default function Reads({
  initialPosts,
  categories,
}: {
  initialPosts: any[];
  categories: any[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = useCallback(
    (category: string) => {
      setSelectedCategory((prevCategory) => {
        if (prevCategory === category) {
          // If the clicked category is already selected, unselect it
          setPosts(initialPosts);
          return null;
        } else {
          // If a new category is selected, filter the posts
          const filteredPosts = initialPosts.filter((post) =>
            post.attributes.post_categories.data.some(
              (cat: any) => cat.attributes.name === category
            )
          );
          setPosts(filteredPosts);
          return category;
        }
      });
    },
    [initialPosts]
  );

  return (
    <section className="py-3 px-7">
      <h2 className="font-bold font-plus-jakarta">Filter by category</h2>
      <nav className="flex justify-start">
        <div className="h-fit w-fit no-scrollbar flex flex-row items-center py-2 overflow-x-scroll">
          {categories.map((category: any) => (
            <div
              key={category.id}
              className={`px-4 py-2 text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer ${
                selectedCategory == category.attributes.name
                  ? 'bg-[#FF9D12] text-white dark:bg-[#FF9D12] dark:text-white hover:bg-[#FF9D12]/80 dark:hover:bg-[#FF9D12]/80'
                  : ''
              }`}
              onClick={() => {
                handleCategoryClick(category.attributes.name);
              }}
            >
              {category.attributes.name}
            </div>
          ))}
        </div>
      </nav>

      <div className="my-5 h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-4 font-plus-jakarta">
        {posts.map((post: any) => (
          <Link
            href={`/reads/${post.attributes.slug}`}
            key={post.id}
          >
            <div className="bg-[#F5F5F5] dark:bg-[#24272a] p-2 mb-5 hover:bg-slate-500/50">
              <div className="relative h-[200px] w-full">
                <Image
                  src={getStrapiMedia(post.attributes.headerImage)}
                  alt={post.attributes.title}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-row my-3 items-center">
                {post.attributes.post_categories.data.map((category: any) => (
                  <span
                    key={category.id}
                    className="py-2 px-4 rounded-sm bg-[#FF9D12]/20 text-[#FF9D12] font-bold mr-3 capitalize"
                  >
                    {category.attributes.name}
                  </span>
                ))}
                <span className="text-[#697077]">
                  {formatDate(post.attributes.publishedAt)}
                </span>
              </div>
              <h1 className="mb-1 font-bold">{post.attributes.title}</h1>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
