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

  const firstLetterName = name?.charAt(0) ?? '';

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <Avatar {...{ avatar, name, firstLetterName }} />

          {name && <Name {...{ name }} />}

          {location && <Location {...{ location }} />}

          {description && <Description {...{ description }} />}

          <SocialLinks {...{ twitterUrl, instagramUrl, linkedinUrl, githubUrl }} />
        </div>

        <Blocks {...{ filteredServices }} />

        {!premium && <Footer />}
      </div>
    </div>
  );
}
