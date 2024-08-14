import Link from 'next/link';
import { getData } from '@/utils/helpers';
import EventCard from './EventCard';

export default async function EventsWidget({ props }: { props: any }) {
  const events: LoudrEvent[] = await getEvents();
  return (
    <section
      {...props}
      id="events"
      className="w-full h-fit mt-3 font-plus-jakarta"
    >
      <h1 className="text-2xl ml-2 mb-4">
        <span className="font-larken">Upcoming Events</span>
        <Link href="/events">
          <span className="px-4 py-2 font-plus-jakarta text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer hover float-right">
            View all
          </span>
        </Link>
      </h1>
      <div className="flex flex-row p-2 overflow-x-scroll no-scrollbar">
        {events &&
          events.map((event: LoudrEvent) => (
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

async function getEvents(): Promise<LoudrEvent[]> {
  const events = await getData(
    'api/posts?sort[0]=date:asc&filters[contentType][$eq]=events&populate=headerImage&fields[0]=title&fields[1]=id&fields[2]=slug&fields[3]=description&fields[4]=date&fields[5]=location&pagination[start]=0&pagination[limit]=4&publicationState=live&locale[0]=en'
  );
  return events;
}
