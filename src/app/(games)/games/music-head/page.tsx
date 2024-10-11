'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MusicHeadStart() {
  return (
    <section className="flex flex-col items-center justify-between h-full p-4">
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Image
              src="/logo.svg" // loudronline logo
              alt="Loudronline Logo"
              width={70}
              height={70}
              className="mx-auto pb-10"
            />
            <p className="my-5 text-xl font-larken">
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
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm">Tip: Listen carefully to the first second!</p>
      </div>
    </section>
  );
}
