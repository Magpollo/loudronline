import { getEvent, getEvents, getEventLocations } from '@/utils/helpers';
import EventDetails from '@/components/EventDetails';

export default async function Page({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug);
  const initialEvents = await getEvents();
  const locations = await getEventLocations();

  return <EventDetails event={event} initialEvents={initialEvents} locations={locations} />;
}