import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music Head - Daily Song Guessing Challenge',
  description:
    'Think you know your music? Guess the song from just a few seconds of the intro and compete with friends for the top score.',
  openGraph: {
    title: 'Music Head - Daily Song Guessing Challenge',
    description:
      'Think you know your music? Guess the song from just a few seconds of the intro and compete with friends for the top score.',
    url: 'https://loudr.online/games/music-head',
    siteName: 'Loudronline',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/Music_head_poster.png',
        width: 2400,
        height: 1260,
      },
    ],
  },
  twitter: {
    title: 'Music Head - Daily Song Guessing Challenge',
    description:
      'Think you know your music? Guess the song from just a few seconds of the intro and compete with friends for the top score.',
    images: ['/Music_head_poster.png'],
    card: 'summary_large_image',
  },
};

export default function MusicHeadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
