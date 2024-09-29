import { getUserByCustomDomain, getServiceById } from '@/actions';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  Button,
} from '@/components/ui';
import { MapPin, Twitter, Instagram, Linkedin, Github, Send, Link } from 'lucide-react';

interface Props {
  params: {
    customDomain: string;
  };
}

export default async function UserProfilePage({ params }: Props) {
  const { customDomain } = params;

  const userData = await getUserByCustomDomain(customDomain);  

  const {
    name,
    description,
    location,
    avatar,
    instagramUrl,
    linkedinUrl,
    twitterUrl,
    githubUrl,
    services,
    premium,
    pageColor,
    pageFont,
  } = JSON.parse(userData);

  const allServices = await Promise.all(
    services.map(async (serviceId: string) => {
      const serviceData = await getServiceById(serviceId);
      return serviceData;
    }, [])
  );

  const filteredServices = allServices.filter((service) => service.active);

  const socialLinks = [
    { icon: Twitter, href: twitterUrl },
    { icon: Instagram, href: instagramUrl },
    { icon: Linkedin, href: linkedinUrl },
    { icon: Github, href: githubUrl },
  ];

  const firstLetterName = name?.charAt(0) ?? '';

  return (
    <div className="min-h-screen relative">
      {/* Background element */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <Avatar className="w-32 h-32 mx-auto mb-6 object-cover">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{firstLetterName}</AvatarFallback>
          </Avatar>

          <h1 className="text-4xl text-zinc-700 font-bold mb-4">{name}</h1>

          {location && (
            <div className="flex gap-1 items-center justify-center text-zinc-400 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{location}</span>
            </div>
          )}

          <p className="text-zinc-500 mb-8">{description}</p>

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
        </div>

        {/* TWO ROW BUTTON FOR CATEGORIE SERVICE AND PROJECTS */}
        {/* <div className="flex justify-center gap-4 mb-4">
          <Button className="w-1/2">Services</Button>
          <Button className="w-1/2">Projects</Button>
        </div> */}

        {/* SERVICE LIST */}
        <div className="flex flex-col gap-3">
          {filteredServices.map((service, index) => (
            <Card key={index} className="bg-zinc-50 border-zinc-300 rounded-2xl">
              <CardContent className="p-4">
                <div className="flex flex-row gap-2 justify-between">
                  <h3 className="flex-1 text-xl text-zinc-800 font-semibold mb-2">
                    {service.title}
                  </h3>
                  {service.price && (
                    <Badge className="whitespace-nowrap px-3 py-1 self-start" variant="secondary">
                      {service.price} <span>&euro;</span>
                    </Badge>
                  )}
                </div>

                <p className="text-zinc-500 mb-4">{service.description}</p>

                <div className="flex justify-between items-center">
                  {/* <span className="text-zinc-500 font-bold text">90$</span> */}
                  {/* <Send className="text-zinc-700 w-5" /> */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {!premium && (
          <footer className="mt-20 text-center text-gray-400">
            <p className="text-lg">© 2024 hitme.to. All rights reserved.</p>
            <p className="mt-3 text-base">
              Powered by{' '}
              <a href="https://hitme.to" className="text-zinc-900 hover:underline">
                hitme.to
              </a>
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}
