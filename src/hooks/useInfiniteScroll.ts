import { useState, useCallback, useEffect } from 'react';

interface UseInfiniteScrollProps<T> {
  initialItems: T[];
  fetchMore: (page: number, category: string | null) => Promise<T[]>;
  itemsPerPage?: number;
}

export function useInfiniteScroll<T>({
  initialItems,
  fetchMore,
  itemsPerPage = 24,
}: UseInfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newItems = await fetchMore(page + 1, selectedCategory);
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Error loading more items:', error);
      setHasMore(false);
    }
    setLoading(false);
  }, [loading, hasMore, page, selectedCategory, fetchMore]);

  const handleCategoryClick = useCallback(
    async (category: string) => {
      setSelectedCategory((prevCategory) =>
        prevCategory === category ? null : category
      );
      setPage(1);
      setHasMore(true);
      try {
        const filteredItems = await fetchMore(1, category);
        setItems(filteredItems);
      } catch (error) {
        console.error('Error fetching items for category:', error);
      }
    },
    [fetchMore]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreItems();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreItems]);

  return {
    items,
    loading,
    hasMore,
    handleCategoryClick,
    selectedCategory,
  };
}
