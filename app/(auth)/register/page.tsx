'use client';
import { FormEvent, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/actions';
import { useSession } from 'next-auth/react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MessageCircle, AlertCircle } from "lucide-react"
import { Github } from "lucide-react"

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const { data: session, status } = useSession();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    const repeatPassword = formData.get('repeat-password')?.toString();

    if (password !== repeatPassword) {
      return setError('Passwords do not match!');
    }

    const r = await register({
      email: email,
      password: password ?? '',
      repeatPassword: repeatPassword ?? '',
    });
    
    ref.current?.reset(); // Clear form fields
    if (r?.error) { 
      setError(r.error);
      return;
    } else {
      return router.push('/register/choose-domain');
    }
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
    <>
     <div className="min-h-screen bg-black text-white flex">
      {/* Left side with testimonial */}
      <div className="hidden lg:flex lg:flex-1 flex-col justify-between p-12 bg-zinc-900">
        <div>
          <Link href="/" className="text-2xl font-bold">hitme.to</Link>
        </div>
        <div>
          <blockquote className="text-xl">
            hitme.to has transformed how I present my portfolio. It is sleek, professional, and exactly what I needed.
          </blockquote>
          <p className="mt-4">Jane Smith, Freelance Writer</p>
        </div>
      </div>

      {/* Right side with registration form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="mt-6 text-3xl font-extrabold">Create an account</h2>
          <p className="mt-2 text-sm text-zinc-400">
            Or{' '}
            <Link href="/login" className="font-medium text-white hover:underline">
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
                name='repeat-password'
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
              <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800 flex items-center justify-center">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </div>
          </div>

          <p className="mt-6 text-xs text-zinc-400 text-center">
            By clicking continue, you agree to our{' '}
            <Link href="/terms" className="text-white hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-white hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
    </>
  );
}



