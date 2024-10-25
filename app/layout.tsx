import type { Metadata } from 'next';
import { Inter, Caveat_Brush, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import config from '@/config';
import Head from 'next/head';

import { Provider } from './context/Provider';

const inter = Inter({ subsets: ['latin'] });

const heroFont = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: '800',
  variable: '--font-rum_raisin',
});

export const metadata: Metadata = {
  title: config.appName,
  description: config.appDescription,
  icons: {
    icon: '/icon.png',
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Head>
        <script
          defer
          data-domain="cvpage.to"
          src="https://plausible.io/js/script.outbound-links.js"
        ></script>
      </Head>
      <body className={`${inter.className} ${heroFont.variable}`} suppressHydrationWarning={true}>
        <link rel="icon" href="/icon.png" sizes="any" />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
