'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import SearchIcon from '@/assets/icons/search';
import { searchPosts } from '@/app/actions';

interface SearchResult {
  title: string;
  url: string;
  contentType: string;
}

export default function SearchBar({ mobile = false }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchValue) {
        const results = await searchPosts(searchValue);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setSearchValue('');
    setSearchResults([]);
  };

  return (
    <div className="relative w-full">
      <InputGroup
        variant={'unstyled'}
        className={`${
          mobile ? 'w-[90%]' : 'w-[60%]'
        } ml-4 bg-gray-100 dark:bg-[#24272a] py-3 ${mobile ? '' : 'ml-10'}`}
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
      {searchResults.length > 0 && (
        <div
          className={`absolute z-10 w-full mt-1 bg-white dark:bg-[#24272a] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg ${
            mobile ? '' : 'right-8 md:w-[calc(100%-2rem)]'
          }`}
        >
          {searchResults.map((result: SearchResult, index: number) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => handleResultClick(result)}
            >
              {result.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
