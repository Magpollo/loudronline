import Reads from '@/components/Reads';
import { getData } from '@/utils/helpers';

export default async function Page() {
  const reads = await getReads();

  return <Reads posts={reads} />;
}

async function getReads() {
  const reads = await getData(
    'api/posts?sort[0]=publishedAt:desc&filters[$and][0][contentType][$ne]=events&filters[$and][1][contentType][$ne]=videos&populate[0]=headerImage&populate[1]=post_categories&fields[0]=title&fields[1]=postId&fields[2]=slug&fields[3]=description&fields[4]=contentType&fields[5]=publishedAt&publicationState=live&locale[0]=en'
  );

  return reads;
}
