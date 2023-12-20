import React from 'react';

const SearchIcon = ({ ...props }: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      {...props}
      width="25"
      height="24"
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4.74781"
        y="2.74781"
        width="13.5044"
        height="13.5044"
        rx="6.75219"
        stroke="#F6F4F1"
        strokeWidth="1.49561"
      />
      <path
        d="M21.2426 21.2427C21.5355 21.5356 22.0104 21.5356 22.3033 21.2427C22.5962 20.9498 22.5962 20.475 22.3033 20.1821L21.2426 21.2427ZM15.2426 15.2427L21.2426 21.2427L22.3033 20.1821L16.3033 14.1821L15.2426 15.2427Z"
        fill="#F6F4F1"
      />
    </svg>
  );
};

export default SearchIcon;
