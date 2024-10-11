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

export default function MusicHead() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [guess, setGuess] = useState('');

  // Load weekly song from /public/musichead.mp3
  const weeklySong: Song = {
    id: 'essence',
    title: 'Essence',
    artist: 'Wizkid ft. Tems',
    previewUrl: '/musichead.mp3',
  };

  useEffect(() => {
    dispatch({ type: 'LOAD_SONG', payload: weeklySong });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (state.playbackDuration > 1) {
      alert(
        `Playback duration increased to ${state.playbackDuration} seconds!`
      );
    }
  }, [state.playbackDuration]);

  const handleGuess = () => {
    dispatch({ type: 'MAKE_GUESS', payload: guess });
    setGuess(''); // Clear the input after submitting
  };

  const handleAddSecond = () => {
    if (state.skipsLeft > 0) {
      dispatch({ type: 'SKIP' });
    }
  };

  return (
    <section className="flex flex-col items-center text-center h-full p-7 font-larken">
      <h1 className="text-xl font-semibold mb-16">
        Listen to the intro and guess the song. You have 3 attempts and can add
        up to 2 seconds.
      </h1>
      <SearchSongs
        guess={guess}
        setGuess={setGuess}
      />
      <AudioPlayer
        audioSrc="/musichead.mp3"
        gameState={state}
        dispatch={dispatch}
      />
      <h3 className="text-2xl font-semibold mt-10 mb-16">
        Attempts Left: {state.guessesLeft}/3
      </h3>
      <div className="flex flex-col space-y-2 w-full max-w-md">
        <button
          onClick={handleAddSecond}
          className="bg-white/10 text-white px-3 py-6 mb-2 rounded-md"
          disabled={state.skipsLeft === 0}
        >
          +1 SEC
        </button>
        <button
          onClick={handleGuess}
          className="bg-white/10 text-white px-3 py-6 rounded-md"
        >
          SUBMIT GUESS
        </button>
      </div>
    </section>
  );
}
