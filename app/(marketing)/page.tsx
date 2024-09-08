'use client';
import { Navbar, Testimonials, Hero, KeyFeatures, BigCTA, Pricing, FAQS } from './_components';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex flex-col min-h-screen ">
        <Hero/> 
        <KeyFeatures/>
        <Pricing/>
        <FAQS/>
        <Testimonials />
        <BigCTA/>
      </main>
    </div>
  );
}
