'use client';
import React, { useState, FormEvent } from 'react';

interface NewsletterProps {
  ref: React.RefObject<HTMLInputElement>;
  status: string;
  message: string;
  onValidated: (data: { EMAIL: string }) => void;
}

const Newsletter: React.FC<NewsletterProps> = ({
  ref,
  status,
  message,
  onValidated,
}) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  function validateEmail(email: string): boolean {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function suscribeToMailchimp(): void {
    email && onValidated({ EMAIL: email });
  }

  function handleSubscribe(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    if (!validateEmail(email)) setError('Please enter a valid email');
    else if (status === 'error') setError(message as string);
    else {
      setError(null);
      suscribeToMailchimp();
      setEmail('');
    }
  }

  return (
    <form
      onSubmit={handleSubscribe}
      className="flex flex-col text-sm m-2 mb-2 lg:mb-0"
    >
      <p className="mb-1">Subscribe to our newsletter</p>
      <input
        ref={ref}
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        placeholder="example@email.com"
        className="w-64 h-10 border-b-[3px] border-gray-400 p-2 bg-inherit placeholder:text-gray-400 outline-none focus:border-[#ffc843] mb-1 v"
      />
      {error && <p className="text-red-500 mb-3 text-xs">{error}</p>}
      {status === 'sending' && (
        <p className="text-[#ffc843] text-xs mb-2">Sending...</p>
      )}
      {status === 'success' && (
        <p className="text-[#ffc843] text-xs mb-2">Subscribed!</p>
      )}
      <button
        type="submit"
        className="hover:bg-white transition-all duration-200 ease-in-out bg-[#ffc843] text-black
                text-md font-bold uppercase py-4 px-10 rounded"
      >
        Subscribe
      </button>
    </form>
  );
};

export default Newsletter;
