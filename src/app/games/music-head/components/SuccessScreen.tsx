'use client';

import React from 'react';
import Link from 'next/link';

interface SuccessScreenProps {
  score: number;
  isCouchPlay: boolean;
  onPlayAgain: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  score,
  isCouchPlay,
  onPlayAgain,
}) => {
  const getScoreColor = (score: number) => {
    if (score <= 2) return '#DA4946';
    if (score <= 8) return '#FF9D12';
    return '#6BDA46';
  };

  const scoreColor = getScoreColor(score);

  const getMessage = (score: number) => {
    if (score === 0) return 'Wetin happen? Did someone hit the mute button?';
    if (score === 10) return "Perfect score! You're a music genius!";
    return 'Good work, Sherlock!';
  };

  // Handle sharing the score on Twitter
  const handleShare = () => {
    const tweetText = `I scored ${score} points in Music Head on Loudronline! Can you beat my score? #MusicHead #Loudronline https://www.loudr.online/games/music-head/`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      tweetText
    )}`;

    if (typeof window !== 'undefined' && window.open) {
      window.open(tweetUrl, '_blank');
    } else {
      console.error('Unable to open new window for sharing.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white dark:bg-[#1d2023] text-white p-4">
      <div className="my-10 w-full max-w-xs rounded-md dark:bg-[#141818] bg-gray-400 py-5 px-2 flex flex-col justify-center items-center mx-auto">
        <div
          className="w-32 h-32 p-3 mt-3 mb-7 rounded-full flex flex-col items-center justify-center font-langar"
          style={{ backgroundColor: `${scoreColor}33` }} // 33 is 20% opacity in hex
        >
          <span
            className="text-5xl font-bold mb-2"
            style={{ color: scoreColor }}
          >
            {score}
          </span>
          <span
            className="text-lg font-semibold uppercase tracking-wider"
            style={{ color: scoreColor }}
          >
            POINTS
          </span>
        </div>
        <h2 className="text-lgfont-semibold mb-8 font-larken text-center">
          {getMessage(score)}
        </h2>
      </div>

      {isCouchPlay ? (
        <button
          onClick={onPlayAgain}
          className="bg-black text-white dark:bg-white dark:text-black w-full max-w-xs py-5 rounded-md font-semibold mb-4 hover:scale-105 transition-transform duration-300"
        >
          NEXT SONG
        </button>
      ) : (
        <button
          onClick={handleShare}
          className="bg-black text-white dark:bg-white dark:text-black w-full max-w-xs py-5 rounded-md font-semibold mb-4 hover:scale-105 transition-transform duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 inline-block mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          SHARE SCORE
        </button>
      )}
    </div>
  );
};

export default SuccessScreen;
