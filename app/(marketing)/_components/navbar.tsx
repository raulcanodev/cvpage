'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeSwitcher } from '@/components/layout';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';

//* Add to the layout >
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-black text-white fixed w-full z-50">
      <div className="container mx-auto py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            hitme.to
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/dashboard/profile">
              <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors">
                <span className="text-sm">Profile</span>
              </div>
            </Link>
            <Link href="#pricing">
              <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors">
                <span className="text-sm">Pricing</span>
              </div>
            </Link>
            <Link href="/dashboard/analytics">
              <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors">
                <span className="text-sm">Analytics</span>
              </div>
            </Link>

            {/* Log in with white background */}
            <div className="flex items-center space-x-4">
              <Link href="/auth/register">
                <Button variant="ghost" className="bg-white text-black">Sign Up</Button>
              </Link>
              
              {/* ThemeSwitcher for desktop */}
              <ThemeSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-zinc-950 shadow-lg md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end items-center p-4 border-b border-gray-800">
                <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-4 p-4">
                <Link href="/dashboard/profile" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded transition-colors">
                    <span>Profile</span>
                  </div>
                </Link>
                <Link href="#pricing" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded transition-colors">
                    <span>Pricing</span>
                  </div>
                </Link>
                <Link href="/dashboard/analytics" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded transition-colors">
                    <span>Analytics</span>
                  </div>
                </Link>
                
                {/* Log in in mobile with white background */}
                <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-3 bg-white text-black p-2 rounded hover:bg-gray-300 transition-colors">
                    <span>Sign Up</span>
                  </div>
                </Link>

                {/* ThemeSwitcher for mobile */}
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}