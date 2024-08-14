import type { Metadata } from 'next';
import './globals.css';
import { plusJakarta, larken } from '@/assets/fonts/fonts';
import Providers from '@/app/providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
        className={`${plusJakarta.variable} ${larken.variable} flex flex-col min-h-screen`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
