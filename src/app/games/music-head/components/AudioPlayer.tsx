'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useGame } from '@/app/games/music-head/context/GameContext';

interface AudioPlayerProps {
  audioSrc: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
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
      } else {
        dispatch({ type: 'PAUSE' });
      }
    }
  };

  // Calculate the visual progress based on current playback time and duration
  const visualProgress = () => {
    return state.currentPlaybackTime / state.playbackDuration;
  };

  // Calculate the maximum progress based on skips used
  const maxProgress = () => {
    return (state.skipsUsed + 1) / 3; // 1/3, 2/3, or 1 based on skips used
  };

  return (
    <div className="flex items-center space-x-4 w-full mb-4">
      <audio ref={audioRef} />
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-10 h-10 bg-transparent border-2 border-black dark:border-white rounded-full flex items-center justify-center"
        disabled={!audioLoaded}
      >
        {state.isPlaying ? (
          <span className="text-black dark:text-white text-xl mb-1">■</span>
        ) : (
          <span className="text-black dark:text-white text-xl">
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
      <div className="flex-grow h-2 bg-white dark:bg-white/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-black dark:bg-white transition-all duration-200"
          style={{
            width: `${visualProgress() * 100 * maxProgress()}%`,
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
