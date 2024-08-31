import { NextRequest, NextResponse } from 'next/server';
import { getData } from '@/utils/helpers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const category = searchParams.get('category') || '';

  let query = `api/posts?sort[0]=date:desc&filters[$and][0][contentType][$eq]=videos&populate[headerImage][fields][0]=url&populate[post_categories][fields][0]=name&populate[post_categories][fields][1]=slug&populate[creator][populate][0]=profileImage&populate[creator][fields][0]=name&populate[creator][fields][1]=creatorId&fields[0]=title&fields[1]=postId&fields[2]=slug&fields[3]=description&fields[4]=contentType&fields[5]=publishedAt&fields[6]=youtubeUrl&fields[7]=date&pagination[page]=${page}&pagination[pageSize]=24&publicationState=live&locale[0]=en`;

  if (category) {
    query += `&filters[$and][1][post_categories][name][$eq]=${encodeURIComponent(
      category
    )}`;
  }

  try {
    const videos = await getData(query);
    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Error fetching videos' },
      { status: 500 }
    );
  }
}
