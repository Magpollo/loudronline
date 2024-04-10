import Image from 'next/image';
import Link from 'next/link';
import { getData } from '@/utils/helpers';

export default async function EventsWidget({ props }: { props: any }) {
  const events: Event[] = await getEvents();
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
          events.map((event: Event) => (
            <div
              key={event.id}
              className="flex flex-col h-fit w-fit mr-6 p-2 cursor-pointer hover:bg-slate-500/10"
            >
              <div className="w-[300px] h-[300px] mb-3">
                <Image
                  src={`http://localhost:1337${event.attributes.headerImage.data.attributes.url}`}
                  alt={event.attributes.title}
                  width={300}
                  height={300}
                  // style image to be 300px by 300px
                  className="w-[300px] h-[300px] object-cover"
                />
              </div>

              <h1 className="mb-2 font-bold">{event.attributes.title}</h1>
              <p className="mb-1 text-[#FF9D12]">
                {new Date(event.attributes.date).toLocaleDateString('en', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="text-[#697077]">{event.attributes.location}</p>
            </div>
          ))}
      </div>
    </section>
  );
}

async function getEvents(): Promise<Event[]> {
  const events = await getData(
    'api/posts?sort[0]=date:asc&filters[contentType][$eq]=events&populate=headerImage&fields[0]=title&fields[1]=id&fields[2]=slug&fields[3]=description&fields[4]=date&fields[5]=location&pagination[start]=0&pagination[limit]=4&publicationState=live&locale[0]=en'
  );
  return events;
}
