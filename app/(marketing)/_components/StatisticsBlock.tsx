import { Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui';
import Link from 'next/link';

export const StatisticsBlock = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className="flex items-center mt-14 md:mt-0 py-16">
      <div className="mx-auto">
        <div className=" mx-auto text-center">
          
          <h2 className="text-3xl font-bold mb-8">
            <span className="text-blue-600">95% of Workers</span> Are Either Looking for or Planning
            to Look for a New Job in {currentYear}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

            <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-md border border-black/30 dark:border-white/30 ">
              <Users className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
              <p className="text-4xl font-bold mb-2">250M+</p>
              <p className="text-zinc-400">People actively looking for a new job</p>
            </div>

            <div className="bg-white dark:bg-zinc-950 p-6 rounded-lg shadow-md border border-black/30 dark:border-white/30">
              <Globe className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
              <p className="text-4xl font-bold mb-2">100+</p>
              <p className="text-zinc-400">Platforms to find a job</p>
            </div>

          </div>
          <p className="text-xl mb-8">
            Don&apos;t just share your PDF, elevate your profile with a powerful online presence.
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
        </div>
      </div>
    </section>
  );
};
