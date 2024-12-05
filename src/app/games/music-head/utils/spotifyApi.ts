import { Song } from './gameLogic';

interface SpotifyTrack {
  id: string;
  name: string;
  artists: { name: string }[];
  preview_url: string;
}

interface PlaylistResponse {
  tracks: {
    items: {
      track: SpotifyTrack;
    }[];
  };
}

async function getSpotifyAccessToken(): Promise<string> {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error('Missing Spotify credentials in environment variables');
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify token error:', errorData);
      throw new Error(`Failed to get Spotify token: ${response.status}`);
    }

    const data = await response.json();
    if (!data.access_token) {
      throw new Error('No access token in response');
    }

    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw error;
  }
}

export async function getPlaylistTracks(): Promise<Song[]> {
  if (!process.env.SPOTIFY_PLAYLIST_ID) {
    throw new Error('Missing SPOTIFY_PLAYLIST_ID in environment variables');
  }

  try {
    const accessToken = await getSpotifyAccessToken();
    const playlistId = process.env.SPOTIFY_PLAYLIST_ID;

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(id,name,artists,preview_url))`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.items) {
      throw new Error('Invalid response format from Spotify API');
    }

    const tracks = data.items
      .filter((item: any) => item?.track?.preview_url)
      .map((item: any) => ({
        id: item.track.id,
        title: item.track.name,
        artist: item.track.artists.map((artist: any) => artist.name).join(', '),
        previewUrl: item.track.preview_url,
      }));

    if (tracks.length === 0) {
      throw new Error('No playable tracks found in playlist');
    }

    return tracks;
  } catch (error) {
    console.error('Error in getPlaylistTracks:', error);
    throw error;
  }
}

// Get next random song for couch play
export const getRandomSong = async (): Promise<Song> => {
  const response = await fetch('/api/playlist-tracks');
  const data = await response.json();
  const tracks = data.tracks;
  return tracks[Math.floor(Math.random() * tracks.length)];
};

// Add this new function export
export const getTodaysSong = async (): Promise<Song> => {
  const response = await fetch('/api/daily-song');
  const data = await response.json();
  return data;
};
