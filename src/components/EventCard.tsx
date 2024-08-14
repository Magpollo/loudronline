import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/utils/helpers';

interface EventCardProps {
  event: LoudrEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.attributes.slug}`}
      className="flex flex-col h-fit cursor-pointer p-2 hover:bg-slate-500/10"
    >
      <div className="relative w-full h-[300px] mb-3">
        <Image
          src={getStrapiMedia(event.attributes.headerImage)}
          alt={event.attributes.title}
          width={300}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="mb-2 font-bold">{event.attributes.title}</h1>
      <p className="mb-1 text-[#FF9D12]">
        {new Date(event.attributes.date).toLocaleDateString('en', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
      <p className="text-[#697077]">{event.attributes.location}</p>
    </Link>
  );
}
