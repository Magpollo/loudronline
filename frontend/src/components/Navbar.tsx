'use client';

import { useState } from 'react';
import Link from 'next/link';
import Menu from '@/assets/icons/menu.svg';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="w-full h-fit flex flex-row justify-center items-center">
        <Link
          href="/"
          className="scale-50"
        >
          <Image
            src="/logo.svg"
            alt="Loudronline Logo"
            width={100}
            height={100}
          />
        </Link>
      </div>
    </nav>
  );
}
