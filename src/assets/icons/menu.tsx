import React from 'react';

const MenuIcon = ({ ...props }: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_2327_291)">
        <rect
          x="1.24781"
          y="1.39893"
          width="9.50439"
          height="9.50439"
          rx="1.25219"
          strokeWidth="1.49561"
        />
        <rect
          x="14.2478"
          y="1.39893"
          width="9.50439"
          height="9.50439"
          rx="1.25219"
          strokeWidth="1.49561"
        />
        <rect
          x="1.24781"
          y="14.3989"
          width="9.50439"
          height="9.50439"
          rx="1.25219"
          strokeWidth="1.49561"
        />
        <rect
          x="14.2478"
          y="14.3989"
          width="9.50439"
          height="9.50439"
          rx="4.75219"
          strokeWidth="1.49561"
        />
      </g>
      <defs>
        <clipPath id="clip0_2327_291">
          <rect
            width="25"
            height="24"
            fill="white"
            transform="translate(0 0.651123)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MenuIcon;
