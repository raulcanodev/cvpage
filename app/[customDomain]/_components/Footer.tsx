import config from '@/config';
export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="mt-20 text-center text-gray-400">
        <p className="text-lg">© {year} {config.appName}. All rights reserved.</p>
        <p className="mt-3 text-base">
          Powered by{' '}
          <a href={config.domainUrl} className="text-zinc-900 hover:underline">
            {config.domainName}
          </a>
        </p>
      </footer>
    </>
  );
};
