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
      <h2 className="mt-6 text-2xl text-center font-bold text-gray-900 dark:text-white">
        Sign in to continue
      </h2>
    
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
      <div className="mt-6 space-y-3">
        <GithubSignInButton />
        <GoogleSignInButton />
        <EmailSignIn />
        <AcceptConditions />
      </div>
    </>
  );
}