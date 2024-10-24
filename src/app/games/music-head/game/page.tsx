'use client';

import {
  gameReducer,
  initialState,
  GameState,
  GameAction,
  Song,
} from '../utils/gameLogic';
import { useReducer, useEffect, useState } from 'react';
import SearchSongs from '@/app/games/music-head/components/SearchSongs';
import AudioPlayer from '@/app/games/music-head/components/AudioPlayer';
import {
  encryptData,
  decryptData,
} from '@/app/games/music-head/utils/encryption';
import SuccessScreen from '@/app/games/music-head/components/SuccessScreen';
import { currentSong } from '@/app/games/currentSong';

const GAME_STATE_KEY = 'musichead_game_state';

export default function MusicHead() {
  const [state, dispatch] = useReducer(gameReducer, initialState, (initial) => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem(GAME_STATE_KEY);
      if (savedState) {
        try {
          const decryptedState = decryptData(savedState);
          return {
            ...initial,
            score: decryptedState.score,
            skipsUsed: decryptedState.skipsUsed,
            incorrectGuesses: decryptedState.incorrectGuesses,
            gameEnded: decryptedState.gameEnded,
            playbackDuration: decryptedState.playbackDuration,
          };
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
    id: currentSong.id,
    title: currentSong.title,
    artist: currentSong.artist,
    previewUrl: `/musichead.mp3?v=${currentSong.fileVersion}`,
  };

  useEffect(() => {
    if (state.currentSong === null) {
      dispatch({ type: 'LOAD_SONG', payload: weeklySong });
    }
  }, [state.currentSong]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stateToSave = {
        score: state.score,
        skipsUsed: state.skipsUsed,
        incorrectGuesses: state.incorrectGuesses,
        gameEnded: state.gameEnded,
        playbackDuration: state.playbackDuration,
      };
      localStorage.setItem(GAME_STATE_KEY, encryptData(stateToSave));
    }
  }, [
    state.score,
    state.skipsUsed,
    state.incorrectGuesses,
    state.gameEnded,
    state.playbackDuration,
  ]);

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
    if (state.skipsUsed < 2) {
      dispatch({ type: 'SKIP' });
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000); // Hide tooltip after 2 seconds
    }
  };

  const handleShare = () => {
    const tweetText = `I scored ${state.score} points in Music Head on Loudronline! Can you beat my score? #MusicHead #Loudronline https://www.loudr.online/games/music-head/`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;

    if (typeof window !== 'undefined' && window.open) {
      window.open(tweetUrl, '_blank');
    } else {
      console.error('Unable to open new window for sharing.');
    }
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
    <section className="py-10 text-center h-full font-larken overflow-hidden">
      <div className="w-full h-full max-w-3xl mx-auto flex flex-col items-center justify-around">
        {/* <h1 className="md:text-xl font-semibold mb-8">
          Listen to the intro and guess the song. You have 3 attempts and can
          add up to 2 seconds.
        </h1> */}
        <div className="w-full max-w-xs md:max-w-lg mb-8 p-4 rounded-md dark:bg-[#141818] bg-gray-400 flex flex-col justify-center">
          <AudioPlayer
            audioSrc="/musichead.mp3"
            gameState={state}
            dispatch={dispatch}
          />
          <SearchSongs
            guess={guess}
            setGuess={setGuess}
          />
          <h3 className="md:text-xl font-semibold mt-4">
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

        <div className="flex flex-col space-y-2 w-full max-w-xs md:max-w-lg relative">
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
