'use client';

import EventCard from '@/components/EventCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function Events({
  initialEvents,
}: {
  initialEvents: LoudrEvent[];
}) {
  const fetchMoreEvents = async (page: number, category: string | null) => {
    const response = await fetch(`/api/events?page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch more events');
    }
    return response.json();
  };

  const {
    items: events,
    loading,
    hasMore,
  } = useInfiniteScroll({
    initialItems: initialEvents,
    fetchMore: fetchMoreEvents,
  });

  return (
    <section className="p-5">
      <div className="my-5 h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-8 font-plus-jakarta">
        {events.map((event: LoudrEvent) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}
      </div>
      {loading && <p>Loading more events...</p>}
      {!hasMore && <p>No more events to load.</p>}
    </section>
  );
}
