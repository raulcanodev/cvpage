'use client';
import Link from 'next/link';


export default function AuthError() {

  return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          There was an error while trying to authenticate you. Please try again.</p>
        <Link href="/auth/signin" className="text-blue-600 hover:underline">
          Try signing in again
        </Link>
      </div>
  );
}
