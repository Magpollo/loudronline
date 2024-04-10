import React from 'react';

const AboutIcon = ({ ...props }: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      {...props}
      width="26"
      height="25"
      viewBox="0 0 26 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.8377 11.3771V18.5C15.8377 18.7786 15.6119 19.0044 15.3333 19.0044H4.33331C4.05475 19.0044 3.82892 18.7786 3.82892 18.5V5.5C3.82892 5.22143 4.05475 4.99561 4.33331 4.99561H13.5235C13.6605 4.46507 13.8682 3.96298 14.136 3.5H4.33331C3.22874 3.5 2.33331 4.39543 2.33331 5.5V18.5C2.33331 19.6046 3.22874 20.5 4.33331 20.5H15.3333C16.4379 20.5 17.3333 19.6046 17.3333 18.5V12.1586C16.7954 11.9685 16.2928 11.7038 15.8377 11.3771ZM19.8377 12.4791V21.5C19.8377 21.7786 19.6119 22.0044 19.3333 22.0044H8.33331C8.05475 22.0044 7.82892 21.7786 7.82892 21.5H6.33331C6.33331 22.6046 7.22874 23.5 8.33331 23.5H19.3333C20.4379 23.5 21.3333 22.6046 21.3333 21.5V12.1586C20.8593 12.3261 20.3579 12.4358 19.8377 12.4791Z"
        fill="#A7A9AA"
      />
      <rect
        x="5.83331"
        y="16"
        width="8"
        height="1"
        rx="0.5"
        stroke="#A7A9AA"
      />
      <rect
        x="5.83331"
        y="13"
        width="8"
        height="1"
        rx="0.5"
        stroke="#A7A9AA"
      />
      <g clipPath="url(#clip0_2396_1771)">
        <rect
          x="15.0811"
          y="2.24781"
          width="8.50439"
          height="8.50439"
          rx="4.25219"
          stroke="#A7A9AA"
          strokeWidth="1.49561"
        />
        <rect
          x="19.5833"
          y="6.25"
          width="2.5"
          height="0.5"
          rx="0.25"
          transform="rotate(90 19.5833 6.25)"
          stroke="#A7A9AA"
          strokeWidth="0.5"
        />
        <rect
          x="19.8333"
          y="4.5"
          width="1"
          height="1"
          rx="0.5"
          transform="rotate(90 19.8333 4.5)"
          fill="#A7A9AA"
        />
      </g>
      <defs>
        <clipPath id="clip0_2396_1771">
          <rect
            width="10"
            height="10"
            fill="white"
            transform="translate(14.3333 1.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AboutIcon;
