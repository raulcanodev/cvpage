'use client';
import React, { FormEvent, useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageCircle, AlertCircle, Github, Mail } from 'lucide-react';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
    }
    // if (res?.ok) {
    //   return router.push('/dashboard/edit-profile');
    // }
  };

  const handleSocialLogin = (provider: string) => {
    // Here you would typically initiate OAuth flow for the selected provider
    console.log(`Initiating ${provider} login`);
  };

  //TODO: Implement this in the lib/auth.ts file
  useEffect(() => {
    if (status === 'authenticated') {
      // Si el usuario está autenticado, redirige a la página deseada
      router.push(`/dashboard/edit-profile/`); // Ajusta esta ruta según tu aplicación
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Cargando...</p>; // Mostrar un indicador de carga mientras se verifica la sesión
  }

  if (status === 'authenticated') {
    return null; // No mostrar nada mientras redirige
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left side with testimonial */}
      <div className="hidden lg:flex lg:flex-1 flex-col justify-between p-12 bg-zinc-900">
        <div>
          <Link href="/" className="text-2xl font-bold">
            hitme.to
          </Link>
        </div>
        <div>
          <blockquote className="text-xl">
            This platform has revolutionized how I showcase my services online. It is simple,
            elegant, and incredibly effective.
          </blockquote>
          <p className="mt-4">John Doe, Freelance Designer</p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="mt-6 text-3xl font-extrabold">Sign in to your account</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Or{' '}
            <Link href="/register" className="font-medium text-white hover:underline">
              create a new account
            </Link>
          </p>

          {error && (
            <Alert variant="destructive" className='mt-3'>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Email or password is incorrect. Please try again.</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-4 space-y-6">
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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-white hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200">
              Sign In
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
              <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 flex items-center justify-center">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
