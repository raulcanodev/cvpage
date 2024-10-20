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
        <div className="flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md text-center"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mb-5 text-3xl font-extrabold text-zinc-950 dark:text-white"
            >
              Welcome to Cvpage!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-zinc-500 dark:text-zinc-200 mb-8"
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
                  className="w-full"
                >
                  Proceed to Login
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="absolute inset-0 z-[-1] overflow-hidden">
            <motion.div
              className="w-full h-full"
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
          </div>
        </div>
  );
}
