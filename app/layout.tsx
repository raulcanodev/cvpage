import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import config from '@/config';

import { Provider } from './context/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: config.appName,
  description: config.appDescription,
  icons: {
    icon: "/icon.png",
  }
};


export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
      <link rel="icon" href="/icon.png" sizes="any" />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
