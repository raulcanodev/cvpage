'use client';
import {
  AcceptConditions,
  GoogleSignInButton,
  GithubSignInButton,
  EmailSignIn,
} from '../components';

export default function SignIn() {

  return (
    <>
      <h2 className="mt-6 text-2xl text-center mb-10 font-bold text-gray-900 dark:text-white">
        Sign in to continue
      </h2>
      <div className="mt-6 space-y-3">
        <GithubSignInButton />
        <GoogleSignInButton />
        <EmailSignIn />
        <AcceptConditions />
      </div>
    </>
  );
}