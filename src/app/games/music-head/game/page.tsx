'use client';

import {
  gameReducer,
  initialState,
  GameState,
  GameAction,
  Song,
  canPlayToday,
} from '../utils/gameLogic';
import { useReducer, useEffect, useState, useMemo } from 'react';
import SearchSongs from '@/app/games/music-head/components/SearchSongs';
import AudioPlayer from '@/app/games/music-head/components/AudioPlayer';
import {
  encryptData,
  decryptData,
} from '@/app/games/music-head/utils/encryption';
import SuccessScreen from '@/app/games/music-head/components/SuccessScreen';
import { currentSong } from '@/app/games/music-head/utils/currentSong';
import GameNav from '@/app/games/music-head/components/GameNav';

const GAME_STATE_KEY = 'musichead_game_state';

export default function MusicHead() {
  const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      if (savedState) {
        try {
          const decryptedState = decryptData(savedState);
          if (
            !decryptedState.isCouchPlay &&
            !canPlayToday(
              decryptedState.lastPlayedDate,
              decryptedState.currentSongId,
              currentSong.id
            )
          ) {
            return {
              ...decryptedState,
              gameEnded: true,
              isPlayable: false,
            };
          }
          return {
            ...initial,
            ...decryptedState,
            currentSongId: currentSong.id,
          };
        } catch (error) {
          console.error('Failed to load saved game state:', error);
        }
      }
    }
    return {
      ...initial,
      currentSongId: currentSong.id,
    };
  });

  const [guess, setGuess] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);

  // Load daily song from songs array
  const dailySong = useMemo(
    () => ({
      id: currentSong.id,
      title: currentSong.title,
      artist: currentSong.artist,
      previewUrl: `/songs/${currentSong.filename}?v=${currentSong.fileVersion}`,
    }),
    []
  );

  useEffect(() => {
    const initializeGame = async () => {
      if (state.currentSong === null) {
        if (state.isCouchPlay) {
          try {
            const nextSong = await getRandomSong();
            dispatch({ type: 'LOAD_SONG', payload: nextSong });
          } catch (error) {
            console.error('Failed to load random song:', error);
            // Fallback to daily song if random song fails to load
            dispatch({ type: 'LOAD_SONG', payload: dailySong });
          }
        } else {
          dispatch({ type: 'LOAD_SONG', payload: dailySong });
        }
      }
    };

    initializeGame();
  }, [state.currentSong, state.isCouchPlay, dailySong]); // Add isCouchPlay to dependencies

  // Save game state to local storage every time it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stateToSave = {
        score: state.score,
        skipsUsed: state.skipsUsed,
        incorrectGuesses: state.incorrectGuesses,
        gameEnded: state.gameEnded,
        playbackDuration: state.playbackDuration,
        isCouchPlay: state.isCouchPlay,
        lastPlayedDate: state.lastPlayedDate,
        currentSongId: state.currentSongId,
      };
      localStorage.setItem(GAME_STATE_KEY, encryptData(stateToSave));
    }
  }, [
    state.score,
    state.skipsUsed,
    state.incorrectGuesses,
    state.gameEnded,
    state.playbackDuration,
    state.isCouchPlay,
    state.lastPlayedDate,
    state.currentSongId,
  ]);

  // Handle guess submission
  const handleGuess = () => {
    dispatch({ type: 'MAKE_GUESS', payload: guess });

    // Convert both strings to lowercase for case-insensitive comparison
    const normalizedGuess = guess.toLowerCase();
    const normalizedTitle = dailySong.title.toLowerCase();

    // Check if either string contains the other
    const isCorrect =
      normalizedGuess.includes(normalizedTitle) ||
      normalizedTitle.includes(normalizedGuess);

    if (!isCorrect) {
      setShowTryAgain(true);
      setTimeout(() => {
        setShowTryAgain(false);
      }, 2000); // Show "Try Again!" for 2 seconds
    }
    setGuess(''); // Clear the input after submitting
  };

  // Handle adding a second to the playback duration
  const handleAddSecond = () => {
    if (state.skipsUsed < 2) {
      dispatch({ type: 'SKIP' });
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 seconds
    }
  };

  // Get next random song for couch play
  const getRandomSong = async (): Promise<Song> => {
    const response = await fetch('/api/playlist-tracks');
    const data = await response.json();
    const tracks = data.tracks;
    return tracks[Math.floor(Math.random() * tracks.length)];
  };

  const handlePlayAgain = async () => {
    if (state.isCouchPlay) {
      try {
        const nextSong = await getRandomSong();
        dispatch({ type: 'NEXT_SONG', payload: nextSong });
      } catch (error) {
        console.error('Failed to get next song:', error);
      }
    } else {
      if (
        canPlayToday(state.lastPlayedDate, state.currentSongId, currentSong.id)
      ) {
        dispatch({ type: 'RESET_GAME' });
      }
    }
  };

  const handleToggleCouchPlay = async () => {
    if (!state.isCouchPlay) {
      // First get the random song
      try {
        const nextSong = await getRandomSong();
        // Then toggle the mode and load the new song
        dispatch({ type: 'TOGGLE_COUCH_PLAY' });
        dispatch({ type: 'LOAD_SONG', payload: nextSong });
      } catch (error) {
        console.error('Failed to get next song:', error);
      }
    } else {
      // If switching back to daily mode, first toggle mode then load daily song
      dispatch({ type: 'TOGGLE_COUCH_PLAY' });
      dispatch({ type: 'LOAD_SONG', payload: dailySong });
    }
  };

  if (state.gameEnded) {
    return (
      <SuccessScreen
        score={state.score}
        audioSrc={state.currentSong?.previewUrl || dailySong.previewUrl}
        isCouchPlay={state.isCouchPlay}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <section className="py-10 text-center h-full font-larken overflow-hidden">
      <GameNav
        toggleCouchPlay={handleToggleCouchPlay}
        isCouchPlay={state.isCouchPlay}
      />
      <div className="mt-5 w-full h-full max-w-3xl mx-auto flex flex-col items-center justify-around">
        <div className="w-full max-w-xs md:max-w-lg mb-8 p-4 rounded-md dark:bg-[#141818] bg-gray-400 flex flex-col justify-center">
          <AudioPlayer
            audioSrc={state.currentSong?.previewUrl || dailySong.previewUrl}
            gameState={state}
            dispatch={dispatch}
          />
          <SearchSongs
            guess={guess}
            setGuess={setGuess}
          />
          <h3 className="md:text-xl font-semibold mt-4 font-plus-jakarta">
            {showTryAgain ? (
              <span className="text-[#DA4946] px-2 py-1 rounded-sm bg-[#DA4946]/20">
                Try Again!
              </span>
            ) : (
              <span className="text-[#FF9D12] px-2 py-1 rounded-sm bg-[#FF9D12]/20">
                Attempts Left: {3 - state.incorrectGuesses}/3
              </span>
            )}
          </h3>
        </div>

        <div className="flex flex-col space-y-2 w-full max-w-xs md:max-w-lg relative z-0">
          <button
            onClick={handleAddSecond}
            className="dark:bg-white dark:text-black bg-black text-white font-bold px-3 py-6 mb-1 rounded-md relative hover:scale-105 transition-transform duration-300"
            disabled={state.skipsUsed === 2}
          >
            +1 SEC
            {showTooltip && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#FF9D12] text-gray-900 px-2 py-1 rounded shadow z-10">
                {2 - state.skipsUsed} skip{state.skipsUsed !== 1 ? 's' : ''}{' '}
                left
              </div>
            )}
          </button>
          <button
            onClick={handleGuess}
            className={`px-3 py-6 font-bold rounded-md transition-all duration-300 hover:scale-105 ${
              guess
                ? 'dark:bg-white dark:text-black bg-black text-white'
                : 'dark:bg-white/10 dark:text-white bg-black/30 text-white'
            }`}
            disabled={!guess || showTryAgain}
          >
            SUBMIT GUESS
          </button>
        </div>
      </div>
    </section>
  );
}
