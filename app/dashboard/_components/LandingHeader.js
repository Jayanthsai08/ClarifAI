"use client";
import { UserButton, useUser, useClerk } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

function Header() {
  const { user } = useUser(); // Get the current logged-in user status
  const { openSignIn } = useClerk(); // Clerk method to open the sign-in page
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  const handleLoginClick = () => {
    openSignIn(); // Open the Clerk sign-in page
  };

  return (
    <header className="w-full px-8 py-4 shadow-md backdrop-blur-md  rounded-xl">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="ClarifAI Logo" width={120} height={150} />
          
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-2xl font-medium font-mono">
          <Link href="/" className="hover:text-red-600">Home</Link>
          <Link href="/dashboard/upgrade" className="hover:text-red-600">Pricing</Link>
          <Link href="" className="hover:text-red-600">Features</Link>
        </nav>

        {/* User Button / Login */}
        <div className="hidden md:block transform scale-150">
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={handleLoginClick}
              className="text-white bg-black rounded-2xl border-2 border-black  px-2 hover:bg-white hover:text-black transition"
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 mt-4 bg-white shadow-lg p-4 rounded-lg text-2xl font-medium font-mono">
          <Link href="/" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/dashboard/upgrade" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Pricing</Link>
          <Link href="/#features" className="hover:text-red-600" onClick={() => setMenuOpen(false)}>Features</Link>
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={handleLoginClick}
              className="w-full text-white bg-black rounded-2xl border-2 border-black py-1 px-2 hover:bg-white hover:text-black transition"
            >
              Log In
            </button>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;
