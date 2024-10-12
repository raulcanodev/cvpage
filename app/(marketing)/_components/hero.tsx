import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Component() {
  return (
    <section className="min-h-screen flex items-center mt-14 md:mt-0 p-4 px-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build Your <span className="text-blue-600">Online CV</span> in Minutes
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-zinc-400">
            Create a professional, customizable CV that stands out from the crowd. Showcase your
            skills and experience with ease.
          </p>

          <Button className="text-lg py-6 px-8">
            <Link href="/auth/register">Get Started for Free</Link>
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
