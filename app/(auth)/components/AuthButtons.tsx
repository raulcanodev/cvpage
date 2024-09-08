import { Github } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui';

export function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn('google')} className="w-full mt-4">
      Sign in with Google
    </Button>
  );
}

export function GithubSignInButton() {
  return;
}
