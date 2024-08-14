'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuIcon from '@/assets/icons/menu';
import Image from 'next/image';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import SearchIcon from '@/assets/icons/search';

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [openExplore, setOpenExplore] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    // Check if the current path is a sub-nav of Explore
    const isExploreSubNav = ['/events', '/reads', '/videos'].includes(pathname);
    setOpenExplore(isExploreSubNav);
  }, [pathname]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
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
      <Link
        href={href}
        onClick={closeMenu}
      >
        <div
          className={`capitalize text-xl font-bold mb-3 transition duration-300 ease-in-out ${
            isActive ? 'text-[#FF9D12]' : 'text-white/50 hover:text-[#FF9D12]'
          }`}
        >
          {children}
        </div>
      </Link>
    );
  };

  return (
    <nav className="relative font-plus-jakarta md:hidden">
      <div className="h-fit">
        <div className="w-full h-fit flex flex-row justify-center items-center">
          <Link
            href="/"
            className="scale-50"
            onClick={closeMenu}
          >
            <Image
              src="/logo.svg"
              alt="Loudronline Logo"
              width={100}
              height={100}
            />
          </Link>
        </div>
        <div className="w-full h-fit flex flex-row justify-around items-center p-3 border-b border-slate-300 dark:border-[#24272A]">
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
              className={`transition-all delay duration-300 ease-in-out cursor-pointer ${
                isOpen
                  ? 'stroke-[#FF9D12]'
                  : 'stroke-gray-600 dark:stroke-white'
              }`}
            />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-[#1d2023] p-10 z-50 transition-opacity duration-300 ease-in-out delay-75 opacity-100"
          style={{ marginTop: '173px' }}
        >
          <div className="flex flex-col">
            <div>
              <div
                onClick={() => setOpenExplore(!openExplore)}
                className={`cursor-pointer text-xl font-bold mb-5 transition duration-300 ease-in-out ${
                  openExplore ? 'text-[#FF9D12]' : 'hover:text-[#FF9D12]'
                }`}
              >
                Explore
              </div>
              {openExplore && (
                <div className="flex flex-col p-3 m-5 border-l border-l-white/50">
                  <NavLink href="/events">events</NavLink>
                  <NavLink href="/reads">reads</NavLink>
                  <NavLink href="/videos">videos</NavLink>
                </div>
              )}
            </div>
            <div>
              <div
                className={`text-xl font-bold mb-5 hover:text-[#FF9D12] transition duration-300 ease-in-out ${
                  openShop && 'text-[#FF9D12]'
                }`}
                onClick={() => setOpenShop(!openShop)}
              >
                Shop
              </div>
              {openShop && (
                <div className="flex flex-col p-3 m-5 border-l border-l-white/50">
                  <div className="text-xl text-white/50 font-bold transition duration-300 ease-in-out">
                    Coming soon
                  </div>
                </div>
              )}
            </div>

            <NavLink href="/about">About</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
