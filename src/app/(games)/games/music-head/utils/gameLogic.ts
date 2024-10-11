export interface Song {
  id: string;
  title: string;
  artist: string;
  previewUrl: string;
}

export interface GameState {
  currentSong: Song | null;
  score: number;
  skipsLeft: number;
  guessesLeft: number;
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
  | { type: 'END_GAME' };

export const initialState: GameState = {
  currentSong: null,
  score: 100, // Start with maximum score
  skipsLeft: 2,
  guessesLeft: 3,
  isPlaying: false,
  gameEnded: false,
  playbackDuration: 1, // Start with 1 second
  currentPlaybackTime: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'LOAD_SONG':
      return { ...state, currentSong: action.payload };
    case 'MAKE_GUESS':
      if (
        state.currentSong &&
        (action.payload.toLowerCase() ===
          state.currentSong.title.toLowerCase() ||
          action.payload.toLowerCase() ===
            state.currentSong.artist.toLowerCase())
      ) {
        // Correct guess
        return { ...state, gameEnded: true };
      } else {
        // Incorrect guess
        const newGuessesLeft = state.guessesLeft - 1;
        const newScore = Math.max(0, state.score - 10); // Deduct 10 points for incorrect guess
        return {
          ...state,
          guessesLeft: newGuessesLeft,
          score: newScore,
          gameEnded: newGuessesLeft === 0,
        };
      }
    case 'SKIP':
      const newSkipsLeft = state.skipsLeft - 1;
      const newPlaybackDuration = state.playbackDuration + 1;
      let newScore;
      if (newPlaybackDuration === 2) {
        newScore = 70;
      } else if (newPlaybackDuration === 3) {
        newScore = 50;
      } else {
        newScore = state.score;
      }
      return {
        ...state,
        skipsLeft: newSkipsLeft,
        playbackDuration: newPlaybackDuration,
        score: newScore,
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
      return { ...state, gameEnded: true };
    default:
      return state;
  }
}
