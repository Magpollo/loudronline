'use client';

import { useCallback } from 'react';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import VideoCard from './VideoCard';
import FilterNavBar from './FilterNavBar';

export default function Videos({
  initialVideos,
  categories,
}: {
  initialVideos: any[];
  categories: any[];
}) {
  const fetchVideos = useCallback(
    async (page: number, category: string | null) => {
      const response = await fetch(
        `/api/videos?page=${page}&category=${encodeURIComponent(
          category || ''
        )}`
      );
      if (!response.ok) throw new Error('Failed to fetch videos');
      return response.json();
    },
    []
  );

  const {
    items: videos,
    loading,
    hasMore,
    selectedCategory,
    handleCategoryClick,
  } = useInfiniteScroll({
    initialItems: initialVideos,
    fetchMore: fetchVideos,
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
        {videos.map((video: any) => (
          <VideoCard
            key={video.id}
            video={video}
          />
        ))}
      </div>
      {loading && <p>Loading more videos...</p>}
      {!hasMore && <p>No more videos to load.</p>}
    </section>
  );
}
