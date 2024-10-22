'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: { [key: string]: string } = {
    default: "An error occurred during authentication.",
    configuration: "There is a problem with the server configuration.",
    accessdenied: "Access was denied to this resource.",
    verification: "The verification process failed.",
  };

  const errorMessage = error ? errorMessages[error] || errorMessages.default : errorMessages.default;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">{errorMessage}</p>
      <Link href="/auth/signin" className="text-blue-600 hover:underline">
        Try signing in again
      </Link>
    </div>
  );
}