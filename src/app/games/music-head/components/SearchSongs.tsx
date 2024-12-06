/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { Song } from '@/app/games/music-head/utils/gameLogic';
interface SearchSongsProps {
  guess: string;
  setGuess: (guess: string) => void;
  setSelectedSong: (song: Song | null) => void;
  selectedSong: Song | null;
}

export default function SearchSongs({
  guess,
  setGuess,
  setSelectedSong,
  selectedSong,
}: SearchSongsProps) {
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const [inputValue, setInputValue] = useState('');

  const searchSongs = async (query: string) => {
    const response = await fetch(
      `/api/search-songs?q=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    setSuggestions(data.tracks);
  };

  const debouncedSearch = debounce(searchSongs, 300);

  useEffect(() => {
    if (inputValue.length > 2) {
      debouncedSearch(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedSong(null);
  };

  const handleSuggestionClick = (song: Song) => {
    setGuess(`${song.title} - ${song.artist}`);
    setInputValue('');
    setSuggestions([]);
    setSelectedSong(song);
  };

  return (
    <section className="w-full font-plus-jakarta mb-10 relative">
      <div className="w-full relative ">
        <input
          type="text"
          placeholder="Guess here..."
          className="w-full p-3 bg-white dark:bg-[#24272A] text-black dark:text-white rounded-md outline-none focus:outline-none focus:border-loudr-yellow2 border-2 border-transparent"
          value={inputValue}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-50 w-full dark:bg-[#24272A] bg-gray-400 mt-1 max-h-60 overflow-y-auto rounded-md">
            {suggestions.map((song) => (
              <li
                key={song.id}
                className="p-2 hover:bg-white hover:text-black cursor-pointer text-white"
                onClick={() => handleSuggestionClick(song)}
              >
                {song.title} - {song.artist}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedSong && (
        <div className="mt-4 bg-[#B0A99E] rounded-md p-4 flex items-center">
          <img
            src={selectedSong.albumCover}
            alt={`${selectedSong.title} album cover`}
            className="w-16 h-16 mr-4 rounded-md"
          />
          <div>
            <p className="font-semibold text-black">{selectedSong.title}</p>
            <p className="text-sm text-gray-700">{selectedSong.artist}</p>
          </div>
        </div>
      )}
    </section>
  );
}
