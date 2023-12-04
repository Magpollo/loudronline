import { Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const plusJakarta = Plus_Jakarta_Sans({
  display: 'swap',
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
});

export const larken = localFont({
  src: './Larken/Larken-Variable.ttf',
  weight: 'variable',
  display: 'swap',
  style: 'normal',
  variable: '--font-larken',
});
