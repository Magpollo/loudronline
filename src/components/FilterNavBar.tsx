import React from 'react';

interface FilterItem {
  id: string | number;
  name: string;
}

interface FilterBarProps {
  items: FilterItem[];
  selectedItem: string | null;
  onItemClick: (itemName: string) => void;
  title?: string;
}

export default function FilterBar({ items, selectedItem, onItemClick, title = "Filter" }: FilterBarProps) {
  return (
    <>
      <h2 className="font-bold font-plus-jakarta">{title}</h2>
      <nav className="flex justify-start">
        <div className="h-fit w-fit no-scrollbar flex flex-row items-center py-2 overflow-x-scroll">
          {items.map((item) => (
            <div
              key={item.id}
              className={`px-4 py-2 text-sm whitespace-nowrap hover:bg-[#D3D3D3] bg-[#F7F7F7] dark:bg-[#24272A] dark:hover:bg-[#33373A] mr-4 cursor-pointer ${
                selectedItem === item.name
                  ? 'bg-[#FF9D12] text-white dark:bg-[#FF9D12] dark:text-white hover:bg-[#FF9D12]/80 dark:hover:bg-[#FF9D12]/80'
                  : ''
              }`}
              onClick={() => onItemClick(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}