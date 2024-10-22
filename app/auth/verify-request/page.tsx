import Link from 'next/link';
import config from '@/config';

export default function VerifyRequest() {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Check Your Email</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        A sign in link has been sent to your email address. Please check your inbox and click the link to continue.
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        If you don't see the email, check your spam folder.
      </p>
      <Link href="/auth/signin" className="text-blue-600 hover:underline">
        Return to sign in
      </Link>
    </div>
  );
}