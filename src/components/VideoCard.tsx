import { formatDate, getStrapiMedia, formatYoutubeUrl } from '@/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';

interface VideoCardProps {
  video: any;
}

export default function VideoCard({ video }: VideoCardProps) {
  return (
    <div className="bg-[#F5F5F5] dark:bg-[#24272a] p-2 mb-5 hover:bg-slate-500/10">
      <div className="relative h-[200px] w-full">
        <iframe
          src={formatYoutubeUrl(video.attributes.youtubeUrl)}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-row my-3 items-center">
{/*         {video.attributes.post_categories.data.map((category: any) => (
          <span
            key={category.attributes.name}
            className="py-1 px-1 text-sm rounded-sm bg-[#FF9D12]/20 text-[#FF9D12] font-bold mr-3 capitalize"
          >
            {category.attributes.name}
          </span>
        ))} */}
        <span className="text-[#697077]">
{/*           {formatDate(video.attributes.publishedAt)} */}
        </span>
      </div>
      <Link href={`/videos/${video.attributes.slug}`}>
        <div className="flex flex-row items-center">
          <div className="rounded-full h-8 w-8 mr-4">
{/*             <Image
              src={getStrapiMedia(
                video.attributes.creator.data.attributes.profileImage
              )}
              alt={video.attributes.creator.data.attributes.name}
              width={32}
              height={32}
              className="h-full w-full object-cover rounded-full"
            /> */}
          </div>
          <div>
            <h1 className="mb-1 font-bold">{video.attributes.title}</h1>
            <span className="text-[#697077]">
{/*               {video.attributes.creator.data.attributes.name} */}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
