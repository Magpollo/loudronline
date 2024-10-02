import type { Metadata } from 'next';
import '../globals.css';
import { plusJakarta, larken } from '@/assets/fonts/fonts';
import Providers from '@/app/providers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Loudronline',
  description: 'Resonating the beat of African culture across the globe',
};

export default function GamesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${larken.variable} flex flex-col min-h-screen dark:bg-[#1d2023] dark:text-white`}
      >
        <Providers>
          <main className="flex-grow flex flex-col">
            {/* Back Home Link */}
            <div className="self-start mt-5 ml-5">
              <Link
                href="/"
                className="text-sm hover:underline transition-all duration-200"
              >
                {'<-  Home'}
              </Link>
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
