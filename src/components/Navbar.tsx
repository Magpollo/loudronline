'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MobileNavbar from '@/components/MobileNavbar';
import SearchBar from './SearchBar';
import About from './About';

export default function Navbar() {
  const pathname = usePathname();
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleShopClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const newsletter = document.getElementById('newsletter');
    if (newsletter) {
      newsletter.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLink = ({
    href,
    children,
    isAbout = false,
    isShop = false,
  }: {
    href: string;
    children: React.ReactNode;
    isAbout?: boolean;
    isShop?: boolean;
  }) => {
    const isActive = pathname === href;
    const handleClick = (e: React.MouseEvent) => {
      if (isAbout) {
        e.preventDefault();
        setIsAboutOpen(true);
      } else if (isShop) {
        handleShopClick(e);
      }
    };

    return (
      <Link
        href={href}
        onClick={isAbout || isShop ? handleClick : undefined}
      >
        <div
          className={`capitalize text-xl mr-10 font-bold transition duration-300 ease-in-out ${
            isActive ? 'text-[#FF9D12]' : 'hover:text-[#FF9D12]'
          }`}
        >
          {children}
        </div>
      </Link>
    );
  };

  return (
    <>
      <nav className="font-plus-jakarta hidden md:flex flex-row justify-between items-center mx-7 my-5">
        <div className="w-full h-fit flex flex-row items-center">
          <Link
            href="/"
            className="mr-5 flex-shrink-0"
          >
            <Image
              src="/logo.svg"
              alt="Loudronline Logo"
              width={30}
              height={30}
              className="min-h-full min-w-full"
            />
          </Link>
          <div className="flex flex-shrink flex-row ml-5">
            <NavLink href="/events">events</NavLink>
            <NavLink href="/reads">reads</NavLink>
            <NavLink href="/videos">videos</NavLink>
            <NavLink
              href="/shop"
              isShop={true}
            >
              Shop
            </NavLink>
            <NavLink
              href="/about"
              isAbout={true}
            >
              About
            </NavLink>
          </div>
        </div>

        <SearchBar />
      </nav>
      <MobileNavbar />
      <About
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </>
  );
}
