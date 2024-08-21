import { NextRequest, NextResponse } from 'next/server';
import { getData } from '@/utils/helpers';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const location = searchParams.get('location') || '';
  
    let query = `api/posts?sort[0]=date:asc&filters[contentType][$eq]=events&populate=headerImage&fields[0]=title&fields[1]=id&fields[2]=slug&fields[3]=description&fields[4]=date&fields[5]=location&pagination[page]=${page}&pagination[pageSize]=24&publicationState=live&locale[0]=en`;
  
    if (location) {
      query += `&filters[location][$eq]=${encodeURIComponent(location)}`;
    }
  
    try {
      const events = await getData(query);
      return NextResponse.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      return NextResponse.json(
        { error: 'Error fetching events' },
        { status: 500 }
      );
    }
  }
