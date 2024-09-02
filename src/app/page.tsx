import EventsWidget from '@/components/EventsWidget';
import ShopCTA from '@/components/ShopCallToAction';
import ReadsWidget from '@/components/ReadsWidget';
import VideosWidget from '@/components/VideosWidget';
import HomeContent from '@/components/HomepageContent';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <HomeContent>
      <div id="events">
        <EventsWidget className="py-10 md:py-14" />
      </div>
      <div id="shop">
        <ShopCTA props={{ className: 'py-10 md:py-20' }} />
      </div>
      <div id="reads">
        <ReadsWidget props={{ className: 'py-10 md:py-14' }} />
      </div>
      <div id="watch">
        <VideosWidget props={{ className: 'py-10 md:py-10' }} />
      </div>
    </HomeContent>
  );
}
