import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui';
import { GoogleIcon, GitHubIcon } from '@/components/assets/svg';
import { useState } from 'react';

export function GoogleSignInButton() {
  return (
    <Button onClick={() => signIn('google')} className="w-full mt-4 bg-white text-zinc-950 border hover:bg-zinc-100">
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

export function EmailSignIn() {
  const [showEmailOption, setShowEmailOption] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  return (
    <form
        onSubmit={async (e) => {
          e.preventDefault();
          setMessage("");
          setError("");
          signIn("email", {
            email,
            redirect: false,
          }).then((res) => {
            if (res?.ok && !res?.error) {
              setEmail("");
              setMessage("Email sent - check your inbox!");
            } else {
              setError("Error sending email - try again?");
            }
          });
        }}
        className="flex flex-col space-y-3"
      >
        {showEmailOption && (
          <div>
            <input
              id="email"
              name="email"
              autoFocus={true}
              type="email"
              placeholder="partytime@thedis.co"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            />
          </div>
        )}
        <button className="h-10 w-full items-center justify-center space-x-2 rounded-md border px-4 text-sm transition-all focus:outline-none border-gray hover:border-black"
          {...(!showEmailOption && {
            type: "button",
            onClick: (e) => {
              e.preventDefault();
              setShowEmailOption(true);
            },
          })}
        >Continue with Email</button>
        {error && (<p className="text-center text-sm text-red-500">{error}</p>)}
        {message && (<p className="text-center text-sm text-green-500">{message}</p>)}
      </form>
  )
}