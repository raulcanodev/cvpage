import React from 'react';
import { MapPin, Twitter, Instagram, Linkedin, Github, Send, Link } from 'lucide-react';

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
    { icon: Twitter, href: twitterUrl },
    { icon: Instagram, href: instagramUrl },
    { icon: Linkedin, href: linkedinUrl },
    { icon: Github, href: githubUrl },
  ];
  return (
    <>
      <div className="flex justify-center space-x-6 mb-8">
        {socialLinks.map((link, index) =>
          link.href && link.icon ? (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              <link.icon className="w-7 h-7" />
            </a>
          ) : null
        )}
      </div>
    </>
  );
}
