'use client';

import React from 'react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/utils/theme';
import { Analytics } from '@vercel/analytics/react';

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      {...props}
      attribute="class"
    >
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <Analytics />
          {children}
        </ChakraProvider>
      </CacheProvider>
    </NextThemeProvider>
  );
}
