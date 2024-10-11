import React from 'react';

interface SearchSongsProps {
  guess: string;
  setGuess: (guess: string) => void;
}

export default function SearchSongs({ guess, setGuess }: SearchSongsProps) {
  return (
    <section className="w-full font-plus-jakarta mb-20">
      <div className="w-full">
        <input
          type="text"
          placeholder="Guess here"
          className="w-full p-3 text-black"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
      </div>
    </section>
  );
}
