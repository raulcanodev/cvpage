'use client';
import { Navbar, Testimonials, Hero, KeyFeatures, BigCTA, Pricing, FAQSection, LogoProof } from './_components';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex flex-col min-h-screen ">
        <Hero/> 
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
