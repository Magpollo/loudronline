'use client';

import { useState } from 'react';
import Link from 'next/link';
import MenuIcon from '@/assets/icons/menu';
import Image from 'next/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import ShopIcon from '@/assets/icons/shop';
import SearchIcon from '@/assets/icons/search';
import ExploreIcon from '@/assets/icons/explore';
import AboutIcon from '@/assets/icons/about';
import ThemeSwitcher from './ThemeSwitcher';

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
      <div className="w-full h-fit flex flex-row justify-around items-center p-3 border-b border-slate-300 dark:border-[#24272A] mb-2">
        <InputGroup
          variant={'unstyled'}
          className="w-5/6 bg-gray-100 dark:bg-[#24272a] py-3"
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
        <div>
          <MenuIcon
            onClick={toggleMenu}
            // color #FF9D12 when open
            className={`transition-all delay duration-300 ease-in-out cursor-pointer ${
              isOpen ? 'stroke-[#FF9D12]' : 'stroke-gray-600 dark:stroke-white'
            }`}
          />
        </div>
      </div>
      <div className="absolute z-50 -bottom-42 left-0 right-0 transition-all duration-500 ease-in-out">
        {isOpen && (
          // transition when div opens
          <div className="transition-all delay-100 duration-500 ease-in-out">
            <div className="h-fit w-full grid grid-cols-3 gap-2 dark:bg-[#1d2023] px-4">
              <Link
                className="group"
                href="/explore"
              >
                <div className="bg-slate-100 transition-all duration-300 ease-in-out delay-75 dark:bg-[#24272a] p-4 group-hover:bg-slate-400 dark:group-hover:bg-[#33373A] cursor-pointer flex flex-col items-center justify-center">
                  <ExploreIcon className="my-3 stroke-gray-600 fill-none dark:stroke-white group-hover:stroke-white" />
                  <p className="text-center text-xs uppercase">Explore</p>
                </div>
              </Link>
              <Link
                className="group"
                href="/shop"
              >
                <div className="bg-slate-100 transition-all duration-300 ease-in-out delay-75 dark:bg-[#24272a] p-4 group-hover:bg-slate-400 dark:group-hover:bg-[#33373A] cursor-pointer flex flex-col items-center justify-center">
                  <ShopIcon className="my-3 fill-gray-600 stroke-gray-600 dark:fill-white dark:stroke-white/70 group-hover:stroke-white" />
                  <p className="text-center text-xs uppercase">Shop</p>
                </div>
              </Link>
              <Link
                className="group"
                href="/about"
              >
                <div className="bg-slate-100 transition-all duration-300 ease-in-out delay-75 dark:bg-[#24272a] p-4 group-hover:bg-slate-400 dark:group-hover:bg-[#33373A] cursor-pointer flex flex-col items-center justify-center">
                  <AboutIcon className="my-3 dark:stroke-white stroke-gray-600 fill-none group-hover:stroke-white group-hover:fill-white" />
                  <p className="text-center text-xs uppercase">About</p>
                </div>
              </Link>
            </div>

            <div className="w-full my-4 px-4 flex flex-row-reverse">
              <ThemeSwitcher
                className="transition-all duration-300 ease-in-out delay-75"
                size="lg"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
