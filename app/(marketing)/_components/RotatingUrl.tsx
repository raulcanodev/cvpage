import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import config from '@/config';

export const RotatingUrl: React.FC = () => {
  const { domainUrl } = config;
  const urls = [`${domainUrl}/raw`, `${domainUrl}/rawraul2`, `${domainUrl}/alex-johnson`];
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUrlIndex((prevIndex) => (prevIndex + 1) % urls.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto mt-8 md:mt-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-grow flex items-center bg-white dark:bg-gray-600 rounded px-3 py-1">
            <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <AnimatePresence mode="wait">
              <motion.span
                key={urls[currentUrlIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
                className="text-gray-800 dark:text-gray-200 font-mono"
              >
                {urls[currentUrlIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800">
          <div className="relative w-full" style={{ paddingTop: '75%' }}>
            <iframe
              src={`${urls[currentUrlIndex]}`}
              className="absolute top-0 left-0 w-full h-full border-0"
              title={`CV preview for ${urls[currentUrlIndex]}`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};