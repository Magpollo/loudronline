import { NextRequest, NextResponse } from 'next/server';
import { getData } from '@/utils/helpers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const category = searchParams.get('category') || '';

  let query = `api/videos?sort[0]=date:desc&populate[post_categories][populate]=*&populate[creator][populate]=*&fields[0]=title&fields[1]=videoId&fields[2]=slug&fields[3]=description&fields[4]=publishedAt&fields[5]=url&fields[6]=date&pagination[page]=${page}&pagination[pageSize]=24&publicationState=live&locale[0]=en`;

  if (category) {
    query += `&filters[post_categories][name][$eq]=${encodeURIComponent(
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
