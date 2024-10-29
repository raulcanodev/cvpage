'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'
import Image from 'next/image'
import config from '@/config'

interface PreviewData {
  url: string
  image: string
  title: string
}

export const RotatingUrl: React.FC = () => {

  const previewData: PreviewData[] = [
    {
      url: `cvpage.to/raul`,
      image: '/1-domain.png',
      title: 'Raul CV Preview'
    },
    {
      url: `cvpage.to/brunoca`,
      image: '/2-domain.png',
      title: 'Bruno Carvalho'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % previewData.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mx-auto mt-8 md:mt-0">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border-8 border-white dark:border-zinc-800">
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
                key={previewData[currentIndex].url}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
                className="text-gray-800 dark:text-gray-200 font-mono"
              >
                {previewData[currentIndex].url}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800">
          {/* Fixed aspect ratio container */}
          <div className="relative w-full aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={previewData[currentIndex].image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={previewData[currentIndex].image}
                    alt={previewData[currentIndex].title}
                    fill
                    className="object-contain bg-white dark:bg-gray-800"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}