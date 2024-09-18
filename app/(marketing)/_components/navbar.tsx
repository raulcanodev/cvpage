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
    <nav className="fixed w-full z-50 dark:bg-black">
      <div className="container mx-auto py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            hitme.to
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
          <Link href="#pricing">
              <div className="flex items-center space-x-2 transition-colors">
                <span className="text-sm">Pricing</span>
              </div>
            </Link>
            <Link href="#reviews">
              <div className="flex items-center space-x-2 transition-colors">
                <span className="text-sm">Reviews</span>
              </div>
            </Link>
           
            <Link href="#faq">
              <div className="flex items-center space-x-2 transition-colors">
                <span className="text-sm">FAQs</span>
              </div>
            </Link>

            {/* Log in with white background */}
            <div className="flex items-center space-x-4">
              <Link href="/auth/register">
                <Button variant="ghost" className="dark:bg-white bg-black dark:text-black text-white hover:dark:text-white hover:dark:bg-black">Sign Up</Button>
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
            className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-black shadow-lg md:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-end items-center p-4 ">
                <button onClick={() => setIsOpen(false)} aria-label="Close menu">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-4 p-4">
                <Link href="#pricing" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-3 hover:bg-zinc-500 p-2 rounded transition-colors">
                    <span>Pricing</span>
                  </div>
                </Link>
                <Link href="#reviews" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-3 hover:bg-zinc-500 p-2 rounded transition-colors">
                    <span>Reviews</span>
                  </div>
                </Link>
                <Link href="#faq" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center space-x-3 hover:bg-zinc-500 p-2 rounded transition-colors">
                    <span>FAQs</span>
                  </div>
                </Link>
                
                {/* Log in in mobile with white background */}
                <Link href="/auth/register" onClick={() => setIsOpen(false)}>
                  <div className="flex dark:bg-white bg-black dark:text-black text-white items-center space-x-3 p-2 rounded transition-colors">
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