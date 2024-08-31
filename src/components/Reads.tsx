'use client';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import ReadCard from './ReadCard';
import FilterNavBar from './FilterNavBar';

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
      <FilterNavBar
        items={categories.map((category) => ({
          id: category.id,
          name: category.attributes.name,
        }))}
        selectedItem={selectedCategory}
        onItemClick={handleCategoryClick}
        title="Filter by category"
      />

      <div className="my-16 h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-4 font-plus-jakarta">
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
