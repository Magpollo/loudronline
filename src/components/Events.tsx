import { getData, formatDate, getStrapiUrl } from '@/utils/helpers';
import Link from 'next/link';
import Image from 'next/image';

export default async function Events({ slug }: { slug: string }) {
  const events = await getEvents();
  return (
    <section className="p-5">
      <div className="my-5 h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-8 font-plus-jakarta">
        {events &&
          events.map((event: Event) => (
            <Link
              href={`/events/${event.attributes.slug}`}
              key={event.id}
              className="flex flex-col h-fit cursor-pointer p-2 hover:bg-slate-500/10"
            >
              <div className="relative w-full h-[300px] mb-3">
                <Image
                  src={`${getStrapiUrl()}${
                    event.attributes.headerImage.data.attributes.url
                  }`}
                  alt={event.attributes.title}
                  width={300}
                  height={300}
                  // style image to be 300px by 300px
                  className="w-full h-full object-fit"
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
            </Link>
          ))}
      </div>
    </section>
  );
}

async function getEvents(): Promise<Event[]> {
  const events = await getData(
    'api/posts?sort[0]=date:asc&filters[contentType][$eq]=events&populate=headerImage&fields[0]=title&fields[1]=id&fields[2]=slug&fields[3]=description&fields[4]=date&fields[5]=location&publicationState=live&locale[0]=en'
  );
  return events;
}
