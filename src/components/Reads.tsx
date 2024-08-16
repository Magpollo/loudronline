'use client';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ReadCard from './ReadCard';

export default function Reads({
  initialPosts,
  categories,
}: {
  initialPosts: any[];
  categories: any[];
}) {
  const fetchMorePosts = async (page: number, category: string | null) => {
    const response = await fetch(
      `/api/reads?page=${page}&category=${category || ''}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch more posts');
    }
    return response.json();
  };

  const {
    items: posts,
    loading,
    hasMore,
    handleCategoryClick,
    selectedCategory,
  } = useInfiniteScroll({
    initialItems: initialPosts,
    fetchMore: fetchMorePosts,
  });

  return (
    <section className="py-3 px-7">
      <h2 className="font-bold font-plus-jakarta">Filter by category</h2>
      <nav className="flex justify-start">
        <div className="h-fit w-fit no-scrollbar flex flex-row items-center py-2 overflow-x-scroll">
          {categories.map((category: any) => (
            <div
              key={category.id}
              className={`px-4 py-2 text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer ${
                selectedCategory === category.attributes.name
                  ? 'bg-[#FF9D12] text-white dark:bg-[#FF9D12] dark:text-white hover:bg-[#FF9D12]/80 dark:hover:bg-[#FF9D12]/80'
                  : ''
              }`}
              onClick={() => handleCategoryClick(category.attributes.name)}
            >
              {category.attributes.name}
            </div>
          ))}
        </div>
      </nav>

      <div className="my-5 h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-4 font-plus-jakarta">
        {posts.map((post: any) => (
          <ReadCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
      {loading && <p>Loading more posts...</p>}
      {!hasMore && <p>No more posts to load.</p>}
    </section>
  );
}
