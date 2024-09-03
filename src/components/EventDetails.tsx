'use client';
import Image from 'next/image';
import { getStrapiMedia, formatEventDate } from '@/utils/helpers';
import EventsWidget, { EventsWidgetClient } from '@/components/EventsWidget';
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
          src={getStrapiMedia(event.attributes.cover)}
          alt={event.attributes.title}
          width={500}
          height={450}
          className="w-full h-auto max-h-[450px] object-contain"
        />
      </div>
      <div className="w-3/4 space-y-0">
        <h1 className="text-4xl font-bold main-heading">
          {event.attributes.title}
        </h1>
        <p className="text-md text-[#FF9D12]">
          {formatEventDate(event.attributes.date)}
        </p>
        <p className="text-lg text-[#697077]">{event.attributes.location}</p>

        <div className="w-full pt-2 py-4">
          <a
            href={event.attributes.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-8 py-4 rounded-md w-full text-lg font-semibold hover:bg-gray-100 transition-colors text-center"
          >
            GET TICKETS
          </a>
        </div>

        <div className="prose prose-lg w-full">
          <p>{event.attributes.description}</p>
        </div>
      </div>
    </div>
  );
}

export default function EventDetails({
  event,
  initialEvents,
  locations,
}: EventDetailsProps) {
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>(
    undefined
  );
  const [filteredEvents, setFilteredEvents] =
    useState<LoudrEvent[]>(initialEvents);

  const handleLocationClick = (location: string) => {
    setSelectedLocation((prevLocation) => {
      const newLocation = prevLocation === location ? undefined : location;
      if (newLocation) {
        setFilteredEvents(
          initialEvents.filter(
            (event) => event.attributes.location === newLocation
          )
        );
      } else {
        setFilteredEvents(initialEvents);
      }
      return newLocation;
    });
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="lg:hidden mb-8">
        <div className="flex flex-col h-fit cursor-pointer p-2">
          <div className="relative h-[300px] w-full mb-2">
            <Image
              src={getStrapiMedia(event.attributes.cover)}
              alt={event.attributes.title}
              width={300}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="mb-2 text-2xl font-larken font-bold truncate">
            {event.attributes.title}
          </h1>
          <p className="mb-1 text-[#FF9D12]">
            {formatEventDate(event.attributes.date)}
          </p>
          <p className="mb-1 text-[#697077]">{event.attributes.location}</p>
        </div>
      </div>

      <WebEventLayout event={event} />

      <div className="lg:hidden mt-8 space-y-8">
        <div className="flex justify-center">
          <a
            href={event.attributes.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black px-8 py-4 rounded-md w-full sm:w-2/3 text-lg font-semibold hover:bg-gray-100 transition-colors text-center"
          >
            GET TICKETS
          </a>
        </div>

        <div className="prose prose-lg max-w-none">
          <p>{event.attributes.description}</p>
        </div>
      </div>

      <div className="mt-12">
        <EventsWidgetClient
          events={filteredEvents}
          className="mt-4"
        />
      </div>
    </div>
  );
}
