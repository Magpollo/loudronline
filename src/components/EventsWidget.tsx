import Link from 'next/link';
import EventCard from './EventCard';
import { getEvents } from '@/utils/helpers';

interface EventsWidgetProps {
  className?: string;
  filteredEvents?: LoudrEvent[];
}

interface EventsWidgetClientProps {
  events: LoudrEvent[];
  className?: string;
}

export function EventsWidgetClient({
  events,
  className,
}: EventsWidgetClientProps) {
  return (
    <section className={`w-full h-fit mt-3 font-plus-jakarta ${className}`}>
      <h1 className="text-2xl ml-2 mb-4">
        <span className="font-larken">Upcoming Events</span>
        <Link href="/events">
          <span className="px-4 py-2 font-plus-jakarta text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer hover float-right">
            View all
          </span>
        </Link>
      </h1>
      <div className="flex flex-row p-2 overflow-x-scroll no-scrollbar">
        {events.map((event: LoudrEvent) => (
          <div
            key={event.id}
            className="w-[300px] flex-shrink-0 mr-6"
          >
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function EventsWidget({
  className,
  filteredEvents,
}: EventsWidgetProps) {
  const events = filteredEvents || (await getEvents());
  return (
    <EventsWidgetClient
      events={events}
      className={className}
    />
  );
}
