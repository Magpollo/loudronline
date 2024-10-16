import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';

interface SearchSongsProps {
  guess: string;
  setGuess: (guess: string) => void;
}

interface Song {
  id: string;
  name: string;
  artists: string[];
  albumCover: string;
}

export default function SearchSongs({ guess, setGuess }: SearchSongsProps) {
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

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
    setGuess(`${song.name} - ${song.artists.join(', ')}`);
    setInputValue('');
    setSuggestions([]);
    setSelectedSong(song);
  };

  return (
    <section className="w-full font-plus-jakarta mb-10">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Guess here..."
          className="w-full p-3 text-white bg-[#24272A] rounded-md"
          value={inputValue}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-[#24272A] mt-1 max-h-60 overflow-y-auto rounded-md">
            {suggestions.map((song) => (
              <li
                key={song.id}
                className="p-2 hover:bg-white hover:text-black cursor-pointer text-white"
                onClick={() => handleSuggestionClick(song)}
              >
                {song.name} - {song.artists.join(', ')}
              </li>
            ))}
          </ul>
        )}
      </div>
      {selectedSong && (
        <div className="mt-4 bg-loudr-yellow rounded-md p-4 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedSong.albumCover}
            alt={`${selectedSong.name} album cover`}
            className="w-16 h-16 mr-4 rounded-md"
          />
          <div>
            <p className="font-semibold text-black">{selectedSong.name}</p>
            <p className="text-sm text-gray-700">
              {selectedSong.artists.join(', ')}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
