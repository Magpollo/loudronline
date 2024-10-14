import React from 'react';
import Link from 'next/link';

interface SuccessScreenProps {
  score: number;
  onShare: () => void;
  onPlayAgain: () => void;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  score,
  onShare,
  onPlayAgain,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[1d2023] text-white p-4">
      <h2 className="text-2xl font-bold mb-8 font-larken">
        Good work Sherlock!
      </h2>
      <div className="relative mb-16">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
          <span className="text-black text-3xl font-bold">{score}</span>
        </div>
        <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 translate-y-full text-sm mt-2">
          POINTS
        </span>
      </div>
      <button
        onClick={onShare}
        className=" text-white px-4 py-2 rounded-full flex items-center mb-4"
      >
        Share your score{' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
      </button>
      <button
        onClick={onPlayAgain}
        className=" text-white px-4 py-2 rounded-full flex items-center"
      >
        Play again
      </button>
    </div>
  );
};

export default SuccessScreen;
