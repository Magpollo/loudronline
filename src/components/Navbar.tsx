'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MobileNavbar from '@/components/MobileNavbar';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');
  const pathname = usePathname();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    const isActive = pathname === href;
    return (
      <Link href={href}>
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
      <nav className="font-plus-jakarta hidden md:flex flex-row justify-between items-center ">
        <div className="w-full h-fit flex flex-row items-center">
          <Link
            href="/"
            className="scale-50 mr-5"
          >
            <Image
              src="/logo.svg"
              alt="Loudronline Logo"
              width={100}
              height={100}
            />
          </Link>
          <div className="flex flex-row">
            <NavLink href="/events">events</NavLink>
            <NavLink href="/reads">reads</NavLink>
            <NavLink href="/videos">videos</NavLink>
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>
        </div>

        <SearchBar />
      </nav>
      <MobileNavbar />
    </>
  );
}
