import { getData } from '@/utils/helpers';
import Events from '@/components/Events';

async function getEvents(): Promise<LoudrEvent[]> {
  const events = await getData(
    'api/posts?sort[0]=date:asc&filters[contentType][$eq]=events&populate=headerImage&fields[0]=title&fields[1]=id&fields[2]=slug&fields[3]=description&fields[4]=date&fields[5]=location&publicationState=live&locale[0]=en'
  );
  return events;
}

export default async function Page() {
  const events = await getEvents();

  return <Events events={events} />;
}
