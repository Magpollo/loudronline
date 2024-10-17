'use client';
import React from 'react';
import Link from 'next/link';

export default function MusicHeadStart() {
  return (
    <section className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-center mt-10">
        <p className="my-5 text-3xl font-larken">
          How well do you know your songs?
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/games/music-head/game"
          className="hover:bg-[#ffc843] dark:hover:bg-[#ffc843] transition-all duration-200 ease-in-out bg-white text-black dark:bg-white dark:text-black text-md font-bold uppercase py-4 px-28 rounded-lg inline-block text-center"
        >
          Start Game
        </Link>
      </div>
    </section>
  );
}
