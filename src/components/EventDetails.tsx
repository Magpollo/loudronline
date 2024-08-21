import Image from 'next/image';
import { getStrapiMedia, formatEventDate } from '@/utils/helpers';
import EventCard from '@/components/EventCard';
import EventsWidget from '@/components/EventsWidget';

interface EventDetailsProps {
  event: LoudrEvent;
}

function WebEventLayout({ event }: { event: LoudrEvent }) {
  return (
    <div className="hidden lg:flex space-x-8">
      <div className="w-full">
        <Image
          src={getStrapiMedia(event.attributes.headerImage)}
          alt={event.attributes.title}
          width={500}
          height={450}
          className="w-full h-auto max-h-[450px] object-fill"
        />
      </div>
      <div className="w-full space-y-0">
        <h1 className="text-4xl font-bold">{event.attributes.title}</h1>
        <p className="text-md text-[#FF9D12]">
          { formatEventDate(event.attributes.date) }
        </p>
        <p className="text-lg text-[#697077]">{event.attributes.location}</p>
        
        <div className="pt-2 py-4">
          <button className="bg-white text-black px-8 py-4 rounded-md w-full text-lg font-semibold hover:bg-gray-100 transition-colors">
            GET TICKETS
          </button>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p>{event.attributes.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="w-3/4 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:hidden mb-8">
        <EventCard event={event} />
      </div>
      
      <WebEventLayout event={event} />
      
      <div className="lg:hidden mt-8 space-y-8">
        <div className="flex justify-center">
          <button className="bg-white text-black px-8 py-4 rounded-md w-full sm:w-2/3 text-lg font-semibold hover:bg-gray-100 transition-colors">
            GET TICKETS
          </button>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <p>{event.attributes.description}</p>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Cities</h2>
        <EventsWidget props={{ className: 'mt-4' }} />
      </div>
    </div>
  );
}