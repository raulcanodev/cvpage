import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui';
import { GoogleIcon, GitHubIcon } from '@/components/assets/svg';

export function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn('google')} className="w-full mt-4">
      <GoogleIcon width={25} height={25} className='mr-2' />
      Sign in with Google
    </Button>
  );
}

export function GithubSignInButton() {
  return (
    <Button
    onClick={() => signIn('github')}
    className="w-full mt-4 bg-zinc-900 text-white hover:bg-zinc-800 flex items-center justify-center"
    >
    <GitHubIcon width={25} height={25} fill="white" className='mr-2' />
      Sign in with GitHub
    </Button>
  );
}
