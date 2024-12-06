'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useGame } from '@/app/games/music-head/context/GameContext';

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const { state, dispatch } = useGame();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load();
      audioRef.current.onloadedmetadata = () => {
        setAudioLoaded(true);
      };
      audioRef.current.onerror = (e) => {
        console.error('Error loading audio:', e);
      };
    }
  }, [audioSrc]); // This effect will run when audioSrc changes

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      if (state.isPlaying) {
        audio
          .play()
          .catch((error) => console.error('Error playing audio:', error));
      } else {
        audio.pause();
      }
    }
  }, [state.isPlaying, state.playbackDuration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updatePlaybackTime = () => {
        dispatch({ type: 'UPDATE_PLAYBACK_TIME', payload: audio.currentTime });
        if (audio.currentTime >= state.playbackDuration) {
          audio.pause();
          dispatch({ type: 'PAUSE' });
          setHasPlayed(true);
        }
      };
      audio.addEventListener('timeupdate', updatePlaybackTime);
      return () => audio.removeEventListener('timeupdate', updatePlaybackTime);
    }
  }, [dispatch, state.playbackDuration]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (!state.isPlaying) {
        audio.currentTime = 0;
        dispatch({ type: 'UPDATE_PLAYBACK_TIME', payload: 0 });
        dispatch({ type: 'PLAY' });
        setHasPlayed(false);
      } else {
        dispatch({ type: 'PAUSE' });
      }
    }
  };

  // Helper function to generate the progress bars
  const renderProgressBars = () => {
    const bars = [];
    const maxBars = 3;
    const progress = state.currentPlaybackTime;

    for (let i = 0; i < maxBars; i++) {
      const isAvailable = i < state.playbackDuration;
      const isFilled = isAvailable && (hasPlayed || progress >= i + 1);
      const isPartiallyFilled =
        isAvailable && !hasPlayed && progress > i && progress < i + 1;
      const fillWidth = isPartiallyFilled ? (progress % 1) * 100 : 0;

      bars.push(
        <div
          key={i}
          className={`h-full flex-1 mx-0.5 first:ml-0 last:mr-0 rounded-sm overflow-hidden
            ${
              isAvailable
                ? 'dark:bg-white/40 bg-white'
                : 'dark:bg-white/5 bg-white'
            }`}
        >
          {(isFilled || isPartiallyFilled) && (
            <div
              className="h-full dark:bg-white bg-black transition-all duration-200"
              style={{
                width: isFilled ? '100%' : `${fillWidth}%`,
              }}
            />
          )}
        </div>
      );
    }
    return bars;
  };

  return (
    <div className="flex items-center space-x-4 w-full mb-4">
      <audio ref={audioRef} />
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-10 h-10 bg-transparent border-2 dark:border-white border-black rounded-full flex items-center justify-center"
        disabled={!audioLoaded}
      >
        {state.isPlaying ? (
          <span className="dark:text-white text-black mb-1 text-xl">■</span>
        ) : (
          <span className="dark:text-white text-black text-xl">
            <svg
              width="14"
              height="15"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.92627 1.87109L11.086 7.11662L2.92627 12.3621V1.87109Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.16567"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </button>
      <div className="flex-grow h-2 flex">{renderProgressBars()}</div>
    </div>
  );
};

export default AudioPlayer;
