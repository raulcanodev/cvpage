'use client';
import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/actions';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MessageCircle, AlertCircle } from "lucide-react"

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

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

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-2xl font-bold ml-2">hitme.to</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form ref={ref}
            action={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  placeholder="hitmeto@mail.com"
                  name="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                 type="password"
                 name="password"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="repeat-password">Repeat Password</Label>
                <Input
                  id="repeat-password"
                  type="password"
                  name="repeat-password"
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button className="w-full" type="submit">
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center w-full">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
    </>
  );
}



