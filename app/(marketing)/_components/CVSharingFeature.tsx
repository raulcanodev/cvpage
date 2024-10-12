import React from 'react';
import { Button } from "@/components/ui/button"
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

const sharingPlatforms = [
  { name: 'LinkedIn', logo: '/linkedin-logo.png' },
  { name: 'GitHub', logo: '/github-logo.png' },
  { name: 'Indeed', logo: '/indeed-logo.png' },
  { name: 'Monster', logo: '/monster-logo.png' },
];
// "Track views and interactions",

const features = [
  "Shareable link for easy access",
  "Get more visibility and job opportunities",
  "Stand out from the crowd",
  "Customize your CV to match your style",
];

export function CVSharingFeature() {
  return (
    <section className="flex items-center mt-14 md:mt-0 p-4 px-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
              Share Your CV Effortlessly
            </h2>
            <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
              Boost your visibility and land your dream job by sharing your CV across multiple platforms.
            </p>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
              Supported Platforms
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {sharingPlatforms.map((platform) => (
                <div key={platform.name} className="flex flex-col items-center">
                  <div className="w-16 h-16 relative mb-2">
                    <Image
                      src={platform.logo}
                      alt={`${platform.name} logo`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}