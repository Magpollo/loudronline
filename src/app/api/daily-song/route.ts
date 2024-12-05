import { NextResponse } from 'next/server';
import { getPlaylistTracks } from '@/app/games/music-head/utils/spotifyApi';

export async function GET() {
  try {
    const tracks = await getPlaylistTracks();

    // Calculate today's song
    const baseDate = new Date('2024-03-20').getTime();
    const today = new Date().getTime();
    const daysSinceBase = Math.floor(
      (today - baseDate) / (1000 * 60 * 60 * 24)
    );
    const songIndex = daysSinceBase % tracks.length;
    const todaysSong = tracks[songIndex];

    if (!todaysSong) {
      return NextResponse.json(
        { error: 'No song available for today' },
        { status: 404 }
      );
    }

    return NextResponse.json(todaysSong);
  } catch (error) {
    console.error('Error in daily-song API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch daily song' },
      { status: 500 }
    );
  }
}
