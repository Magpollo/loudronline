import Link from 'next/link';
import { getData } from '@/utils/helpers';
import ReadCard from './ReadCard';

export default async function ReadsWidget({ props }: { props: any }) {
  const posts = await getLatestPosts();
  return (
    <section {...props}>
      <h1 className="text-2xl ml-2 mb-6">
        <span className="font-larken">Latest news</span>
        <Link href="/reads">
          <span className="px-4 py-2 font-plus-jakarta text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer hover float-right">
            View all
          </span>
        </Link>
      </h1>
      <div className="h-fit w-full grid grid-cols-1 md:grid-cols-3 gap-4 font-plus-jakarta">
        {posts &&
          posts.map((post: any) => (
            <ReadCard
              key={post.id}
              post={post}
            />
          ))}
      </div>
    </section>
  );
}

async function getLatestPosts(): Promise<any> {
  const posts = await getData(
    'api/posts?sort[0]=date:desc&filters[$and][0][contentType][$ne]=events&filters[$and][1][contentType][$ne]=videos&populate[0]=headerImage&populate[1]=post_categories&fields[0]=title&fields[1]=postId&fields[2]=slug&fields[3]=description&fields[4]=contentType&fields[5]=publishedAt&fields[6]=date&pagination[start]=0&pagination[limit]=3&publicationState=live&locale[0]=en'
  );
  return posts;
}
