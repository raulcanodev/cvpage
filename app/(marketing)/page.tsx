"use client";
import { motion } from 'framer-motion';
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

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection = ({ children, className = '' }: AnimatedSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-zinc-950">
      <Navbar/>
      <main className="container flex flex-col min-h-screen">
        <AnimatedSection>
          <Hero />
        </AnimatedSection>
        <div className="w-full flex justify-center">
          <div className="max-w-screen-lg w-full">
            {/* <RotatingUrl /> */}
            <AnimatedSection>
              <CVSharingFeature />
            </AnimatedSection>
            <AnimatedSection>
              <StatisticsBlock />
            </AnimatedSection>
          </div>
        </div>
        <AnimatedSection>
          <Testimonials />
        </AnimatedSection>
        <div className="">
          <AnimatedSection>
            <FAQSection />
          </AnimatedSection>
          <AnimatedSection>
            <Pricing />
          </AnimatedSection>
          <AnimatedSection>
            <ProfileCard />
          </AnimatedSection>
        </div>
        <AnimatedSection>
          <BottomCTA />
        </AnimatedSection>
          <MinimalFooter />
      </main>
    </div>
  );
}