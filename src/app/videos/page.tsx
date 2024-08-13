import { getData } from '@/utils/helpers';
import Videos from '@/components/Videos';

async function getVideos(): Promise<any> {
  const videos = await getData(
    'api/posts?sort[0]=publishedAt:desc&filters[contentType][$eq]=videos&populate[creator][populate][0]=profileImage&populate[creator][fields][1]=name&populate[creator][fields][2]=creatorId&populate[post_categories][fields][0]=name&fields[0]=title&fields[1]=slug&fields[2]=postId&fields[3]=youtubeUrl&fields[4]=publishedAt&pagination[start]=0&pagination[limit]=3&publicationState=live&locale[0]=en'
  );
  return videos;
}

export default async function Page() {
  const videos = await getVideos();

  return <Videos videos={videos} />;
}
