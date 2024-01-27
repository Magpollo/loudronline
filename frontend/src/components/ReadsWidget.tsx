import Image from 'next/image';
import Link from 'next/link';
import { formatDate, getData } from '@/utils/helpers';

export default async function EventsWidget({ props }: { props: any }) {
  const posts = await getLatestPosts();
  return (
    <section {...props}>
      <h1 className="text-2xl ml-2 mb-6 font-larken">
        <span>Latest news</span>
        <Link href="/events">
          <span className="px-4 py-2 font-plus-jakarta text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer hover float-right">
            View all
          </span>
        </Link>
      </h1>
      <div className="h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-4 font-plus-jakarta">
        {posts &&
          posts.map((post: any) => (
            <Link
              href={`/reads/${post.attributes.slug}`}
              key={post.id}
            >
              <div className="bg-[#F5F5F5] dark:bg-[#24272a] p-2 mb-5">
                <div className="relative h-[200px] w-full">
                  <Image
                    src={`http://localhost:1337${post.attributes.headerImage.data.attributes.url}`}
                    alt={post.attributes.title}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-row my-3 items-center">
                  <span className="py-2 px-4 rounded-sm bg-[#FF9D12]/20 text-[#FF9D12] font-bold mr-3 capitalize">
                    {post.attributes.post_categories.data[0].attributes.name}
                  </span>
                  <span className="text-[#697077]">
                    {formatDate(post.attributes.publishedAt)}
                  </span>
                </div>
                <h1 className="mb-1 font-bold">{post.attributes.title}</h1>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}

async function getLatestPosts(): Promise<any> {
  const posts = await getData(
    'api/posts?sort[0]=publishedAt:desc&filters[contentType][$ne]=events&populate[0]=headerImage&populate[1]=post_categories&fields[0]=title&fields[1]=postId&fields[2]=slug&fields[3]=description&fields[4]=contentType&fields[5]=publishedAt&pagination[start]=0&pagination[limit]=3&publicationState=live&locale[0]=en'
  );
  return posts;
}
