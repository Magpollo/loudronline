import EventCard from '@/components/EventCard';

export default function Events({ events }: { events: LoudrEvent[] }) {
  return (
    <section className="p-5">
      <div className="my-5 h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-8 font-plus-jakarta">
        {events &&
          events.map((event: LoudrEvent) => (
            <EventCard
              key={event.id}
              event={event}
            />
          ))}
      </div>
    </section>
  );
}
