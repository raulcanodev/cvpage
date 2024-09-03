'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar, Testimonials, Hero, KeyFeatures, BigCTA, Pricing, FAQS } from './_components';
import { Footer } from '@/components/layout';


// v0
import { useState } from 'react';


export default function Home() {



  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      {/* bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 */}
      <main className="flex flex-col min-h-screen ">
        <Hero/> 
        <KeyFeatures/>
        <Pricing/>
        <FAQS/>
        {/* <Video /> */}
        <Testimonials />
        <BigCTA/>
      </main>
      {/* <Footer/> */}
    </div>
  );
}
