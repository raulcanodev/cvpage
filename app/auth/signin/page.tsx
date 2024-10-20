'use client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  AcceptConditions,
  GoogleSignInButton,
  GithubSignInButton,
  EmailSignIn,
} from '../components';
import { LineWave } from 'react-loader-spinner';
import Logo from '@/app/favicon.png';
import config from '@/config';
import Image from 'next/image';

export default function SignIn() {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(`/dashboard/page/`);
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="m-auto">
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="gray"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* <div className="flex items-center justify-center">
          <Image src={Logo} alt="Logo" width={40} height={40} />
        </div> */}

        <h2 className="mt-6 text-2xl text-center mb-10 font-bold text-zinc-950 dark:text-white">
          Sign in to {config.appName}
        </h2>
        <div className="mt-6">
          <GithubSignInButton />
          <GoogleSignInButton />
          <EmailSignIn />
        </div>
        <div className="px-2">
          <AcceptConditions />
        </div>
      </div>
    </>
  );
}
