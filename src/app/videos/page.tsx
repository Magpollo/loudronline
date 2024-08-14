import { getData } from '@/utils/helpers';
import Videos from '@/components/Videos';

export default async function Page() {
  const videos = await getData(
    'api/posts?filters[contentType][$eq]=videos&populate[headerImage][fields][0]=url&populate[post_categories][fields][0]=name&populate[post_categories][fields][1]=slug&populate[creator][populate][0]=profileImage&populate[creator][fields][0]=name&populate[creator][fields][1]=creatorId&fields[0]=title&fields[1]=postId&fields[2]=slug&fields[3]=description&fields[4]=contentType&fields[5]=publishedAt&fields[6]=youtubeUrl&publicationState=live&locale[0]=en'
  );
  const categories = await getData(
    'api/post-categories?sort[0]=id:asc&filters[$and][0][slug][$ne]=events&filters[$and][1][slug][$ne]=videos&fields[0]=name&fields[1]=id&fields[2]=slug&publicationState=live&locale[0]=en'
  );

  return (
    <Videos
      initialVideos={videos}
      categories={categories}
    />
  );
}
