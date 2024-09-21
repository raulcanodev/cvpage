'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageCircle, CheckCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SuccessPage() {
  return (
    <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm">
        <div className="bg-black flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
              className="mb-8"
            >
              <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Welcome to hitme.to!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-400 mb-8"
            >
              Your account has been successfully created. You are now ready to start building your
              professional online presence.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/auth/login">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-black py-3 px-6 rounded-full transition-all duration-200 transform hover:scale-105"
                >
                  Proceed to Login
                </Button>
              </Link>
            </motion.div>
{/* 
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 text-sm text-gray-500"
            >
              Need help getting started? Check out our{' '}
              <a href="#" className="text-green-500 hover:text-green-400 underline">
                quick start guide
              </a>
              .
            </motion.p> */}
          </motion.div>

          <div className="absolute inset-0 z-[-1] overflow-hidden">
            <motion.div
              className="w-full h-full"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, #1a1a1a 0%, #000000 100%)',
                  'radial-gradient(circle at 100% 100%, #1a1a1a 0%, #000000 100%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
