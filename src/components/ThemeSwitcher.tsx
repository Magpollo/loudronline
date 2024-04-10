'use client';

import { Switch } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
import { useColorMode } from '@chakra-ui/react';

export default function ThemeSwitcher({ ...props }) {
  const { theme, setTheme } = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <Switch
      aria-label="Toggle Dark Mode"
      isChecked={theme === 'dark'}
      onChange={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
        toggleColorMode();
      }}
      {...props}
    />
  );
}
