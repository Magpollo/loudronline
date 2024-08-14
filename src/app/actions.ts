'use server';

import { getData } from '@/utils/helpers';

export async function searchPosts(query: string) {
  if (!query) {
    return [];
  }

  const posts = await getData(
    `api/posts?filters[$or][0][title][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}&populate[0]=headerImage&populate[1]=post_categories&fields[0]=title&fields[1]=slug&fields[2]=contentType&publicationState=live&locale[0]=en`
  );

  return posts.map((post: any) => ({
    title: post.attributes.title,
    url: `/${post.attributes.contentType}/${post.attributes.slug}`,
    contentType: post.attributes.contentType,
  }));
}
