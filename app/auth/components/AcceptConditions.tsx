import Link from 'next/link';

export function AcceptConditions() {
  return (
    <p className="mt-6 text-xs text-zinc-400 text-center">
      By clicking continue, you agree to our{' '}
      <Link href="/tos" className="text-zinc-950 dark:text-white hover:underline">
        Terms of Service
      </Link>{' '}
      and{' '}
      <Link href="/privacy-policy" className="text-zinc-950 dark:text-white hover:underline">
        Privacy Policy
      </Link>
      .
    </p>
  );
}
