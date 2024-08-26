import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <MessageCircle className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">hitme.to</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 md:mt-0">
          © 2023 hitme.to. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
          <a
            className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-sm hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            href="#"
          >
            Privacy Policy
          </a>
        </nav>
      </div>
    </footer>
  );
}
