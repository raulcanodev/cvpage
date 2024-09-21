'use client';
import { Navbar, Testimonials, Hero, KeyFeatures, BigCTA, Pricing, FAQSection, LogoProof } from './_components';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex flex-col min-h-screen ">
        <Hero/> 
        <div>
      <Link href="https://hitme.lemonsqueezy.com/buy/9cb2a0ed-191d-4d81-a9f5-72361c356a43">
        <button className='text-white'>Comprar ahora</button>
      </Link>
    </div>
        {/* <KeyFeatures/> */}
        <Pricing/>
        <FAQSection/>
        <Testimonials />
        {/* <LogoProof/> */}
        <BigCTA/>
      </main>
    </div>
  );
}
