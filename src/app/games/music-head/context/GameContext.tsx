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
} from '../utils/gameLogic';
import { encryptData, decryptData } from '../utils/encryption';
import { currentSong } from '../utils/currentSong';
import { canPlayToday, Song } from '../utils/gameLogic';

export const GAME_STATE_KEY = 'musichead_game_state';

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

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

    setMounted(true);
    const savedState = localStorage.getItem(GAME_STATE_KEY);
    const dailyBackup = localStorage.getItem(GAME_STATE_KEY + '_daily_backup');

    if (savedState) {
      try {
        const decryptedState = decryptData(savedState);

        // First check if we have a daily backup
        if (dailyBackup) {
          try {
            const backupState = decryptData(dailyBackup);
            // If backup state exists and is for the current song
            if (backupState.currentSongId === currentSong.id) {
              console.log('Using daily backup state on init');
              localStorage.removeItem(GAME_STATE_KEY + '_daily_backup');
              dispatch({
                type: 'RESTORE_STATE',
                payload: {
                  ...backupState,
                  currentSong: dailySong,
                  isCouchPlay: false,
                },
              });
              return; // Exit early to prevent overwriting with saved state
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
            currentSong.id
          );

          dispatch({
            type: 'RESTORE_STATE',
            payload: {
              ...decryptedState,
              currentSong: dailySong,
              gameEnded: !canPlay || decryptedState.gameEnded,
            },
          });
        }
        // If it is couch play mode, we ignore it and keep initial state
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
