import { getUserByCustomDomain, getServiceById } from '@/actions';
import { SocialLinks, Avatar, Footer, Location, Description, Blocks, Name } from './_components';

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
    emailContact,
    pageColor,
    pageFont,
  } = JSON.parse(userData);

  const allServices = await Promise.all(
    services.map(async (serviceId: string) => {
      const serviceData = await getServiceById(serviceId);
      return serviceData;
    })
  );

  const filteredServices = allServices.filter((service) => service.active);

  const firstLetterName = name?.charAt(0) ?? '';

  const getBackgroundStyle = (color: string) => {
    switch (color) {
      case 'monochrome':
        return 'bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]';
      case 'plain dark':
        return 'bg-zinc-950 text-white';
    }
  };

  const getFontStyle = (font: string) => {
    switch (font) {
      case 'cvpage':
        return '';
      case 'montserrat':
        return 'montserrat-font';
      case 'mono':
        return 'font-mono';
      case 'lora':
        return 'lora-font';
      default:
        return '';
    }
  };

  const backgroundStyle = getBackgroundStyle(pageColor);
  const fontStyle = getFontStyle(pageFont);

  return (
      <div className={`min-h-screen relative ${backgroundStyle} ${fontStyle}`}>
        <div className="max-w-[700px] mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="md:hidden self-center mb-2">
              <Avatar {...{ avatar, name, firstLetterName }} />
            </div>
            <div className="w-full md:flex-grow text-center md:text-left flex flex-col items-center md:items-start">
              {name && <Name {...{ name, pageColor }} />}
              {description && <Description {...{ description, pageColor }} />}
              {location && <Location {...{ location, pageColor }} />}
              <SocialLinks {...{ twitterUrl, instagramUrl, linkedinUrl, githubUrl, emailContact, pageColor }} />
            </div>
            <div className="hidden md:block md:self-start">
              <Avatar {...{ avatar, name, firstLetterName }} />
            </div>
          </div>

          <Blocks {...{ filteredServices, pageColor }} />

          {!premium && <Footer pageColor={pageColor} />}
        </div>
      </div>
  );
}