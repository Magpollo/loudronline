import {
  getData,
  formatDate,
  getStrapiMedia,
  formatYoutubeUrl,
} from '@/utils/helpers';
import Image from 'next/image';

export default async function Videos({ videos }: { videos: any }) {
  const tags = await getTags();
  return (
    <section className="py-3 px-7">
      <h2 className="font-bold font-plus-jakarta">Filter by tag</h2>
      <nav className="flex justify-start">
        <div className="h-fit w-fit no-scrollbar flex flex-row items-center py-2 overflow-x-scroll">
          {tags &&
            tags.map((tag: Tag) => (
              <div
                key={tag.id}
                className="px-4 py-2 text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer hover"
              >
                {tag.attributes.name}
              </div>
            ))}
        </div>
      </nav>
      <div className="my-5 h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-4 font-plus-jakarta">
        {videos &&
          videos.map((video: any) => (
            <div
              key={video.attributes.postId}
              className="bg-[#F5F5F5] dark:bg-[#24272a] p-2 mb-5 hover:bg-slate-500/50"
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
                    src={getStrapiMedia(
                      video.attributes.creator.data.attributes.profileImage
                    )}
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

async function getTags(): Promise<Tag[]> {
  const reads = await getData(
    'api/post-categories?sort[0]=id:asc&filters[$and][0][slug][$ne]=events&filters[$and][1][slug][$ne]=videos&fields[0]=name&fields[1]=id&fields[2]=slug&publicationState=live&locale[0]=en'
  );
  return reads;
}
