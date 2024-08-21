import { getEvents } from '@/utils/helpers';
import Events from '@/components/Events';

export default async function Page() {
  const events = await getEvents();

  return <Events initialEvents={events} />;
}
