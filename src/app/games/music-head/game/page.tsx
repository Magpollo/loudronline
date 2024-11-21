'use client';

import { useGame } from '../context/GameContext';
import { useState, useEffect } from 'react';
import SearchSongs from '@/app/games/music-head/components/SearchSongs';
import AudioPlayer from '@/app/games/music-head/components/AudioPlayer';
import SuccessScreen from '@/app/games/music-head/components/SuccessScreen';
import { dailySong } from '@/app/games/music-head/context/GameContext';

export default function MusicHead() {
  const { state, dispatch } = useGame();
  const [guess, setGuess] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle guess submission
  const handleGuess = () => {
    if (!guess) return;
    console.log('guess', guess);
    const normalizedGuess = guess.toLowerCase();
    const normalizedTitle = (state.currentSong?.title || '').toLowerCase();
    const isCorrect =
      normalizedGuess.includes(normalizedTitle) ||
      normalizedTitle.includes(normalizedGuess);

    if (!isCorrect) {
      setShowTryAgain(true);
      setTimeout(() => {
        setShowTryAgain(false);
      }, 2000);
    }

    dispatch({
      type: 'MAKE_GUESS',
      payload: {
        guess,
        isCorrect,
      },
    });

    setGuess('');
  };

  // Handle adding a second to the playback duration
  const handleAddSecond = () => {
    if (state.skipsUsed < 2) {
      dispatch({ type: 'SKIP' });
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  if (state.gameEnded) {
    return <SuccessScreen />;
  }

  // Ensure the component is mounted before rendering attempts left
  if (!mounted) {
    return null; // or a loading spinner if desired
  }

  return (
    <section className="py-10 text-center h-full font-larken overflow-hidden">
      <div className="mt-5 w-full h-full max-w-3xl mx-auto flex flex-col items-center justify-around">
        <div className="w-full max-w-xs md:max-w-lg mb-4 p-6 rounded-md dark:bg-[#141818] bg-gray-400 flex flex-col justify-center">
          <AudioPlayer
            audioSrc={state.currentSong?.previewUrl || dailySong.previewUrl}
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

        <div className="flex items-center w-full max-w-xs md:max-w-lg relative z-0 space-x-4">
          <button
            onClick={handleAddSecond}
            className="dark:bg-white dark:text-black bg-black text-white font-bold px-3 py-6 flex-shrink-0 rounded-md relative hover:scale-105 transition-transform duration-300"
            style={{ flexBasis: '30%' }}
            disabled={state.skipsUsed === 2}
          >
            +1 SEC
            {showTooltip && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-[#FF9D12] text-gray-900 px-2 py-1 rounded shadow z-10">
                {2 - state.skipsUsed} skip{state.skipsUsed !== 1 ? 's' : ''} left
              </div>
            )}
          </button>

          <button
            onClick={handleGuess}
            className={`w-full px-3 py-6 font-bold rounded-md transition-all duration-300 hover:scale-105 ${
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
