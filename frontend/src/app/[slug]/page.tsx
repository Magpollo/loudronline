import Reads from '@/components/Reads';
import Videos from '@/components/Videos';
import Events from '@/components/Events';

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return <section>{renderPage(slug)}</section>;
}

function renderPage(slug: string) {
  if (slug === 'reads') {
    return <Reads slug={slug} />;
  } else if (slug === 'videos') {
    return <Videos slug={slug} />;
  } else if (slug === 'events') {
    return <Events slug={slug} />;
  }
}
