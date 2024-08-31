import Image from 'next/image';
import Link from 'next/link';
import { formatDate, getStrapiMedia } from '@/utils/helpers';
import he from 'he';

interface ReadCardProps {
  post: any;
}

export default function ReadCard({ post }: ReadCardProps) {
  return (
    <Link href={`/reads/${post.attributes.slug}`}>
      <div className="bg-[#F5F5F5] dark:bg-[#24272a] p-2 mb-5 hover:bg-slate-500/10">
        <div className="relative h-[200px] w-full">
          <Image
            src={getStrapiMedia(post.attributes.headerImage)}
            alt={post.attributes.title}
            width={300}
            height={300}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-row my-3 items-center">
          {post.attributes.post_categories.data.map((category: any) => (
            <span
              key={category.id}
              className="py-1 px-1 text-sm rounded-sm bg-[#FF9D12]/20 text-[#FF9D12] font-bold mr-3 capitalize"
            >
              {category.attributes.name}
            </span>
          ))}
          <span className="text-[#697077]">
            {formatDate(post.attributes.date)}
          </span>
        </div>
        <h1 className="mb-1 font-bold truncate">
          {he.decode(post.attributes.title)}
        </h1>
      </div>
    </Link>
  );
}
