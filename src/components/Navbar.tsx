'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import SearchIcon from '@/assets/icons/search';
import MobileNavbar from '@/components/MobileNavbar';

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

        <InputGroup
          variant={'unstyled'}
          className="w-2/6 h-fit bg-gray-100 dark:bg-[#24272a] py-3 mr-10"
        >
          <InputLeftElement pointerEvents="none">
            <SearchIcon
              width={25}
              height={25}
              className="my-3 mx-1 fill-none"
            />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search Loudr..."
            value={searchValue}
            onChange={handleSearch}
            variant={'unstyled'}
            className="ml-8 placeholder:text-sm"
          />
        </InputGroup>
      </nav>
      <MobileNavbar />
    </>
  );
}
