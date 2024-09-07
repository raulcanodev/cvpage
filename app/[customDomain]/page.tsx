import { getUserByCustomDomain, getServiceById } from '@/actions';
import { notFound, redirect } from 'next/navigation';
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Twitter, Instagram, Linkedin, Github, ExternalLink } from 'lucide-react'
import { g } from 'framer-motion/client';

interface Props {
  params: {
    customDomain: string;
  };
}

export default async function UserProfilePage({ params }: Props) {
  const { customDomain } = params;

  const userData = await getUserByCustomDomain(customDomain);
  
  const { name, description, location, instagramUrl, linkedinUrl, twitterUrl, githubUrl, services  } = JSON.parse(userData);  
  
  const allServices = await Promise.all(services.map(async (serviceId: string) => {
    const serviceData = await getServiceById(serviceId);
    return serviceData;
  }, []));

  const filteredServices = allServices.filter(service => service.active);

  const socialLinks = [
    { icon: Twitter, href: twitterUrl },
    { icon: Instagram, href: instagramUrl },
    { icon: Linkedin, href: linkedinUrl },
    { icon: Github, href: githubUrl },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Avatar className="w-40 h-40 mx-auto mb-6 border-4">
            <AvatarImage src="/placeholder.svg?height=160&width=160" alt="Raul" />
            <AvatarFallback>RA</AvatarFallback>
          </Avatar>
          <h1 className="text-5xl font-bold mb-4">{name}</h1>
          <p className="text-2xl text-gray-300 mb-6">Indie Hacker & Web Developer</p>
          <div className="flex items-center justify-center text-gray-400 mb-8">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-lg">{location}</span>
          </div>
          <p className="text-gray-300 text-xl mb-8">
            {description}
          </p>
          <div className="flex justify-center space-x-6 mb-12">
            {socialLinks.map((link, index) => (
              link.href && link.icon ? (
                <a 
                  key={index} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <link.icon className="w-8 h-8" />
                </a>
              ) : null
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {filteredServices.map((service, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-300 text-lg mb-6">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-bold text-xl">{service.price}</span>
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <footer className="mt-20 text-center text-gray-400">
          <p className="text-lg">© 2024 Raul. All rights reserved.</p>
          <p className="mt-3 text-base">
            Powered by <a href="https://hitme.to" className="text-blue-400 hover:underline">hitme.to</a>
          </p>
        </footer>
      </div>
    </div>
  )
}