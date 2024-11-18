import { getPlaylistTracks } from '@/app/games/music-head/utils/spotifyApi';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tracks = await getPlaylistTracks();
    return NextResponse.json({ tracks });
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    let errorMessage = 'Failed to fetch playlist tracks';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message.includes('Missing')) {
        statusCode = 400;
        errorMessage = error.message;
      } else if (error.message.includes('No tracks found')) {
        statusCode = 404;
        errorMessage = error.message;
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
