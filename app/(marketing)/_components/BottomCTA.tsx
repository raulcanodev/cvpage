import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const BottomCTA: React.FC = () => {
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
    <section className="py-16 bg-blue-500 rounded-lg">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-6 text-white"
          >
            Ready to Boost Your Career?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl mb-8 text-zinc-50"
          >
            Get started to get your own online CV page and stand out from the crowd.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/auth/signin"
              className="bg-zinc-50 text-blue-500 hover:bg-zinc-200 shadow-lg px-8 py-3 rounded-full font-bold text-lg transition duration-300 flex items-center"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
