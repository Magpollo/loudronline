'use client';
import Image from 'next/image';
import { getStrapiMedia, formatEventDate, getEventLocations } from '@/utils/helpers';
import EventCard from '@/components/EventCard';
import EventsWidget, { EventsWidgetClient } from '@/components/EventsWidget';
/* import { EventsWidgetClient } from '@/components/EventsWidget'; */

import FilterNavBar from '@/components/FilterNavBar';
import { useState } from 'react';

interface EventDetailsProps {
  event: LoudrEvent;
  initialEvents: LoudrEvent[];
  locations: string[];
}

function WebEventLayout({ event }: { event: LoudrEvent }) {
  return (
    <div className="hidden lg:flex space-x-8">
      <div className="w-3/4">
        <Image
          src={getStrapiMedia(event.attributes.headerImage)}
          alt={event.attributes.title}
          width={500}
          height={450}
          className="w-full h-auto max-h-[450px] object-contain"
        />
      </div>
      <div className="w-3/4 space-y-0">
        <h1 className="text-4xl font-bold main-heading">{event.attributes.title}</h1>
        <p className="text-md text-[#FF9D12]">
          { formatEventDate(event.attributes.date) }
        </p>
        <p className="text-lg text-[#697077]">{event.attributes.location}</p>
        
        <div className="w-full pt-2 py-4">
          <button className="bg-white text-black px-8 py-4 rounded-md w-full text-lg font-semibold hover:bg-gray-100 transition-colors">
            GET TICKETS
          </button>
        </div>
        
        <div className="prose prose-lg w-full">
          <p>{event.attributes.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function EventDetails({ event, initialEvents, locations }: EventDetailsProps) {
    const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
    const [filteredEvents, setFilteredEvents] = useState<LoudrEvent[]>(initialEvents);
  
    const handleLocationClick = (location: string) => {
      setSelectedLocation(prevLocation => {
        const newLocation = prevLocation === location ? undefined : location;
        if (newLocation) {
          setFilteredEvents(initialEvents.filter(event => event.attributes.location === newLocation));
        } else {
          setFilteredEvents(initialEvents);
        }
        return newLocation;
      });
    };
  
    return (
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          <FilterNavBar
            items={locations.map(location => ({ id: location, name: location }))}
            selectedItem={selectedLocation}
            onItemClick={handleLocationClick}
            title="Filter by location"
          />
          
          <EventsWidgetClient 
            events={filteredEvents}
            className="mt-4"
          />
        </div>
      </div>
    );
}