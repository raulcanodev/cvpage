'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  AcceptConditions,
  GoogleSignInButton,
  GithubSignInButton,
  EmailSignIn,
} from '../components';
import { LineWave } from 'react-loader-spinner';
import config from '@/config';

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/dashboard/page/`);
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center">
        <LineWave
          visible={true}
          height="100"
          width="100"
          color="gray"
          ariaLabel="line-wave-loading"
        />
      </div>
    );
  }

  return (
    <>
      <h2 className="mt-6 text-2xl text-center mb-10 font-bold text-gray-900 dark:text-white">
        Sign in to continue
      </h2>
      <div className="mt-6 space-y-3">
        <GithubSignInButton />
        <GoogleSignInButton />
        <EmailSignIn />
      </div>
      <div className="mt-6">
        <AcceptConditions />
      </div>
    </>
  );
}