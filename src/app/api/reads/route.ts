import { NextRequest, NextResponse } from 'next/server';
import { getData } from '@/utils/helpers';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const category = searchParams.get('category') || '';

  let query = `api/posts?sort[0]=date:desc&filters[$and][0][contentType][$ne]=events&filters[$and][1][contentType][$ne]=videos&populate[0]=headerImage&populate[1]=post_categories&fields[0]=title&fields[1]=postId&fields[2]=slug&fields[3]=description&fields[4]=contentType&fields[5]=publishedAt&fields[6]=date&pagination[page]=${page}&pagination[pageSize]=24&publicationState=live&locale[0]=en`;

  if (category) {
    query += `&filters[$and][2][contentType][$eq]=${category.toLowerCase()}`;
  }

  try {
    const posts = await getData(query);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Error fetching posts' },
      { status: 500 }
    );
  }
}
