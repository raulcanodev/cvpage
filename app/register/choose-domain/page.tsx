'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageCircle, CheckCircle, XCircle } from 'lucide-react';

export default function ChooseDomainPage() {
  const router = useRouter();
  const [domain, setDomain] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkDomainAvailability = async () => {
    setIsChecking(true);
    // Simulating an API call to check domain availability
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsAvailable(Math.random() > 0.5); // Randomly determine availability for demo purposes
    setIsChecking(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAvailable) {
      // Here you would typically call an API to register the domain
      console.log('Domain registered:', domain);
      // For demo purposes, we'll just log the data
      router.push('/register/success');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
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
                <Label htmlFor="domain">Your Domain</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    hitme.to/
                  </span>
                  <Input
                    id="domain"
                    type="text"
                    placeholder="yourdomain"
                    value={domain}
                    onChange={(e) => {
                      setDomain(e.target.value);
                      setIsAvailable(null);
                    }}
                    className="rounded-l-none"
                    required
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={checkDomainAvailability}
                disabled={!domain || isChecking}
              >
                {isChecking ? 'Checking...' : 'Check Availability'}
              </Button>
              {isAvailable !== null && (
                <Alert variant={isAvailable ? 'default' : 'destructive'}>
                  {isAvailable ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  <AlertDescription>
                    {isAvailable
                      ? 'Great! This domain is available.'
                      : 'Sorry, this domain is already taken.'}
                  </AlertDescription>
                </Alert>
              )}
              <Button className="w-full" type="submit" disabled={!isAvailable}>
                Claim Your Domain
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center w-full">
            Your domain can be changed later.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
