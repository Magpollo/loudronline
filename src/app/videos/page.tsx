import { getData } from '@/utils/helpers';
import Videos from '@/components/Videos';

export default async function Page() {
  const videos = await getData(
    'api/videos?sort[0]=date:desc&populate[post_categories][populate]=*&populate[creator][populate]=*&fields[0]=title&fields[1]=videoId&fields[2]=slug&fields[3]=description&fields[4]=publishedAt&fields[5]=url&fields[6]=date&pagination[page]=1&pagination[pageSize]=24&publicationState=live&locale[0]=en'
  );

  const categories = await getData(
    'api/post-categories?sort[0]=id:asc&filters[slug][$ne]=videos&fields[0]=name&fields[1]=id&fields[2]=slug&publicationState=live&locale[0]=en'
  );

  return (
    <Videos
      initialVideos={videos}
      categories={categories}
    />
  );
}
