'use client';

import React, { forwardRef } from 'react';
import Newsletter from './Newsletter';
import Image from 'next/image';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const Footer: React.FC = forwardRef((props, ref: any) => {
  const url =
    'https://online.us14.list-manage.com/subscribe/post?u=2e88ff683941de4e0ea8a42ea&id=55fcc6e9af&f_id=00e68fe0f0';
  return (
    <footer
      id="footer"
      className="w-full h-fit p-7 lg:p-14 bg-slate-100 dark:bg-[#141818] flex flex-col md:flex-row justify-around"
    >
      <div className="flex flex-col m-2 mb-4 lg:mb-0">
        <div className="flex flex-row items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={56}
            height={56}
            className="w-16 h-16 inline-block"
          />
          <p className="text-2xl font-bold ml-8">loudronline</p>
        </div>
        <p className="text-sm text-gray-400 mt-2">&copy; loudronline 2022</p>
      </div>
      <div className="flex flex-col text-sm m-2 mb-4 lg:mb-0">
        <p className="text-gray-400 mb-2">Find Us</p>
        <ul>
          <li className="py-1">
            <a
              className="p-1 transition-all duration-150 ease-in-out hover:text-[#ffc843]"
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/loudronline?s=21&t=4VyljR8hroJAQQevVbRdFQ"
            >
              Twitter
            </a>
          </li>
          <li className="py-1">
            <a
              className="p-1 transition-all duration-150 ease-in-out hover:text-[#ffc843]"
              target="_blank"
              rel="noreferrer"
              href="https://instagram.com/loudronline?igshid=YmMyMTA2M2Y="
            >
              Instagram
            </a>
          </li>
          <li className="py-1">
            <a
              className="p-1 transition-all duration-150 ease-in-out hover:text-[#ffc843]"
              target="_blank"
              rel="noreferrer"
              href="https://open.spotify.com/playlist/2RyqK3ZGMn6gK8ob5rI42U?si=yWY4GN5vTHOk7xvmI4yuHQ"
            >
              Spotify
            </a>
          </li>
          <li className="py-1">
            <a
              className="p-1 transition-all duration-150 ease-in-out hover:text-[#ffc843]"
              target="_blank"
              rel="noreferrer"
              href="https://youtube.com/channel/UC5RsaqmLUpwLvsW6xoJC1Bg?sub_confirmation=1"
            >
              Youtube
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col text-sm m-2 mb-4 lg:mb-0">
        <p className="text-gray-400 mb-2">Quick Links</p>
        <ul>
          <li className="py-1">
            <a
              className="p-1 transition-all duration-150 ease-in-out hover:text-[#ffc843]"
              href="mailto:salesteam@magpollo.com"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="flex flex-col text-sm m-2 mb-4 lg:mb-0">
        <p className="text-gray-400 mb-2">Support</p>
        <ul>
          <li className="py-1">
            <a
              className="p-1 transition-all duration-150 ease-in-out hover:text-[#ffc843]"
              href="/"
            >
              API Docs
            </a>
          </li>
        </ul>
      </div>
      <div>
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <Newsletter
              ref={ref}
              status={status || ''}
              message={(message as string) || ''}
              onValidated={(formData) => subscribe(formData)}
            />
          )}
        />
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
