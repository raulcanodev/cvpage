import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { handleUserCount } from '@/actions/';

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

const TrustIndicator = async () => {

  return (
    <div className="flex items-center gap-4 rounded-lg max-w-sm">
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
    <section className="min-h-screen flex items-center mt-14 md:mt-0 p-4 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-blue-600">Stand Out From The Crowd </span> and Build Your Online
            CV
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-zinc-200">
            Don&apos;t be like the others and try to stand out. Sending a PDF is fine, but having an
            online presence is even better.
          </p>

          <Button
            className="text-lg md:text-xl py-6 px-7 hover:bg-blue-600 relative
                    bg-blue-500 text-white font-bold
                      rounded-lg
                      transition-all duration-150 ease-in-out
                      shadow-[0_8px_0_0_#2563eb,0_15px_0_0_#1e40af]
                      hover:shadow-[0_4px_0_0_#2563eb,0_7px_0_0_#1e40af]
                      active:shadow-[0_0_0_0_#2563eb,0_0_0_0_#1e40af]
                      hover:translate-y-1
                      active:translate-y-2"
          >
            <Link href="/auth/register">
              Get Started for Free<span className="ml-3">🚀</span>
            </Link>
          </Button>

          <div className="mt-6 ml-2 text-zinc-500 dark:text-zinc-400 text-sm">
            <p>
              <span className="font-semibold">No credit card required.</span> Try it out for free.
            </p>
            <div className="mt-6">
              <TrustIndicator />
            </div>
          </div>
        </div>
        <div className="flex-1 relative w-full aspect-[4/3]">
          <Image
            src="/hero.png"
            alt="hitme.to interface preview"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
