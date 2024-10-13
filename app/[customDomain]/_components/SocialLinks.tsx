import React from 'react';
import { Mail, Phone, Linkedin, Twitter, Github } from 'lucide-react';

interface SocialLinks {
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  githubUrl: string;
}

export const SocialLinks = ({
  twitterUrl,
  instagramUrl,
  linkedinUrl,
  githubUrl,
}: SocialLinks) => {
  const socialLinks = [
    { icon: Mail, href: "mailto:example@example.com" },
    { icon: Linkedin, href: linkedinUrl },
    { icon: Twitter, href: twitterUrl },
    { icon: Github, href: githubUrl },
  ];
  return (
    <div className="mb-8 space-x-4 mt-4">
    {socialLinks.map((link, index) =>
      link.href ? (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-zinc-600 transition-colors inline-block "
        >
          <link.icon className="w-6 h-6" />
        </a>
      ) : null
    )}
  </div>
  );
}