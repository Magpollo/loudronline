import React from 'react';

const ExploreIcon = ({ ...props }: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      {...props}
      width="26"
      height="25"
      viewBox="0 0 26 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.15873 9.17808L3.41318 9.09642L4.15872 9.17808C4.01971 10.4472 3.72605 11.6862 3.28607 12.8546C2.71427 14.3732 2.41667 16.0289 2.41667 17.7074V22.2324C2.41667 22.5183 2.64841 22.75 2.93428 22.75H9.39907C9.68493 22.75 9.91667 22.5183 9.91667 22.2324V5.7676C9.91667 5.48174 9.68493 5.25 9.39907 5.25H5.05301C4.78895 5.25 4.56723 5.44876 4.53848 5.71124L4.15873 9.17808Z"
        strokeWidth="1.5"
      />
      <path
        d="M21.1746 9.17808L21.9202 9.09642L21.1746 9.17808C21.3136 10.4472 21.6073 11.6862 22.0473 12.8546C22.6191 14.3732 22.9167 16.0289 22.9167 17.7074V22.2324C22.9167 22.5183 22.6849 22.75 22.3991 22.75H15.9343C15.6484 22.75 15.4167 22.5183 15.4167 22.2324V5.7676C15.4167 5.48174 15.6484 5.25 15.9343 5.25H20.2803C20.5444 5.25 20.7661 5.44876 20.7949 5.71124L21.1746 9.17808Z"
        strokeWidth="1.5"
      />
      <rect
        x="4.16667"
        y="2"
        width="6"
        height="1"
        rx="0.5"
      />
      <rect
        x="-0.5"
        y="0.5"
        width="6"
        height="1"
        rx="0.5"
        transform="matrix(-1 0 0 1 20.6667 1.5)"
      />
      <rect
        x="-0.747805"
        y="0.747805"
        width="4.50439"
        height="2.50439"
        transform="matrix(-1 0 0 1 14.1711 6.5)"
        strokeWidth="1.49561"
      />
    </svg>
  );
};

export default ExploreIcon;