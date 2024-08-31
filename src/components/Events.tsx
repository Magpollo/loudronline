'use client';
import EventCard from '@/components/EventCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import FilterNavBar from './FilterNavBar';

export default function Events({
  initialEvents,
  locations,
}: {
  initialEvents: LoudrEvent[];
  locations: string[];
}) {
  const fetchMoreEvents = async (page: number, location: string | null) => {
    const response = await fetch(
      `/api/events?page=${page}&location=${location || ''}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch more events');
    }
    return response.json();
  };

  const {
    items: events,
    loading,
    hasMore,
    handleCategoryClick: handleLocationClick,
    selectedCategory: selectedLocation,
  } = useInfiniteScroll({
    initialItems: initialEvents,
    fetchMore: fetchMoreEvents,
  });

  return (
    <section className="py-3 px-7">
      <FilterNavBar
        items={locations.map((location) => ({ id: location, name: location }))}
        selectedItem={selectedLocation}
        onItemClick={handleLocationClick}
        title="Filter by location"
      />

      <div className="my-16 h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-4 font-plus-jakarta">
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
