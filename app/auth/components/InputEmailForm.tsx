'use client';
import React, { FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button, Input, Label } from '@/components/ui';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function InputEmailForm() {
  const [email, setEmail] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        router.push('/auth/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Email not found.');
    }
  }

  useEffect(() => {
    if (session) {
      window.location.href = '/dashboard/page';
    }
  }, [session]);

  return (
    <>
      <h2 className="mt-6 text-3xl font-extrabold text-zinc-950 dark:text-white">Reset your password</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-zinc-500 dark:text-zinc-200">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full dark:bg-zinc-900 dark:border-zinc-700 border-zinc-300 text-black dark:text-white"
          />
        </div>

        <Button type="submit" className="w-full">
          Send Email
        </Button>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="/auth/login" className="font-medium hover:underline dark:text-white text-zinc-950">
              Sign in to your account
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
