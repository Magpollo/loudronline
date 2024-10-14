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
    <html
      lang="en"
      className="h-full"
    >
      <body
        className={`${plusJakarta.variable} ${larken.variable} flex flex-col h-full overflow-hidden dark:bg-[#1d2023] dark:text-white`}
      >
        <Providers>
          <main className="flex flex-col h-full">
            {/* Back Home Link */}
            <div className="float-left p-2">
              <Link
                href="/"
                className="text-sm hover:underline transition-all duration-200"
              >
                {'<-  Home'}
              </Link>
            </div>
            <div className="clear-left"></div>
            <div className="flex-grow overflow-hidden">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
