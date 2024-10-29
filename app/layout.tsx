import type { Metadata } from 'next';
import { Inter, Caveat_Brush, Bricolage_Grotesque, Montserrat, Lora } from 'next/font/google';
import './globals.css';
import config from '@/config';
import PlausibleProvider from 'next-plausible'
import { Provider } from './context/Provider';

const inter = Inter({ subsets: ['latin'] });
const heroFont = Bricolage_Grotesque({ subsets: ['latin'], weight: '800', variable: '--font-rum_raisin' });
const montserrat = Montserrat({ subsets: ['latin'], weight: '400', variable: '--font-montserrat' });
const lora = Lora({ subsets: ['latin'], weight: '400', variable: '--font-lora' });

export const metadata: Metadata = {
  title: config.appName,
  description: config.appDescription,
  icons: {
    icon: "/icon.png",
  },
  
  openGraph: {
    type: 'website',
    url: `https://${config.domainName}`,
    title: config.appName,
    description: config.appDescription,
    siteName: config.appName,
    images: [
      {
        url: `https://${config.domainName}/og-image.png`,
        width: 1200,
        height: 630,
        alt: config.appName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: config.appName,
    description: config.appDescription,
    images: [`https://${config.domainName}/og-image.png`],
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/icon.png" sizes="any" />
      </head>
      <body className={`${inter.className} ${heroFont.variable} ${montserrat.variable} ${lora.variable}`} suppressHydrationWarning={true}>
        <PlausibleProvider domain={config.domainName}>
          <Provider>{children}</Provider>
        </PlausibleProvider>
      </body>
    </html>
  );
}