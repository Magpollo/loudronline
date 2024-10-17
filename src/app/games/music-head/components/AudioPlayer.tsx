'use client';

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { GameState, GameAction } from '../utils/gameLogic';

interface AudioPlayerProps {
  audioSrc: string;
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  gameState,
  dispatch,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const waveformBars = 30; // Number of bars in the waveform

  // Generate random heights for the waveform bars only once
  const barHeights = useMemo(
    () => Array.from({ length: waveformBars }, () => Math.random() * 0.8 + 0.2),
    [waveformBars]
  );

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
      if (gameState.isPlaying) {
        audio
          .play()
          .catch((error) => console.error('Error playing audio:', error));
      } else {
        audio.pause();
      }
    }
  }, [gameState.isPlaying, gameState.playbackDuration]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updatePlaybackTime = () => {
        dispatch({ type: 'UPDATE_PLAYBACK_TIME', payload: audio.currentTime });
        if (audio.currentTime >= gameState.playbackDuration) {
          audio.pause();
          dispatch({ type: 'PAUSE' });
        }
      };
      audio.addEventListener('timeupdate', updatePlaybackTime);
      return () => audio.removeEventListener('timeupdate', updatePlaybackTime);
    }
  }, [dispatch, gameState.playbackDuration]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (!gameState.isPlaying) {
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
    return gameState.currentPlaybackTime / gameState.playbackDuration;
  };

  // Calculate the maximum progress based on skips used
  const maxProgress = () => {
    return (gameState.skipsUsed + 1) / 3; // 1/3, 2/3, or 1 based on skips used
  };

  return (
    <div className="flex items-center space-x-4 w-full mb-4">
      <audio ref={audioRef} />
      <button
        onClick={togglePlay}
        className="flex-shrink-0 w-12 h-12 bg-transparent border-2 border-white rounded-full flex items-center justify-center"
        disabled={!audioLoaded}
      >
        {gameState.isPlaying ? (
          <span className="text-white text-xl mb-1">■</span>
        ) : (
          <span className="text-white text-xl ml-1">▶</span>
        )}
      </button>
      <div className="flex-grow h-16 flex items-center justify-center space-x-0.5 lg:space-x-1">
        {barHeights.map((height, index) => (
          <div
            key={index}
            className="w-1 lg:w-2 rounded-full transition-all duration-200"
            style={{
              height: `${height * 100}%`,
              backgroundColor:
                index / waveformBars <= maxProgress()
                  ? visualProgress() > index / waveformBars
                    ? 'white'
                    : 'rgba(255, 255, 255, 0.6)'
                  : 'rgba(255, 255, 255, 0.3)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;
