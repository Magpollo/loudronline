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
  playbackDuration: number; // in seconds
  currentPlaybackTime: number; // current playback time in seconds
}

export type GameAction =
  | { type: 'LOAD_SONG'; payload: Song }
  | { type: 'MAKE_GUESS'; payload: string }
  | { type: 'SKIP' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'UPDATE_PLAYBACK_TIME'; payload: number }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' };

export const initialState: GameState = {
  currentSong: null,
  score: 0,
  skipsUsed: 0,
  incorrectGuesses: 0,
  isPlaying: false,
  gameEnded: false,
  playbackDuration: 1, // Start with 1 second
  currentPlaybackTime: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'LOAD_SONG':
      return {
        ...state,
        currentSong: action.payload,
        score: 0,
        skipsUsed: 0,
        incorrectGuesses: 0,
      };
    case 'MAKE_GUESS':
      if (state.currentSong) {
        const guessLower = action.payload.toLowerCase().trim();
        const titleLower = state.currentSong.title.toLowerCase().trim();
        const artistLower = state.currentSong.artist.toLowerCase().trim();

        // Function to normalize strings for comparison
        const normalize = (str: string) =>
          str
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ');

        const normalizedGuess = normalize(guessLower);
        const normalizedTitle = normalize(titleLower);
        const normalizedArtist = normalize(artistLower);

        // Check if the guess contains all words from both the title and artist
        const isCorrect =
          normalizedTitle.every((word) => normalizedGuess.includes(word)) &&
          normalizedArtist.every((word) => normalizedGuess.includes(word));

        if (isCorrect) {
          // Correct guess
          const finalScore = calculateFinalScore(
            state.skipsUsed,
            state.incorrectGuesses
          );
          return { ...state, gameEnded: true, score: finalScore };
        } else {
          // Incorrect guess
          const newIncorrectGuesses = state.incorrectGuesses + 1;
          return {
            ...state,
            incorrectGuesses: newIncorrectGuesses,
            gameEnded: newIncorrectGuesses === 3,
            score: newIncorrectGuesses === 3 ? 0 : state.score, // Set score to 0 if all guesses are used
          };
        }
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
        currentSong: state.currentSong, // Keep the current song
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
