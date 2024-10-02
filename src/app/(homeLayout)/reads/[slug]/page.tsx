import { getData } from '@/utils/helpers';
import ReadDetails from '@/components/ReadDetails';

async function getRead(slug: string) {
  const read = await getData(`api/posts?filters[slug][$eq]=${slug}&populate=*`);
  return read[0];
}

export default async function ReadPage({
  params,
}: {
  params: { slug: string };
}) {
  const read = await getRead(params.slug);
  return <ReadDetails read={read} />;
}
