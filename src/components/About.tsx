import React from 'react';
import Image from 'next/image';
import GithubIcon from '@/assets/icons/github.svg';

interface AboutProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
}

const About: React.FC<AboutProps> = ({ isOpen, onClose, isMobile }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-[100] flex ${
        isMobile ? 'items-center justify-center' : 'items-start justify-end'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white dark:bg-[#1d2023] p-6 rounded-lg ${
          isMobile ? 'w-11/12 max-w-md' : 'mt-16 mr-4 w-80'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={onClose}
        >
          &#x2715; {/* X symbol */}
        </button>
        <div>
          <h1 className="font-bold text-sm mb-2 text-gray-400 uppercase">
            About
          </h1>
          <p className="text-sm mb-5">
            Loudr is a creative company that is dedicated to a new generation of
            young and influential creators. We find and share the finest of what
            culture has to offer, unite a community via a mutual appreciation of
            these tales, and offer a platform to a community of emerging
            creators.
          </p>

          <h1 className="font-bold text-sm mb-1 text-gray-400 uppercase">
            Privacy
          </h1>
          <p className="text-sm mb-5">
            At Loudr, we value your privacy. We collect your email address and
            use this information to send you marketing emails about our products
            and services. We do not share your personal information with any
            third parties without your consent.
          </p>
          <h1 className="font-bold text-sm mb-2 text-gray-400 uppercase">
            Resources
          </h1>
          <div className="flex flex-row h-fit w-fit">
            <span className="p-2 bg-[#ffc843] rounded-l-lg">
              <Image
                src={GithubIcon}
                alt="Github"
                width={40}
                height={40}
              />
            </span>

            <span className="py-2 px-4 bg-[#24272a] text-xs text-white rounded-r-lg">
              <p className="font-bold">Codebase</p>
              <p>Coming soon</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
