'use client';

import {
  gameReducer,
  initialState,
  GameState,
  GameAction,
  Song,
} from '../utils/gameLogic';
import { useReducer, useEffect, useState } from 'react';
import SearchSongs from '@/app/(games)/games/music-head/components/SearchSongs';
import AudioPlayer from '@/app/(games)/games/music-head/components/AudioPlayer';
import {
  encryptData,
  decryptData,
} from '@/app/(games)/games/music-head/utils/encryption';
import SuccessScreen from '@/app/(games)/games/music-head/components/SuccessScreen';

const GAME_STATE_KEY = 'musichead_game_state';

export default function MusicHead() {
  const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      if (savedState) {
        try {
          return decryptData(savedState);
        } catch (error) {
          console.error('Failed to load saved game state:', error);
        }
      }
    }
    return initial;
  });

  const [guess, setGuess] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);

  // Load weekly song from /public/musichead.mp3
  const weeklySong: Song = {
    id: 'essence',
    title: 'Essence (feat. Tems)',
    artist: 'Wizkid, Tems',
    previewUrl: '/musichead.mp3',
  };

  useEffect(() => {
    dispatch({ type: 'LOAD_SONG', payload: weeklySong });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(GAME_STATE_KEY, encryptData(state));
    }
  }, [state]);

  const handleGuess = () => {
    dispatch({ type: 'MAKE_GUESS', payload: guess });
    if (guess.toLowerCase() !== weeklySong.title.toLowerCase()) {
      setShowTryAgain(true);
      setTimeout(() => {
        setShowTryAgain(false);
      }, 2000); // Show "Try Again!" for 2 seconds
    }
    setGuess(''); // Clear the input after submitting
  };

  const handleAddSecond = () => {
    if (state.skipsLeft > 0) {
      dispatch({ type: 'SKIP' });
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 seconds
    }
  };

  const handleShare = () => {
    // Implement share functionality here
    console.log('Sharing score:', state.score);
  };

  const handlePlayAgain = () => {
    // Reset the game state
    dispatch({ type: 'RESET_GAME' });
  };

  if (state.gameEnded) {
    return (
      <SuccessScreen
        score={state.score}
        onShare={handleShare}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <section className="flex flex-col items-center justify-between text-center h-screen p-7 font-larken overflow-hidden">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
        <h1 className="md:text-xl font-semibold mb-8">
          Listen to the intro and guess the song. You have 3 attempts and can
          add up to 2 seconds.
        </h1>
        <div className="w-full sm:w-2/3 lg:w-1/2 mb-8">
          <SearchSongs
            guess={guess}
            setGuess={setGuess}
          />
        </div>
        <AudioPlayer
          audioSrc="/musichead.mp3"
          gameState={state}
          dispatch={dispatch}
        />
        <h3 className="md:text-xl font-semibold mt-8 mb-8">
          {showTryAgain ? (
            <span className="text-loudr-yellow">Try Again!</span>
          ) : (
            `Attempts Left: ${state.guessesLeft}/3`
          )}
        </h3>
        <div className="flex flex-col space-y-2 w-full max-w-md relative">
          <button
            onClick={handleAddSecond}
            className="bg-white/10 text-white px-3 py-6 mb-1 rounded-md relative"
            disabled={state.skipsLeft === 0}
          >
            +1 SEC
            {showTooltip && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-gray-900 px-2 py-1 rounded shadow z-10">
                {state.skipsLeft} skip{state.skipsLeft !== 1 ? 's' : ''} left
              </div>
            )}
          </button>
          <button
            onClick={handleGuess}
            className={`px-3 py-6 rounded-md transition-colors duration-300 ${
              guess ? 'bg-white text-black' : 'bg-white/10 text-white'
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
