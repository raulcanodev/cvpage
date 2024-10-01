'use client';
import { Navbar, Testimonials, Hero, KeyFeatures, BigCTA, Pricing, FAQSection, LogoProof, ProfileCard } from './_components';
import Link from 'next/link';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex flex-col min-h-screen ">
        <Hero/> 
        <div>
    </div>
        {/* <KeyFeatures/> */}
        <Pricing/>
        <FAQSection/>
        <Testimonials />
        <ProfileCard/>
        {/* <LogoProof/> */}
        <BigCTA/>
      </main>
    </div>
  );
}
