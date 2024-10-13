import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, File } from 'lucide-react';
import Link from 'next/link';
import config from '@/config';

export const MinimalFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <footer className="py-8">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div variants={itemVariants} className="mb-4 md:mb-0">
          <Link href="/" className="text-xl font-normal flex items-center">
          <File strokeWidth={1.3}/> <span className='lowercase'>{config.appName}</span>
          </Link>
          </motion.div>
          <motion.nav variants={itemVariants} className="mb-4 md:mb-0">
            <ul className="flex space-x-4">
              <li><Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">Terms</Link></li>
            </ul>
          </motion.nav>
          <motion.div variants={itemVariants} className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <Twitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
          </motion.div>
        </div>
        <motion.div 
          variants={itemVariants}
          className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300"
        >
          © {currentYear} {config.appName}. All rights reserved.
        </motion.div>
      </motion.div>
    </footer>
  );
};
