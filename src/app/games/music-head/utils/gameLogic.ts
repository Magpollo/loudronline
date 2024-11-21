import {
  decryptData,
  encryptData,
} from '@/app/games/music-head/utils/encryption';
import { GAME_STATE_KEY } from '@/app/games/music-head/context/GameContext';

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
  | { type: 'MAKE_GUESS'; payload: { guess: string; isCorrect: boolean } }
  | { type: 'SKIP' }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'UPDATE_PLAYBACK_TIME'; payload: number }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'NEXT_SONG'; payload: Song }
  | { type: 'SWITCH_TO_COUCH_PLAY'; payload: Song }
  | { type: 'SWITCH_TO_DAILY_MODE'; payload: Song }
  | { type: 'RESTORE_STATE'; payload: Partial<GameState> };

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
        if (action.payload.isCorrect) {
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
            currentSongId: state.currentSong.id,
          };
        }
        const newIncorrectGuesses = state.incorrectGuesses + 1;
        const gameEnded = newIncorrectGuesses >= 3;
        return {
          ...state,
          incorrectGuesses: newIncorrectGuesses,
          gameEnded,
          // Set these values if game ends due to too many incorrect guesses
          ...(gameEnded && !state.isCouchPlay
            ? {
                lastPlayedDate: new Date().toISOString(),
                currentSongId: state.currentSong.id,
              }
            : {}),
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
    case 'NEXT_SONG':
      return {
        ...initialState,
        currentSong: action.payload,
        isCouchPlay: true,
      };
    case 'SWITCH_TO_COUCH_PLAY':
      const stateToSave = {
        score: state.score,
        skipsUsed: state.skipsUsed,
        incorrectGuesses: state.incorrectGuesses,
        gameEnded: state.gameEnded,
        lastPlayedDate: state.lastPlayedDate,
        currentSongId: state.currentSongId,
      };
      console.log('saving backup state');
      console.log(stateToSave);

      localStorage.setItem(
        GAME_STATE_KEY + '_daily_backup',
        encryptData(stateToSave)
      );
      console.log('switched to couch play');

      return {
        ...initialState,
        isCouchPlay: true,
        currentSong: action.payload,
        currentSongId: action.payload.id,
      };
    case 'SWITCH_TO_DAILY_MODE':
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      const dailyBackup = localStorage.getItem(
        GAME_STATE_KEY + '_daily_backup'
      );

      // First check the backup state (from current session)
      if (dailyBackup) {
        try {
          const backupState = decryptData(dailyBackup);
          // If backup state exists and is for the current song
          if (backupState.currentSongId === action.payload.id) {
            console.log('using backup state');
            console.log(backupState);
            return {
              ...backupState,
              currentSong: action.payload,
              isCouchPlay: false,
            };
          } else {
            console.log('backup state is for a different song');
            localStorage.removeItem(GAME_STATE_KEY + '_daily_backup');
          }
        } catch (error) {
          console.error('Failed to load daily backup state:', error);
        }
      }

      if (savedState) {
        try {
          const decryptedState = decryptData(savedState);
          if (!decryptedState.isCouchPlay) {
            const canPlay = canPlayToday(
              decryptedState.lastPlayedDate,
              decryptedState.currentSongId,
              action.payload.id
            );
            return {
              ...decryptedState,
              currentSong: action.payload,
              isCouchPlay: false,
              gameEnded: !canPlay || decryptedState.gameEnded,
            };
          }
        } catch (error) {
          console.error('Failed to load saved daily state:', error);
        }
      }

      // If no valid saved state or backup, start fresh
      return {
        ...initialState,
        isCouchPlay: false,
        currentSong: action.payload,
        currentSongId: action.payload.id,
      };
    case 'RESTORE_STATE':
      return {
        ...state,
        ...action.payload,
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
  // If we're missing either date or song ID, allow play
  if (!lastPlayedDate || !currentSongId) {
    return true;
  }

  // Always allow play if it's a different song
  if (currentSongId !== savedSongId) {
    return true;
  }

  // For same song, check if it's a different day
  const lastPlayed = new Date(lastPlayedDate);
  const today = new Date();
  return lastPlayed.toDateString() !== today.toDateString();
}

// Add new function to check if state needs reset
export function shouldResetState(
  currentSongId: string | null,
  savedSongId: string
): boolean {
  // If there's no saved song ID, no need to reset
  if (!currentSongId) {
    return false;
  }

  // Reset if the song has changed
  return currentSongId !== savedSongId;
}
