import { getEvents, getEventLocations } from '@/utils/helpers';
import Events from '@/components/Events';

export default async function Page() {
  const events = await getEvents();
  const locations = await getEventLocations();

  return <Events initialEvents={events} locations={locations} />;
}