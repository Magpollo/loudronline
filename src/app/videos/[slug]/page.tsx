import { getData } from '@/utils/helpers';

async function getVideo(slug: string) {
  const video = await getData(
    `api/posts?filters[slug][$eq]=${slug}&populate=*`
  );
  return video[0];
}

export default async function VideoPage({
  params,
}: {
  params: { slug: string };
}) {
  const video = await getVideo(params.slug);
  return <div>{video.attributes.title}</div>;
}
