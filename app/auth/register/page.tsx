'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button, Input, Label } from '@/components/ui/';
import { AcceptConditions, GoogleSignInButton, GithubSignInButton } from '../components';
import { register } from '@/actions';
import { LineWave } from 'react-loader-spinner';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

export default function Register() {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const { data: session, status } = useSession();
  const { theme } = useTheme();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const repeatPassword = formData.get('repeat-password')?.toString();

    if (password !== repeatPassword) {
      toast.error('Passwords do not match!');
    }

    const r = await register({
      email: email,
      password: password ?? '',
      repeatPassword: repeatPassword ?? '',
    });

    ref.current?.reset();
    if (r?.error) {
      toast.error(r.error);
      return;
    } else {
      return router.push(`/auth/register/success`);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/dashboard/page/`);
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="m-auto">
          <LineWave
            visible={true}
            height="100"
            width="100"
            color='gray'
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      </div>
    );
  }

  return (
    <>

          <h2 className="mt-6 text-3xl font-extrabold text-zinc-950 dark:text-white">Create an account</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Or{' '}
            <Link href="/auth/login" className="font-medium hover:underline dark:text-white text-zinc-950">
              sign in to your account
            </Link>
          </p>

          <form action={handleSubmit} className="mt-8 space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-zinc-500 dark:text-zinc-200">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                className="mt-1 block w-full dark:bg-zinc-900 dark:border-zinc-700 border-zinc-300 text-black dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-zinc-500 dark:text-zinc-200">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                className="mt-1 block w-full dark:bg-zinc-900 dark:border-zinc-700 border-zinc-300 text-black dark:text-white"
              />
            </div>

            <div>
              <Label htmlFor="repeat-password" className="block text-sm font-medium text-zinc-500 dark:text-zinc-200">
                Repeat Password
              </Label>
              <Input
                id="repeat-password"
                type="password"
                name="repeat-password"
                required
                className="mt-1 block w-full dark:bg-zinc-900 dark:border-zinc-700 border-zinc-300 text-black dark:text-white"
              />
            </div>

            {/* {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )} */}

            <Button type="submit" className="w-full">
              Sign Up with Email
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-50 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <GithubSignInButton />
              <GoogleSignInButton />
            </div>
          </div>
          <AcceptConditions />
    </>
  );
}
