'use client';
import React from 'react';

export default function ShopCTA() {
  const handleSubscribeClick = () => {
    const newsletter = document.getElementById('newsletter');
    if (newsletter) {
      newsletter.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="mt-10"
      id="shop"
    >
      <h1 className="text-2xl font-larken mb-5">Shop our essentials</h1>
      <div className="bg-[#95426A] flex flex-col items-center justify-center p-5">
        <h1 className="text-loudr-yellow w-fit font-bold text-lg mb-5">
          Be the first to shop
        </h1>
        <p className="text-sm max-w-[300px] mx-auto mb-3 text-white dark:text-white">
          Our one of a kind shop for creators and from creators. Subscribe to
          know when we go live{' '}
        </p>
        <button
          className="hover:bg-[#ffc843] dark:hover:bg-[#ffc843] transition-all duration-200 ease-in-out bg-white text-black dark:bg-white dark:text-black text-md font-bold uppercase py-4 px-28 rounded-lg"
          onClick={handleSubscribeClick}
        >
          Subscribe
        </button>
      </div>
    </section>
  );
}
