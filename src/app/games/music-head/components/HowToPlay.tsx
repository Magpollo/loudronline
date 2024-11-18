import { useRef, useEffect } from 'react';

export default function HowToPlay({ toggle }: { toggle: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggle(); // Call the toggle function to close the menu
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggle]);

  return (
    <section className="fixed top-0 left-0 z-[5000] h-screen w-full flex items-center justify-center filter bg-black/10">
      <div
        ref={ref}
        className="absolute z-[5000] bg-white dark:bg-[#1d2023] text-black dark:text-white font-larken flex flex-col items-center p-5 w-4/5 md:w-1/2 rounded-lg"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="scale-150 stroke-gray-600 dark:stroke-white mb-5"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.08997 9.00008C9.32507 8.33175 9.78912 7.76819 10.3999 7.40921C11.0107 7.05024 11.7289 6.91902 12.4271 7.03879C13.1254 7.15857 13.7588 7.52161 14.215 8.06361C14.6713 8.60561 14.921 9.2916 14.92 10.0001C14.92 12.0001 11.92 13.0001 11.92 13.0001"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 17H12.01"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1 className="mb-2 text-2xl font-bold">How To Play</h1>
        <p>
          Listen to the intro and guess the song. You have 3 attempts and can
          add up to 2 seconds.
        </p>
      </div>
    </section>
  );
}
