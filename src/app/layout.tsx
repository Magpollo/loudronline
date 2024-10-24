import type { Metadata } from 'next';
import '@/app/globals.css';
import { plusJakarta, larken, langar } from '@/assets/fonts/fonts';
import Providers from '@/app/providers';
import Navbar from '@/components/Navbar';
import FooterWrapper from '@/components/FooterWrapper';

export const metadata: Metadata = {
  title: 'Loudronline',
  description: 'Resonating the beat of African culture across the globe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${plusJakarta.variable} ${larken.variable} ${langar.variable} flex flex-col min-h-screen dark:bg-[#1d2023] dark:text-white`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <FooterWrapper />
        </Providers>
      </body>
    </html>
  );
}
