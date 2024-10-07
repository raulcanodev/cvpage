import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import config from '@/config';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            This domain doesn`&ldquo;`t exist, yet! 😉
          </h1>
          <p className="mt-2 text-xl text-gray-600">Create your {config.appName} page</p>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md"
          >
            <Link href="/auth/register" className="font-medium">
              Create your page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
