interface LoudrEvent {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description?: string;
    postContent?: string;
    date: string;
    location: string;
    cover: string;
    url: string;
  };
}

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

interface Tag {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}
