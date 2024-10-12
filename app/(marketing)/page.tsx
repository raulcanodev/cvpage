'use client';
import {
  Navbar,
  Testimonials,
  Hero,
  KeyFeatures,
  BigCTA,
  Pricing,
  FAQSection,
  LogoProof,
  ProfileCard,
  CVSharingFeature,
  StatisticsBlock,
} from './_components';
import Link from 'next/link';

export default function Home() {
  const sectionClasses = '';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <main className="flex flex-col min-h-screen ">
        <Hero />
        <div className="w-full flex justify-center">
          <div className="max-w-screen-lg w-full px-4">
            <CVSharingFeature />
            <StatisticsBlock />
          </div>
        </div>
        <Testimonials />
        <div className="container">
          <FAQSection />
          <Pricing />
          <ProfileCard />
        </div>
        <BigCTA />
      </main>
    </div>
  );
}
