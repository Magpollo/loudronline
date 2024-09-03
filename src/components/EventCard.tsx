import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia, formatEventDate } from '@/utils/helpers';

interface EventCardProps {
  event: LoudrEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.attributes.slug}`}
      className="flex flex-col h-fit cursor-pointer p-2 hover:bg-slate-500/10"
    >
      <div className="relative h-[300px] w-full mb-2">
        <Image
          src={getStrapiMedia(event.attributes.cover)}
          alt={event.attributes.title}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="mb-2 font-bold truncate">{event.attributes.title}</h1>
      <p className="mb-1 text-[#FF9D12]">
        {formatEventDate(event.attributes.date)}
      </p>
      <p className="mb-1 text-[#697077]">{event.attributes.location}</p>
    </Link>
  );
}
