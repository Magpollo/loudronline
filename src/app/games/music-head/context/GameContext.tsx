'use client';

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react';
import {
  gameReducer,
  initialState,
  GameState,
  GameAction,
  canPlayToday,
  shouldResetState,
} from '../utils/gameLogic';
import { encryptData, decryptData } from '../utils/encryption';
import { currentSong } from '../utils/currentSong';
import { Song } from '../utils/gameLogic';

export const GAME_STATE_KEY = 'musichead_game_state'; // Key for saved game state

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

// Formatted daily song object
export const dailySong: Song = {
  id: currentSong.id,
  title: currentSong.title,
  artist: currentSong.artist,
  previewUrl: `/songs/${currentSong.filename}?v=${currentSong.fileVersion}`,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    currentSong: dailySong,
  });
  const [mounted, setMounted] = useState(false);

  // Initialization effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Set mounted to true after the first render
    setMounted(true);

    // Get saved state and daily backup
    const savedState = localStorage.getItem(GAME_STATE_KEY);
    const dailyBackup = localStorage.getItem(GAME_STATE_KEY + '_daily_backup');

    if (savedState) {
      try {
        const decryptedState = decryptData(savedState);

        // Check if we need to reset state due to song change
        if (shouldResetState(decryptedState.currentSongId, currentSong.id)) {
          // Clear all stored states
          localStorage.removeItem(GAME_STATE_KEY);
          localStorage.removeItem(GAME_STATE_KEY + '_daily_backup');

          // Start fresh with new song
          dispatch({
            type: 'RESTORE_STATE',
            payload: {
              ...initialState,
              currentSong: dailySong,
              currentSongId: currentSong.id,
            },
          });
          return;
        }

        // If a daily backup exists and is for the current song
        if (dailyBackup) {
          try {
            const backupState = decryptData(dailyBackup);
            if (backupState.currentSongId === currentSong.id) {
              // Remove the daily backup after restoring
              localStorage.removeItem(GAME_STATE_KEY + '_daily_backup');
              // Restore the state
              dispatch({
                type: 'RESTORE_STATE',
                payload: {
                  ...backupState,
                  currentSong: dailySong,
                  isCouchPlay: false,
                },
              });
              return;
            }
          } catch (error) {
            console.error('Failed to load daily backup state:', error);
          }
        }

        // Only restore saved state if it's not couch play mode
        if (!decryptedState.isCouchPlay) {
          // Check if we can play today
          const canPlay = canPlayToday(
            decryptedState.lastPlayedDate,
            decryptedState.currentSongId,
            currentSong.id
          );

          // Restore the state, but reset the game if we can't play today or the game has ended
          dispatch({
            type: 'RESTORE_STATE',
            payload: {
              ...decryptedState,
              currentSong: dailySong,
              gameEnded: !canPlay || decryptedState.gameEnded, // If we can't play today, or the game has ended, reset the game
            },
          });
        }
      } catch (error) {
        console.error('Failed to load saved game state:', error);
      }
    }
  }, []);

  // State persistence effect
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const stateToSave = {
      score: state.score,
      skipsUsed: state.skipsUsed,
      incorrectGuesses: state.incorrectGuesses,
      gameEnded: state.gameEnded,
      isCouchPlay: state.isCouchPlay,
      lastPlayedDate: state.lastPlayedDate,
      currentSongId: state.currentSongId,
    };

    localStorage.setItem(GAME_STATE_KEY, encryptData(stateToSave));
  }, [state, mounted]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
