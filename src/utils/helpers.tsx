// date helper function
export function formatDate(date: string): string {
  // convert date format '2023-12-08T20:22:56.341Z' to '2 hours ago' if less than 24 hours or '2 days ago' if more than 24 hours or '8 December 2023' if more than 7 days
  const now = new Date();
  const postDate = new Date(date);
  const diff = now.getTime() - postDate.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  if (hours < 24) {
    if (hours < 1) {
      return `${Math.floor(diff / (1000 * 60))} minutes ago`;
    }
    return `${hours} hours ago`;
  }
  if (days < 7) {
    if (days === 1) return `${days} day ago`;
    return `${days} days ago`;
  }
  return `${postDate.getDate()} ${postDate.toLocaleString('default', {
    month: 'long',
  })} ${postDate.getFullYear()}`;
}

export async function getData(url: string): Promise<any[]> {
  const urlWithHost = `${getStrapiUrl()}/${url}`;
  const res = await fetch(urlWithHost, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${process.env.STRAPI_CLIENT_SECRET}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 30 }, // Revalidate every 30 seconds
  });
  const { data } = await res.json();
  return data;
}

export function formatYoutubeUrl(url: string): string {
  // get youtube video id and return embed url
  const videoId = url.split('v=')[1];
  return `https://www.youtube.com/embed/${videoId}`;
}

// chnage url if in development mode or production mode
export function getStrapiUrl(): string {
  // return process.env.NODE_ENV === 'development'
  //   ? `http://localhost:1337`
  //   : process.env.STRAPI_URL_BASE ||
  //       'https://loudronline-backend-production.up.railway.app';
  // use prod env for now
  return (
    process.env.STRAPI_URL_BASE ||
    'https://loudronline-backend-production.up.railway.app'
  );
}

export function getStrapiMedia(media: any) {
  if (media && media.data && media.data.attributes) {
    const { url } = media.data.attributes;
    const imageUrl = url.startsWith('/') ? getStrapiUrl() + url : url;
    return imageUrl;
  }
  return '/placeholder.jpeg';
}
