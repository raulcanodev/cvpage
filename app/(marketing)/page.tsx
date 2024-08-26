'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar, Testimonials, Hero, KeyFeatures, Video, About } from './_components';
import { Footer } from '@/components/layout';



// v0
import { useState } from 'react';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Zap, Shield } from 'lucide-react';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === 'authenticated') {
      return (
        <button
          className="text-sm font-medium hover:underline underline-offset-4"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push('/');
            });
          }}
        >
          Sign Out
        </button>
      );
    } else if (status === 'loading') {
      return <span className="text-[#888] text-sm mt-7">Loading...</span>;
    } else {
      return (
        <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
          Log In
        </Link>
      );
    }
  };

  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted email:', email);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar>{showSession()}</Navbar>

      <main className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect with Your Client
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create a personalized landing page for all your services and contact information
                  in one place.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit">Get Started</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section> */}
        <Hero/> 
        <KeyFeatures/>
        <Testimonials />
        <Video />
        <About/>
      </main>
      <Footer/>
    </div>
  );
}
