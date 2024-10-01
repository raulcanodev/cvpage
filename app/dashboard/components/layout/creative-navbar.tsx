import { Button } from '@/components/ui';
import { BarChart2, Paintbrush, Settings, User } from 'lucide-react';
import Link from 'next/link';

export function CreativeNavbar() {
  return (
    <>
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8 mx-auto">
        <div className="flex gap-3">
          <Link href={`/dashboard/page`}>
            <Button
              variant="outline"
                className="bg-white text-slate-950 w-full rounded-xl border border- hover:bg-zinc-100 hover:shadow-lg dark:bg-zinc-950 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:shadow-lg transition-all duration-300"
            >
              <User className="w-4 h-4 mb-1 md:mr-2 md:mb-0" />
              <span className="">PAGE</span>
            </Button>
          </Link>

          <Link href={`/dashboard/style`}>
            <Button
              variant="outline"
                className="bg-white text-slate-950 w-full rounded-xl border border- hover:bg-zinc-100 hover:shadow-lg dark:bg-zinc-950 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:shadow-lg transition-all duration-300"
            >
              <Paintbrush className="w-4 h-4 mb-1 md:mr-2 md:mb-0" />
              <span className="">STYLE</span>
            </Button>
          </Link>

          <Link href={`/dashboard/settings`}>
            <Button
              variant="outline"
                className="bg-white text-slate-950 w-full rounded-xl border border- hover:bg-zinc-100 hover:shadow-lg dark:bg-zinc-950 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:shadow-lg transition-all duration-300"
            >
              <Settings className="w-4 h-4 mb-1 md:mr-2 md:mb-0" />
              <span className="">SETTINGS</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
