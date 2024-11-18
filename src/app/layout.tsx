import type { Metadata } from 'next';
import '@/app/globals.css';
import { plusJakarta, larken, langar } from '@/assets/fonts/fonts';
import Providers from '@/app/providers';
import Navbar from '@/components/Navbar';
import FooterWrapper from '@/components/FooterWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://loudr.online'),
  title: 'Loudr - Amplifying the Heartbeat of Afroculture',
  description:
    'Discover the pulse of African youth culture with Loudr. From exclusive music drops to fashion and art, we connect creators with a global audience.',
  keywords:
    'Loudr, African music, African fashion, African art, African youth culture, African creativity, African innovation, African entrepreneurship',
  authors: { name: 'Loudr', url: 'https://loudr.online' },
  openGraph: {
    title: 'Loudr - Amplifying the Heartbeat of Afroculture',
    description:
      'Discover the pulse of African youth culture with Loudr. From exclusive music drops to fashion and art, we connect creators with a global audience.',
    url: 'https://loudr.online',
    siteName: 'Loudr',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/Loudr_poster.png',
        width: 2400,
        height: 1260,
      },
    ],
  },
  twitter: {
    title: 'Loudr - Amplifying the Heartbeat of Afroculture',
    description:
      'Discover the pulse of African youth culture with Loudr. From exclusive music drops to fashion and art, we connect creators with a global audience.',
    images: ['/Loudr_poster.png'],
    card: 'summary_large_image',
  },
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
