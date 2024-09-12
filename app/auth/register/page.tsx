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

export default function Register() {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const { data: session, status } = useSession();

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
      return router.push(`/dashboard/page/`);
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
            color="white"
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
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="mt-6 text-3xl font-extrabold">Create an account</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Or{' '}
            <Link href="/auth/login" className="font-medium text-white hover:underline">
              sign in to your account
            </Link>
          </p>

          <form action={handleSubmit} className="mt-8 space-y-6">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                className="mt-1 block w-full bg-zinc-900 border-zinc-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                className="mt-1 block w-full bg-zinc-900 border-zinc-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="repeat-password" className="block text-sm font-medium">
                Repeat Password
              </Label>
              <Input
                id="repeat-password"
                type="password"
                name="repeat-password"
                required
                className="mt-1 block w-full bg-zinc-900 border-zinc-700 text-white"
              />
            </div>

            {/* {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )} */}

            <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200">
              Sign Up with Email
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-zinc-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <GithubSignInButton />
              <GoogleSignInButton />
            </div>
          </div>

          <AcceptConditions />
        </div>
      </div>
    </>
  );
}
