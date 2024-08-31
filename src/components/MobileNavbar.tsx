'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MenuIcon from '@/assets/icons/menu';
import Image from 'next/image';
import SearchBar from './SearchBar';
import About from './About';

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openExplore, setOpenExplore] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const NavLink = ({
    href,
    children,
    isAbout = false,
    className = '',
  }: {
    href: string;
    children: React.ReactNode;
    isAbout?: boolean;
    className?: string;
  }) => {
    const isActive = pathname === href;
    const handleClick = (e: React.MouseEvent) => {
      if (isAbout) {
        e.preventDefault();
        setIsAboutOpen(true);
        closeMenu();
      } else {
        closeMenu();
      }
    };

    return (
      <Link
        href={href}
        onClick={handleClick}
        className={className}
      >
        <div
          className={`capitalize text-xl font-bold mb-3 transition duration-300 ease-in-out ${
            isActive
              ? 'text-[#FF9D12]'
              : isAbout
              ? 'text-black dark:text-white hover:text-[#FF9D12]'
              : 'text-gray-500 hover:text-[#FF9D12]'
          }`}
        >
          {children}
        </div>
      </Link>
    );
  };

  return (
    <>
      <nav className="bg-white dark:bg-[#1d2023] font-plus-jakarta md:hidden">
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
        </div>
      </nav>
      <div className="sticky top-0 z-40 bg-white dark:bg-[#1d2023] md:hidden">
        <div className="w-full h-fit flex flex-row justify-around items-center p-3 border-b border-slate-300 dark:border-[#24272A]">
          <SearchBar mobile={true} />
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
          className="fixed top-0 left-0 right-0 bottom-0 bg-white dark:bg-[#1d2023] p-10 z-50 transition-opacity duration-300 ease-in-out delay-75 opacity-100 overflow-y-auto"
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
                <div className="flex flex-col p-3 m-5 border-l border-l-gray-500">
                  <NavLink href="/events">events</NavLink>
                  <NavLink href="/reads">reads</NavLink>
                  <NavLink href="/videos">watch</NavLink>
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
                <div className="flex flex-col p-3 m-5 border-l border-l-gray-500">
                  <div className="text-xl text-gray-500 font-bold transition duration-300 ease-in-out">
                    Coming soon
                  </div>
                </div>
              )}
            </div>

            <NavLink
              href="/about"
              isAbout={true}
            >
              About
            </NavLink>
          </div>
        </div>
      )}
      <About
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        isMobile={true}
      />
    </>
  );
}
