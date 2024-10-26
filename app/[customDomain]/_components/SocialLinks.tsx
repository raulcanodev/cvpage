import React from 'react';
import { Mail, Linkedin, Twitter, Github } from 'lucide-react';

interface SocialLinksProps {
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  emailContact: string;
  pageColor: string;
}

export const SocialLinks = ({
  twitterUrl,
  instagramUrl,
  emailContact,
  linkedinUrl,
  githubUrl,
  pageColor,
}: SocialLinksProps) => {
  const socialLinks = [
    emailContact ? {icon: Mail, href: `mailto:${emailContact}`} : {icon: Mail, href: ''},
    { icon: Linkedin, href: linkedinUrl },
    { icon: Twitter, href: twitterUrl },
    { icon: Github, href: githubUrl },
  ];

  const getLinkStyle = (color: string) => {
    switch (color) {
      case 'monochrome':
        return 'text-zinc-400 hover:text-zinc-600 border-zinc-400 hover:border-zinc-600';
      case 'midnight':
        return 'text-gray-400 hover:text-white border-gray-400 hover:border-white';
      case '2000':
      case 'electric purple':
        return 'text-gray-200 hover:text-white border-gray-200 hover:border-white';
      default:
        return 'text-zinc-400 hover:text-zinc-600 border-zinc-400 hover:border-zinc-600';
    }
  };

  const linkStyle = getLinkStyle(pageColor);

  return (
    <div className="mb-8 space-x-4 mt-4">
      {socialLinks.map((link, index) =>
        link.href ? (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkStyle} transition-colors inline-block p-1`}
          >
            <link.icon className="w-6 h-6" />
          </a>
        ) : null
      )}
    </div>
  );
}