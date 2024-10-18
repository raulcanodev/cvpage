"use client";
import {
  Navbar,
  Testimonials,
  Hero,
  BottomCTA,
  Pricing,
  FAQSection,
  ProfileCard,
  CVSharingFeature,
  StatisticsBlock,
  MinimalFooter,
  RotatingUrl,
} from './_components';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="container flex flex-col min-h-screen">
        <Hero />
        <div className="w-full flex justify-center">
          <div className="max-w-screen-lg w-full px-4">
            {/* <RotatingUrl /> */}
            <CVSharingFeature />
            <StatisticsBlock />
          </div>
        </div>
        <Testimonials />
        <div className="p-4">
          <FAQSection />
          <Pricing />
          <ProfileCard />
        </div>
        <BottomCTA />
        <MinimalFooter />
      </main>
    </div>
  );
}
