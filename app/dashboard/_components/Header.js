"use client"
import { UserButton, useUser, useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  const { user } = useUser(); // Get the current logged-in user status
  const { openSignIn } = useClerk(); // Clerk method to open the sign-in page

  const handleLoginClick = () => {
    openSignIn(); // Open the Clerk sign-in page
  };

  return (
    <div className='flex justify-between items-center mt-1 px-8 py-4 shadow-lg w-full'>
      <div>
        
      </div>
      <div className="flex flex-row gap-6 text-2xl font-medium font-mono">
      <Link href="/">
        <div>
          <h2>Home</h2>
        </div>
        </Link>
        <Link href={'/dashboard/upgrade'}>
        <div>
          <h2>Pricing</h2>
        </div>
        </Link>
        <div>
          <h2>Features</h2>
        </div>
      </div>
      <div className="transform scale-150 mt-1 ml-20"> {/* Increase the size */}
        {user ? (
          // Show the UserButton if the user is logged in
          <UserButton />
        ) : (
          // Show a login button if the user is logged out
          <button 
            onClick={handleLoginClick} 
            className="text-white bg-black rounded-2xl border-2 border-black py-1 px-2 hover:bg-white hover:text-black"
          >
            <p className='text-sm'>Log In</p>
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
