interface Post {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    cover: string;
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const posts = await getPosts(slug);

  return <section></section>;
}

async function getPosts(slug: string): Promise<{ data: Post[] }> {
  const res = await fetch(`http://localhost:1337/api/posts?`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${process.env.STRAPI_CLIENT_SECRET}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}
