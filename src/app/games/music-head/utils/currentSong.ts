import { songs } from './songs';

export function getDailySong() {
  // Use a base date to ensure consistent rotation
  const baseDate = new Date('2024-11-17').getTime(); // Changed to November 17, 2024
  const today = new Date().getTime();

  // Calculate days since base date
  const daysSinceBase = Math.floor((today - baseDate) / (1000 * 60 * 60 * 24));

  // Use modulo to cycle through songs if we've gone through all songs
  const songIndex = daysSinceBase % songs.length;

  // Get the song for today (sequential order)
  const song = songs[songIndex];

  return {
    id: song.id,
    title: song.title,
    artist: song.artist,
    filename: song.filename,
    fileVersion: daysSinceBase.toString(),
  };
}

export const currentSong = getDailySong();
