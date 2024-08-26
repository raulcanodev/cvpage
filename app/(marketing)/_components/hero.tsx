import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

export default function Hero() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Submitted email:', email);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">

        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-7 xl:grid-cols-[1fr_600px]">

          <div className="flex items-center justify-center">
            <div className="relative w-[280px] h-[572px] bg-gray-900 rounded-[60px] overflow-hidden border-[14px] border-gray-900 shadow-xl">
              <Image
                src="/placeholder.svg?height=572&width=280"
                width={280}
                height={572}
                alt="hitme.to app mockup"
                className="object-cover"
              />
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-gray-900 rounded-b-[20px]"></div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Connect with Your Audience
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Create a personalized landing page for all your services and contact information in
                one place.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up 👉
                </Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Start your free trial. No credit card required.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
