import Image from 'next/image';
import { formatDate } from '@/utils/helpers';
import PostContentCard from '@/components/PostContentCard';
import EventsWidget from '@/components/EventsWidget';
import he from 'he';

export default function ReadDetails({ read }: { read: any }) {
  return (
    <section className="p-7 md:w-3/5 md:mx-auto">
      <Image
        src={read.attributes.headerImage.data.attributes.url}
        alt={read.attributes.title}
        width={500}
        height={500}
        className="mb-5 w-full object-cover h-80 md:h-[500px]"
      />
      <h1 className="font-larken font-bold text-2xl mb-2 tracking-wide">
        {he.decode(read.attributes.title)}
      </h1>
      {read.attributes.description && (
        <h2 className="font-plus-jakarta font-semibold mb-2">
          {he.decode(read.attributes.description)}
        </h2>
      )}
      {read.attributes.createdBy?.data && (
        <h5 className="mb-2">
          By{' '}
          <span className="underline">{`${read.attributes.createdBy.data.attributes.firstname} ${read.attributes.createdBy.data.attributes.lastname}`}</span>
        </h5>
      )}
      <h6 className="text-gray-500 mb-4">
        {formatDate(read.attributes.updatedAt)}
      </h6>
      {read.attributes.postContent && (
        <PostContentCard
          postContent={read.attributes.postContent}
          className="mb-5 font-plus-jakarta"
        />
      )}
      <EventsWidget />
    </section>
  );
}
