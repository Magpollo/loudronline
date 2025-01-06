import { Song } from '@/app/games/music-head/context/gameLogic';
import { getDailySong as getLocalTodaysSong } from './currentSong';
import { songs } from './songs';

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

interface TokenCache {
  accessToken: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

async function getSpotifyAccessToken(): Promise<string> {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    throw new Error('Missing Spotify credentials in environment variables');
  }

  // Check if we have a valid cached token
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.accessToken;
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

    // Cache the token with expiration
    tokenCache = {
      accessToken: data.access_token,
      // Set expiration 5 minutes before actual expiry to be safe
      expiresAt: Date.now() + (data.expires_in - 300) * 1000,
    };

    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error);
    throw error;
  }
}

export async function getPlaylistTracks(): Promise<Song[]> {
  try {
    // Try Spotify API first
    if (!process.env.SPOTIFY_PLAYLIST_ID) {
      throw new Error('Missing SPOTIFY_PLAYLIST_ID in environment variables');
    }

    const accessToken = await getSpotifyAccessToken();
    const playlistId = process.env.SPOTIFY_PLAYLIST_ID;

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks?fields=items(track(id,name,artists,preview_url))&market=US`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        tokenCache = null;
        return getPlaylistTracks();
      }
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
    console.warn('Falling back to local tracks:', error);
    // Fallback to local songs
    return songs.map((song) => ({
      id: song.id,
      title: song.title,
      artist: song.artist,
      previewUrl: `/songs/${song.filename}`,
    }));
  }
}

// Get next random song for couch play
export const getRandomSong = async (): Promise<Song> => {
  try {
    const response = await fetch('/api/playlist-tracks');
    if (!response.ok) throw new Error('Failed to fetch playlist tracks');
    const data = await response.json();
    const tracks = data.tracks;
    return tracks[Math.floor(Math.random() * tracks.length)];
  } catch (error) {
    console.warn('Falling back to local random song:', error);
    const localSong = songs[Math.floor(Math.random() * songs.length)];
    return {
      id: localSong.id,
      title: localSong.title,
      artist: localSong.artist,
      previewUrl: `/songs/${localSong.filename}`,
    };
  }
};

// Get today's song
export const getTodaysSong = async (): Promise<Song> => {
  try {
    const response = await fetch('/api/daily-song');
    if (!response.ok) throw new Error('Failed to fetch daily song');
    return await response.json();
  } catch (error) {
    console.warn('Falling back to local daily song:', error);
    const localSong = getLocalTodaysSong();
    return {
      id: localSong.id,
      title: localSong.title,
      artist: localSong.artist,
      previewUrl: `/songs/${localSong.filename}`,
    };
  }
};
