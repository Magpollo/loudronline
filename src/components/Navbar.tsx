'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MenuIcon from '@/assets/icons/menu';
import Image from 'next/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import SearchIcon from '@/assets/icons/search';
import MobileNavbar from '@/components/MobileNavbar';

export default function Navbar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
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
            <Link href="/events">
              <div className="capitalize text-xl mr-10 font-bold hover:text-[#FF9D12] transition duration-300 ease-in-out ">
                events
              </div>
            </Link>
            <Link href="/reads">
              <div className="capitalize text-xl mr-10 font-bold hover:text-[#FF9D12] transition duration-300 ease-in-out ">
                reads
              </div>
            </Link>
            <Link href="/videos">
              <div className="capitalize text-xl mr-10 font-bold hover:text-[#FF9D12] transition duration-300 ease-in-out ">
                videos
              </div>
            </Link>

            <Link href="/shop">
              <div className="text-xl font-bold mr-10 hover:text-[#FF9D12] transition duration-300 ease-in-out ">
                Shop
              </div>
            </Link>
            <Link href="/about">
              <div className="text-xl font-bold mr-10 hover:text-[#FF9D12] transition duration-300 ease-in-out ">
                About
              </div>
            </Link>
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
