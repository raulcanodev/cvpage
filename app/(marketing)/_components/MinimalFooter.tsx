import React from 'react';
import { Github, Linkedin, Twitter, File } from 'lucide-react';
import Link from 'next/link';
import config from '@/config';
import cvpageBlack from '@/public/cvpage-black.png';
import cvpageWhite from '@/public/cvpage-white.png'
import Image from 'next/image';
import { useTheme } from 'next-themes';

export const MinimalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className='mb-4'>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-xl font-normal flex items-center">
              <div className="flex items-center space-x-2">
                {theme === 'dark' ? (
                  <Image src={cvpageWhite} alt="Logo" width={100} height={100} />
                ) : (
                  <Image src={cvpageBlack} alt="Logo" width={100} height={100} />
                )}
              </div>
            </Link>
          </div>
          <nav className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li><Link href="/tos" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Privacy Policy</Link></li>
            </ul>
          </nav>
          <div className="flex space-x-4">
            <a href={config.personal.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href={config.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={config.personal.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
          © {currentYear} {config.appName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};