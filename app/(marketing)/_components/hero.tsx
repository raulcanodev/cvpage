import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

const trustData = {
  users: [
    { id: 1, avatar: 'avatar/matias.jpeg' },
    { id: 2, avatar: 'avatar/alfredo.jpeg' },
    { id: 3, avatar: 'avatar/diegogomez.jpeg' },
    { id: 4, avatar: 'avatar/frandy.jpeg' },
    { id: 5, avatar: 'avatar/diego.jpeg' },
  ],
  rating: 5,
  count: 36,
  text: 'cvpagers trust us',
};

const TrustIndicator = () => {
  return (
    <div className="flex items-center gap-4 rounded-lg justify-center sm:justify-start">
      <div className="flex -space-x-2 overflow-hidden">
        {trustData.users.map((user) => (
          <img
            key={user.id}
            className="inline-block h-8 w-8 rounded-full"
            src={user.avatar}
            alt={`User avatar ${user.id}`}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center mb-1">
          {[...Array(trustData.rating)].map((_, index) => (
            <Star key={index} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-xs font-medium">
          {trustData.count} {trustData.text}
        </p>
      </div>
    </div>
  );
};

export function Hero() {
  return (
    <section className="min-h-screen flex items-center mt-20 md:mt-0">
      <div className="md:container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center sm:text-left max-w-2xl mx-auto lg:mx-0">
            
            <h1 className="text-5xl sm:text-5xl md:text-6xl font-extrabold mb-6 hero-font">
              Build your{' '}
              <span className="relative inline-block">
                <span className="relative z-10 px-2 hero-font text-zinc-50">online CV</span>
                <span className="absolute inset-0 bg-blue-500 -rotate-1 transform origin-center" aria-hidden="true"></span>
              </span>{' '}
              in minutes
            </h1>

            <p className="max-w-lg mb-8 text-gray-600 dark:text-zinc-200">
              Don&apos;t be like the others and try to stand out. Sending a PDF is fine, but having an
              online presence is even better.
            </p>

            <div className="flex justify-center sm:justify-start">
              <Button
                className="text-xl sm:text-lg md:text-xl py-6 px-7 hover:bg-blue-600 relative
                        bg-blue-500 text-white font-bold
                          rounded-lg
                          transition-all duration-150 ease-in-out
                          shadow-[0_8px_0_0_#2563eb,0_15px_0_0_#1e40af]
                          hover:shadow-[0_4px_0_0_#2563eb,0_7px_0_0_#1e40af]
                          active:shadow-[0_0_0_0_#2563eb,0_0_0_0_#1e40af]
                          hover:translate-y-1
                          active:translate-y-2"
              >
                <Link href="/auth/signin">
                  Get Started for Free<span className="ml-3">🚀</span>
                </Link>
              </Button>
            </div>

            <div className="mt-6 text-zinc-500 dark:text-zinc-400 text-base sm:text-sm">
              <p className="text-center sm:text-left">
                <span className="font-semibold">No credit card required.</span> Try it out for free.
              </p>
              <div className="mt-6">
                <TrustIndicator />
              </div>
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-[4/3] max-w-2xl lg:max-w-none">
            <Image
              src="/hero.png"
              alt="hitme.to interface preview"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}