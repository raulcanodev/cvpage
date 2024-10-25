import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import config from '@/config';

export const ProfileCard: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-16">
      <motion.div
        className="container mx-auto flex justify-center items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left md:space-x-8">
            <motion.div 
              variants={itemVariants} 
              className="mb-8 md:mb-0 w-32 h-32 md:w-48 md:h-48 flex-shrink-0"
            >
              <Image
                src="/raul.jpeg"
                alt={config.personal.name}
                width={200}
                height={200}
                className="rounded-lg shadow-lg object-cover w-full h-full"
              />
            </motion.div>
            <div className="w-full md:w-2/3 flex flex-col items-center md:items-start">
              <motion.h3 
                variants={itemVariants} 
                className="sm:text-5xl text-4xl font-bold mb-4 text-gray-800 dark:text-white"
              >
                Hey, {config.personal.name} here!
              </motion.h3>

              {config.personal.title && (
                <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mb-6">
                  {config.personal.title}
                </motion.p>
              )}

              {config.personal.description && (
                <motion.p variants={itemVariants} className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                  {config.personal.description}
                </motion.p>
              )}

              <motion.div variants={itemVariants} className="flex space-x-4 mb-6">
                {config.personal.github && (
                  <a
                    href={config.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <Github className="w-6 h-6" />
                    <span className="sr-only">GitHub</span>
                  </a>
                )}

                {config.personal.linkedin && (
                  <a
                    href={config.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <Linkedin className="w-6 h-6" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}

                {config.personal.email && (
                  <a
                    href={`mailto:${config.personal.email}`}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <Mail className="w-6 h-6" />
                    <span className="sr-only">Email</span>
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
