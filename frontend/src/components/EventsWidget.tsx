import Image from 'next/image';

interface Event {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description?: string;
    postContent?: string;
    date: string;
    location: string;
    headerImage: any;
  };
}

export default async function EventsWidget({ props }: { props: any }) {
  const events = await getEvents();
  return (
    <section
      {...props}
      className="w-full h-fit mt-3 font-plus-jakarta"
    >
      <h1 className="text-2xl ml-2 mb-4 font-larken">Upcoming Events</h1>
      <div className="flex flex-row p-2 overflow-x-scroll no-scrollbar">
        {events.data &&
          events.data.map((event: Event) => (
            <div
              key={event.id}
              className="flex flex-col h-fit w-fit mr-6 cursor-pointer"
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

async function getEvents(): Promise<{ data: Event[] }> {
  const res = await fetch(
    `http://localhost:1337/api/posts?sort[0]=date:asc&filters[contentType][$eq]=events&populate=headerImage&fields[0]=title&fields[1]=id&fields[2]=slug&fields[3]=description&fields[4]=postContent&fields[5]=date&fields[6]=location&publicationState=live&locale[0]=en`,
    {
      method: 'GET',
      headers: {
        Authorization: `bearer ${process.env.STRAPI_CLIENT_SECRET}`,
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();
  return data;
}
