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
  if (!res.ok) {
    throw new Error(`Error fetching data from ${urlWithHost}, ${res.status}`);
  }
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

export async function getEvents(selectedLocation?: string | null): Promise<LoudrEvent[]> {
  let query = 'api/posts?sort[0]=date:asc&filters[contentType][$eq]=events&populate=headerImage&fields[0]=title&fields[1]=id&fields[2]=slug&fields[3]=description&fields[4]=date&fields[5]=location&pagination[page]=1&pagination[pageSize]=24&publicationState=live&locale[0]=en';
  
  if (selectedLocation) {
    query += `&filters[location][$eq]=${encodeURIComponent(selectedLocation)}`;
  }

  const events = await getData(query);
  return events;
}

export function formatEventDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  export async function getEventLocations(): Promise<string[]> {
    const locations = await getData(
      'api/posts?filters[contentType][$eq]=events&fields[0]=location&pagination[pageSize]=100&publicationState=live&locale[0]=en'
    );
    return Array.from(new Set(locations.map((event: any) => event.attributes.location)));
  }

  export async function getEvent(slug: string): Promise<LoudrEvent> {
  const events = await getData(`api/posts?filters[slug][$eq]=${slug}&filters[contentType][$eq]=events&populate=*`);
  return events[0];
}