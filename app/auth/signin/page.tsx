'use client';
import {
  AcceptConditions,
  GoogleSignInButton,
  GithubSignInButton,
  EmailSignIn,
} from '../components';
import config from '@/config';

export default function SignIn() {
  return (
    <>
      <div>
        <h2 className="mt-6 text-2xl text-center font-bold text-gray-900 dark:text-white">
          Welcome to {config.appName}
        </h2>
        <p className="text-center mt-3 text-gray-500 dark:text-gray-400">
          The visual CV online builder
        </p>
      </div>

      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />

      <div className="space-y-3">
        <GithubSignInButton />
        <GoogleSignInButton />
        <EmailSignIn />
        <AcceptConditions />
      </div>
    </>
  );
}
