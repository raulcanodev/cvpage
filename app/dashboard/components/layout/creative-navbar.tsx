import { Button } from '@/components/ui';
import { Paintbrush, Settings, User, Rocket } from 'lucide-react';
import Link from 'next/link';

export function CreativeNavbar() {
  const buttonStyles = "bg-white text-slate-950 w-full rounded-xl border hover:bg-zinc-100 hover:shadow-lg dark:bg-zinc-950 dark:text-white dark:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:shadow-lg transition-all duration-300 flex items-center p-3";

  return (
    <>
      <div className="flex justify-between items-center mb-8 mx-auto">
        <div className="flex gap-2">
          <Link href={`/dashboard/page`}>
            <Button variant="outline" className={buttonStyles}>
              <User className="w-4 h-4 mr-1" />
              <span>PAGE</span>
            </Button>
          </Link>

          <Link href={`/dashboard/style`}>
            <Button variant="outline" className={buttonStyles}>
              <Paintbrush className="w-4 h-4 mr-1" />
              <span>STYLE</span>
            </Button>
          </Link>

          <Link href={`/dashboard/settings`}>
            <Button variant="outline" className={buttonStyles}>
              <Settings className="w-4 h-4 mr-1" />
              <span>SETTINGS</span>
            </Button>
          </Link>

          <Link href={`/dashboard/settings`}>
            <Button variant="outline" className={buttonStyles}>
            <Rocket className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
