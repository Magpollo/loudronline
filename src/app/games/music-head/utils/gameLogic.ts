export interface Song {
  id: string;
  title: string;
  artist: string;
  previewUrl: string;
}

export interface GameState {
  currentSong: Song | null;
  score: number;
  skipsUsed: number;
  incorrectGuesses: number;
  isPlaying: boolean;
  gameEnded: boolean;
  playbackDuration: number;
  currentPlaybackTime: number;
  isCouchPlay: boolean;
  lastPlayedDate: string | null;
  currentSongId: string | null;
}

export type GameAction =
  | { type: 'LOAD_SONG'; payload: Song }
  | { type: 'MAKE_GUESS'; payload: string }
  | { type: 'SKIP' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'UPDATE_PLAYBACK_TIME'; payload: number }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'TOGGLE_COUCH_PLAY' }
  | { type: 'NEXT_SONG'; payload: Song };

export const initialState: GameState = {
  currentSong: null,
  score: 0,
  skipsUsed: 0,
  incorrectGuesses: 0,
  isPlaying: false,
  gameEnded: false,
  playbackDuration: 1,
  currentPlaybackTime: 0,
  isCouchPlay: false,
  lastPlayedDate: null,
  currentSongId: null,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'LOAD_SONG':
      if (state.currentSong === null) {
        return {
          ...state,
          currentSong: action.payload,
          isPlaying: false,
          currentPlaybackTime: 0,
        };
      }
      return state;
    case 'MAKE_GUESS':
      if (state.currentSong) {
        const normalizedGuess = action.payload.toLowerCase();
        const normalizedTitle = state.currentSong.title.toLowerCase();

        const isCorrect =
          normalizedGuess.includes(normalizedTitle) ||
          normalizedTitle.includes(normalizedGuess);

        if (isCorrect) {
          const roundScore = calculateFinalScore(
            state.skipsUsed,
            state.incorrectGuesses
          );
          return {
            ...state,
            gameEnded: true,
            score: roundScore,
            lastPlayedDate: !state.isCouchPlay
              ? new Date().toISOString()
              : state.lastPlayedDate,
          };
        }
        return {
          ...state,
          incorrectGuesses: state.incorrectGuesses + 1,
          gameEnded: state.incorrectGuesses >= 2,
        };
      }
      return state;
    case 'SKIP':
      const newSkipsUsed = state.skipsUsed + 1;
      const newPlaybackDuration = newSkipsUsed + 1; // 1, 2, or 3 seconds
      return {
        ...state,
        skipsUsed: newSkipsUsed,
        playbackDuration: newPlaybackDuration,
        currentPlaybackTime: 0, // Reset playback time on skip
      };
    case 'PLAY':
      return { ...state, isPlaying: true };
    case 'PAUSE':
      return { ...state, isPlaying: false };
    case 'UPDATE_PLAYBACK_TIME':
      const newPlaybackTime = action.payload;
      if (newPlaybackTime >= state.playbackDuration) {
        // If playback time exceeds allowed duration, pause the audio
        return {
          ...state,
          isPlaying: false,
          currentPlaybackTime: state.playbackDuration,
        };
      }
      return { ...state, currentPlaybackTime: newPlaybackTime };
    case 'END_GAME':
      const finalScore = calculateFinalScore(
        state.skipsUsed,
        state.incorrectGuesses
      );
      return { ...state, gameEnded: true, score: finalScore };
    case 'RESET_GAME':
      return {
        ...initialState,
        currentSongId: state.currentSongId,
        lastPlayedDate: new Date().toISOString(),
      };
    case 'TOGGLE_COUCH_PLAY':
      return {
        ...initialState,
        isCouchPlay: !state.isCouchPlay,
        currentSongId: state.currentSongId,
      };
    case 'NEXT_SONG':
      return {
        ...initialState,
        currentSong: action.payload,
        isCouchPlay: true,
      };
    default:
      return state;
  }
}

function calculateFinalScore(
  skipsUsed: number,
  incorrectGuesses: number
): number {
  const score = 10 - skipsUsed * 2 - incorrectGuesses * 2;
  return Math.max(0, score);
}

// Add helper function to check if user can play today
export function canPlayToday(
  lastPlayedDate: string | null,
  currentSongId: string | null,
  savedSongId: string
): boolean {
  if (!lastPlayedDate || !currentSongId) return true;

  // Allow play if it's a new song
  if (currentSongId !== savedSongId) return true;

  // Check if last played was on a different day
  const lastPlayed = new Date(lastPlayedDate);
  const today = new Date();
  return lastPlayed.toDateString() !== today.toDateString();
}
