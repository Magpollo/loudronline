import {
  gameReducer,
  initialState,
  GameState,
  GameAction,
  Song,
} from '../utils/gameLogic';
import { useReducer, useEffect } from 'react';

export default function MusicHead() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

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

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <h1>Music Head</h1>
    </section>
  );
}
