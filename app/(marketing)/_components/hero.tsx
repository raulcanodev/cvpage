import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Component() {
  return (
    <section className="min-h-screen flex items-center mt-14 md:mt-0 p-4 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-blue-600">Stand Out From The Crowd </span> and Build Your Online
            CV
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-zinc-400">
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

          <div className="mt-8 text-zinc-500 text-sm">
            <p>Join the first wave of users building their professional presence</p>
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
