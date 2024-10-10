import { Button } from '@/components/ui/button';
import Link from 'next/link';
import config from '@/config';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            This domain doesn&apos;t exist, yet! 😉
          </h1>
        </div>

        <div className="mt-6">
          <Link href="/auth/register" className="font-medium">
            <Button type="submit" className="w-full text-white bg-zinc-950 hover:bg-zinc-700">
              Create your {config.appName}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
