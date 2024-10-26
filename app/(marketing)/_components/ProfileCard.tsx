import React from 'react';
import Image from 'next/image';
import config from '@/config';

export const ProfileCard: React.FC = () => {

  const LinkedInSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M8 11l0 5" />
      <path d="M8 8l0 .01" />
      <path d="M12 16l0 -5" />
      <path d="M16 16v-3a2 2 0 0 0 -4 0" />
    </svg>
  );

  const GithubSVG = () => (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="28"  height="28"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
      )

  const MailSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-mail"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
      <path d="M3 7l9 6l9 -6" />
    </svg>
  );

  return (
    <section className="py-16">
      <div className="container mx-auto flex justify-center items-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left md:space-x-8">
            <div className="mb-8 md:mb-0 w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
              <Image
                src="/raul.jpeg"
                alt={config.personal.name}
                width={200}
                height={200}
                className="rounded-lg shadow-lg object-cover w-full h-full"
              />
            </div>
            <div className="w-full md:w-2/3 flex flex-col items-center md:items-start">
              <h3 className="sm:text-5xl text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                Hey, {config.personal.name} here!
              </h3>

              {config.personal.title && (
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {config.personal.title}
                </p>
              )}

              {config.personal.description && (
                <p className="text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
                  {config.personal.description}
                </p>
              )}

              <div className="flex space-x-4 mb-6">
                {config.personal.github && (
                  <a
                    href={config.personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <GithubSVG/>
                    <span className="sr-only">GitHub</span>
                  </a>
                )}

                {config.personal.linkedin && (
                  <a
                    href={config.personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <LinkedInSVG/>
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}

                {config.personal.email && (
                  <a
                    href={`mailto:${config.personal.email}`}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    <MailSVG />
                    <span className="sr-only">Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};