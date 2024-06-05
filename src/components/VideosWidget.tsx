import {
  formatDate,
  getData,
  formatYoutubeUrl,
  getStrapiUrl,
} from '@/utils/helpers';
import Link from 'next/link';
import Image from 'next/image';

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
            <div
              key={video.attributes.postId}
              className="bg-[#F5F5F5] dark:bg-[#24272a] p-2 mb-5 hover:bg-slate-500/10"
            >
              <div className="relative h-[200px] w-full">
                <iframe
                  src={formatYoutubeUrl(video.attributes.youtubeUrl)}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-row my-3 items-center">
                {video.attributes.post_categories.data.map((category: any) => (
                  <span
                    key={category.attributes.name}
                    className="py-2 px-4 rounded-sm bg-[#FF9D12]/20 text-[#FF9D12] font-bold mr-3 capitalize"
                  >
                    {category.attributes.name}
                  </span>
                ))}
                <span className="text-[#697077]">
                  {formatDate(video.attributes.publishedAt)}
                </span>
              </div>
              <div className="flex flex-row items-center">
                <div className="rounded-full h-8 w-8 mr-4">
                  <Image
                    src={`${getStrapiUrl()}${
                      video.attributes.creator.data.attributes.profileImage.data
                        .attributes.url
                    }`}
                    alt={video.attributes.creator.data.attributes.name}
                    width={32}
                    height={32}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h1 className="mb-1 font-bold">{video.attributes.title}</h1>
                  <span className="text-[#697077]">
                    {video.attributes.creator.data.attributes.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

async function getLatestVideos(): Promise<any> {
  const videos = await getData(
    'api/posts?sort[0]=publishedAt:desc&filters[contentType][$eq]=videos&populate[creator][populate][0]=profileImage&populate[creator][fields][1]=name&populate[creator][fields][2]=creatorId&populate[post_categories][fields][0]=name&fields[0]=title&fields[1]=slug&fields[2]=postId&fields[3]=youtubeUrl&fields[4]=publishedAt&pagination[start]=0&pagination[limit]=3&publicationState=live&locale[0]=en'
  );
  return videos;
}
