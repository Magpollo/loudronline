import { Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import { Langar } from 'next/font/google';

export const plusJakarta = Plus_Jakarta_Sans({
  display: 'swap',
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
});

export const larken = localFont({
  src: './Larken/Larken-Variable.ttf',
  weight: '700',
  display: 'swap',
  style: 'normal',
  variable: '--font-larken',
});

export const langar = Langar({
  weight: '400',
  style: 'normal',
  variable: '--font-langar',
  subsets: ['latin'],
});
