import { Toaster } from 'sonner';
import Image from 'next/image';
import cvpageWhite from '@/public/icon.png';
import config from '@/config';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" />
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <Link className="pointer" href="/">
            <Image src={cvpageWhite} alt={config.appName} width={50} height={50} />
          </Link>
          {/* <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            {config.appName}
          </h2> */}
        </div>
        {children}
      </div>
    </div>
  );
}
