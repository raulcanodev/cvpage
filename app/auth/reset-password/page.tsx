'use client';
import { FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Input, Label } from '@/components/ui';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  /**
   * After the user clicks the link in their email, the token is extracted from the URL
   * and stored in the state.
   */

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');

    if (tokenParam) {
      setToken(tokenParam);
    } else {
      toast.error('Token not found. Please try again.');
      router.push('/auth/login');
    }
  }, [router]);

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);

    toast.promise(
      fetch(`/api/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        return data;
      }),
      {
        loading: 'Resetting password...',
        success: (data) => {
          toast.success(data.message);
          router.push('/auth/login');
          return data.message;
        },
        error: (err) => err.message || 'An error occurred during password reset',
        finally: () => setIsSubmitting(false),
      }
    );
  };

  return (
    <>
      <h2 className="mt-6 text-3xl font-extrabold text-zinc-950 dark:text-white">
        Reset your password
      </h2>
      <form onSubmit={handleResetPassword} className="mt-4 space-y-6">
        <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-500 dark:text-zinc-200"
          >
            New Password
          </Label>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full dark:bg-zinc-900 dark:border-zinc-700 border-zinc-300 text-black dark:text-white"
          />
        </div>

        <div>
          <Label
            htmlFor="repeat-password"
            className="block text-sm font-medium text-zinc-500 dark:text-zinc-200"
          >
            Repeat New Password
          </Label>
          <Input
            id="repeat-password"
            type="password"
            name="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            className="mt-1 block w-full dark:bg-zinc-900 dark:border-zinc-700 border-zinc-300 text-black dark:text-white"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
        </Button>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              href="/auth/login"
              className="font-medium hover:underline dark:text-white text-zinc-950"
            >
              Back to log in
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
