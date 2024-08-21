import { getData } from '@/utils/helpers';
import EventDetails from '@/components/EventDetails';

interface EventCardProps {
    event: LoudrEvent;
  }

async function getEvent(slug: string) {
  const event = await getData(
    `api/posts?filters[$and][0][contentType][$eq]=events&filters[$and][1][slug][$eq]=${slug}&populate=*`
  );
  return event[0];
}

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  const event: LoudrEvent = await getEvent(params.slug);

  return <EventDetails event={event} />;;
}
