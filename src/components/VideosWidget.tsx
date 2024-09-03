import { getData } from '@/utils/helpers';
import Link from 'next/link';
import VideoCard from './VideoCard';

export default async function VideosWidget({ props }: { props: any }) {
  const videos = await getLatestVideos();
  return (
    <section {...props}>
      <h1 className="text-2xl ml-2 mb-6">
        <span className="font-larken">Watch Stuff</span>
        <Link href="/videos">
          <span className="px-4 py-2 font-plus-jakarta text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer hover float-right">
            View all
          </span>
        </Link>
      </h1>
      <div className="h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-4 font-plus-jakarta">
        {videos &&
          videos.map((video: any) => (
            <VideoCard
              key={video.attributes.videoId}
              video={video}
            />
          ))}
      </div>
    </section>
  );
}

async function getLatestVideos(): Promise<any> {
  const videos = await getData(
    'api/videos?sort[0]=date:desc&populate[post_categories][populate]=*&populate[creator][populate]=*&fields[0]=title&fields[1]=videoId&fields[2]=slug&fields[3]=description&fields[4]=publishedAt&fields[5]=url&fields[6]=date&publicationState=live&locale[0]=en&pagination[start]=0&pagination[limit]=3'
  );
  return videos;
}
