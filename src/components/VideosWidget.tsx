import { getData } from '@/utils/helpers';
import Link from 'next/link';
import VideoCard from './VideoCard';

export default async function VideosWidget({ props }: { props: any }) {
  const videos = await getLatestVideos();
  return (
    <section
      {...props}
      id="videos"
    >
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
              key={video.attributes.postId}
              video={video}
            />
          ))}
      </div>
    </section>
  );
}

async function getLatestVideos(): Promise<any> {
  const videos = await getData(
    'api/posts?sort[0]=publishedAt:desc&filters[contentType][$eq]=videos&populate[headerImage][fields][0]=url&populate[post_categories][fields][0]=name&populate[post_categories][fields][1]=slug&populate[creator][populate][0]=profileImage&populate[creator][fields][0]=name&populate[creator][fields][1]=creatorId&fields[0]=title&fields[1]=postId&fields[2]=slug&fields[3]=description&fields[4]=contentType&fields[5]=publishedAt&fields[6]=youtubeUrl&publicationState=live&locale[0]=en&pagination[start]=0&pagination[limit]=3'
  );
  return videos;
}
