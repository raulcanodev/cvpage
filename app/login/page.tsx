'use client';
import React, { FormEvent, useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageCircle, AlertCircle, Github, Mail } from "lucide-react"

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
    if (res?.ok) {
      return router.push('/dashboard/edit-profile');
    }

  };

  const handleSocialLogin = (provider: string) => {
    // Here you would typically initiate OAuth flow for the selected provider
    console.log(`Initiating ${provider} login`)
  }

  //TODO: Implement this in the lib/auth.ts file
  useEffect(() => {
    if (status === "authenticated") {
      // Si el usuario está autenticado, redirige a la página deseada
      router.push("/dashboard"); // Ajusta esta ruta según tu aplicación
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Cargando...</p>; // Mostrar un indicador de carga mientras se verifica la sesión
  }

  if (status === "authenticated") {
    return null; // No mostrar nada mientras redirige
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <Card className="w-full max-w-md mx-4">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center">
          <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <CardTitle className="text-2xl font-bold ml-2">hitme.to</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button className="w-full" type="submit">
              Log In
            </Button>
          </div>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => handleSocialLogin('GitHub')}>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="outline" onClick={() => handleSocialLogin('Google')}>
            <Mail className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          <Link href="/forgot-password" className="text-blue-600 dark:text-blue-400 hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  </div>
  );
}
