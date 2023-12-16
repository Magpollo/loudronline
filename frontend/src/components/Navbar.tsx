'use client';

import { useState } from 'react';
import Link from 'next/link';
import Menu from '@/assets/icons/menu.svg';
import MenuOpen from '@/assets/icons/menu-open.svg';
import search from '@/assets/icons/search.svg';
import Image from 'next/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative font-plus-jakarta">
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
      <div className="w-full h-fit flex flex-row justify-around items-center p-3 border-b border-[#24272A] mb-2">
        <InputGroup
          variant={'unstyled'}
          className="w-5/6 bg-gray-100 dark:bg-[#24272a] py-3"
        >
          <InputLeftElement pointerEvents="none">
            <Image
              src={search}
              alt="Search"
              width={25}
              height={25}
              className="py-3 mx-1"
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
        <div>
          <Image
            src={isOpen ? MenuOpen : Menu}
            alt="Menu"
            width={25}
            height={25}
            onClick={toggleMenu}
            // color #FF9D12 when open
            className={`transition-all duration-500 ease-in-out cursor-pointer`}
          />
        </div>
      </div>
      <div className="absolute z-50 -bottom-42 left-0 right-0 transition-all duration-500 ease-in-out">
        {isOpen && (
          <div className="h-fit w-full grid grid-cols-2 grid-rows-2 gap-2 bg-gray-100 dark:bg-[#1d2023]">
            <Link href="/explore">
              <div className="bg-[#24272a] p-4 hover:bg-[#33373A] cursor-pointer">
                <p className="text-center text-xs uppercase">Explore</p>
              </div>
            </Link>
            <Link href="/shop">
              <div className="bg-[#24272a] p-4 hover:bg-[#33373A] cursor-pointer">
                <p className="text-center text-xs uppercase">Shop</p>
              </div>
            </Link>
            <Link href="/about">
              <div className="bg-[#24272a] p-4 hover:bg-[#33373A] cursor-pointer">
                <p className="text-center text-xs uppercase">About</p>
              </div>
            </Link>

            <div className="bg-[#24272a] p-4 hover:bg-[#33373A] cursor-pointer">
              <p className="text-center text-xs uppercase">Share</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
