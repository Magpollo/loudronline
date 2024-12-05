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
  Song,
} from '@/app/games/music-head/utils/gameLogic';
import {
  encryptData,
  decryptData,
} from '@/app/games/music-head/utils/encryption';
import { currentSong } from '@/app/games/music-head/utils/currentSong';
import { getTodaysSong } from '@/app/games/music-head/utils/spotifyApi';
export const GAME_STATE_KEY = 'musichead_game_state'; // Key for saved game state

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
  });
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialization effect
  useEffect(() => {
    initializeGame()
      .catch((error) => {
        console.error('Failed to initialize game:', error);
      })
      .finally(() => {
        setMounted(true);
        setIsLoading(false);
      });

    async function initializeGame() {
      if (typeof window === 'undefined') return;

      const dailySong = await getTodaysSong();

      dispatch({
        type: 'RESTORE_STATE',
        payload: {
          ...initialState,
          currentSong: dailySong,
          currentSongId: dailySong.id,
        },
      });
      // Get saved state and daily backup
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      const dailyBackup = localStorage.getItem(
        GAME_STATE_KEY + '_daily_backup'
      );

      if (savedState) {
        try {
          const decryptedState = decryptData(savedState);

          // Check if we need to reset state due to song change
          if (shouldResetState(decryptedState.currentSongId, dailySong.id)) {
            // Clear all stored states
            localStorage.removeItem(GAME_STATE_KEY);
            localStorage.removeItem(GAME_STATE_KEY + '_daily_backup');

            // Start fresh with new song
            dispatch({
              type: 'RESTORE_STATE',
              payload: {
                ...initialState,
                currentSong: dailySong,
                currentSongId: dailySong.id,
              },
            });
            return;
          }

          if (dailyBackup) {
            try {
              const backupState = decryptData(dailyBackup);
              if (backupState.currentSongId === dailySong.id) {
                // Remove daily backup after restoring
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
            const canPlay = canPlayToday(
              decryptedState.lastPlayedDate,
              decryptedState.currentSongId,
              dailySong.id
            );

            // Restore the state, but reset the game if we can't play today or the game has ended
            dispatch({
              type: 'RESTORE_STATE',
              payload: {
                ...decryptedState,
                currentSong: dailySong,
                gameEnded: !canPlay || decryptedState.gameEnded,
              },
            });
          }
        } catch (error) {
          console.error('Failed to load saved game state:', error);
        }
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-loudr-yellow border-t-transparent" />
      </div>
    );
  }

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
