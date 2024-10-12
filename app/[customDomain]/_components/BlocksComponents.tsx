import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui';

// Interface for the Service
interface Service {
  title?: string;
  subtitle?: string;
  price?: string;
  description?: string;
  category?: string;
  link?: string;
  date?: string;
  location?: string;
  image?: string;
  active?: boolean;
}

// Tailwind classes for minimal design
const containerStyle = 'p-2 border rounded-lg bg-transparent';
const titleStyle = 'text-lg font-semibold text-gray-900 whitespace-pre-wrap';
const titleStyle2 = 'text-md font-semibold text-gray-900 truncate';
const descriptionStyle = 'text-sm text-gray-600 mb-2 whitespace-pre-wrap';
const linkButtonStyle = 'inline-flex items-center text-blue-600 hover:underline';
const priceStyle = 'text-sm text-gray-900 font-medium';
const imageStyle = 'w-full h-auto rounded-lg mb-4';

export const ImageBlock = ({ service }: { service: Service }) => (
  <div className={containerStyle}>
    {service.image && (
      <Image
        src={service.image}
        alt={service.title || ''}
        width={1280}
        height={720}
        className={imageStyle}
      />
    )}
  </div>
);

export const TitleBlock = ({ service }: { service: Service }) => (
  <h2 className={titleStyle}>{service.title}</h2>
);

export const DescriptionBlock = ({ service }: { service: Service }) => (
  <p className={descriptionStyle}>{service.description}</p>
);

export const WorkExperienceBlock = ({ service }: { service: Service }) => (
  <div className={containerStyle}>
    <div className="flex flex-col">
      <h2 className={titleStyle2}>{service.title}</h2>
      {service.subtitle && (
        <span className="text-sm text-gray-500">{service.subtitle}</span>
      )}
    </div>
    {service.date && (
      <p className="text-xs text-gray-500 mb-1">{service.date}</p>
    )}
    {service.location && (
      <p className="text-xs text-gray-500 mb-1">{service.location}</p>
    )}
    <p className={descriptionStyle}>{service.description}</p>
    {service.link && (
      <div className="flex justify-end">
        <Link href={service.link} target="_blank">
          <div className="flex items-center text-sm hover:text-zinc-500">
            Learn More <ExternalLink className="ml-2 h-4 w-4" />
          </div>
        </Link>
      </div>
    )}
  </div>
);

export const ProjectBlock = ({ service }: { service: Service }) => (
  <>
  <div className={containerStyle}>
    <div className='flex justify-between gap-2'>
    <h2 className={titleStyle2}>{service.title}</h2>
    {service.category && <Badge className="mb-2">{service.category}</Badge>}
    </div>
    <p className={descriptionStyle}>{service.description}</p>
    {service.link && (
      <div className="flex justify-end">
        <Link href={service.link} target="_blank">
          <div className='flex items-center text-sm hover:text-zinc-500'>
            Visit Project <ExternalLink className="ml-2 h-4 w-4" />
          </div>
        </Link>
      </div>
    )}
  </div>
  </>
);

export const ServiceBlock = ({ service }: { service: Service }) => (
  <div className={containerStyle}>
    <div className='flex justify-between'>
    <h2 className={titleStyle2}>{service.title}</h2>
    {service.category && <Badge className="mb-2 bg-green-500 text-white">{service.category}</Badge>}
    </div>
    <p className={descriptionStyle}>{service.description}</p>
    <div className="flex justify-between items-center mt-4">
      {service.price && <Badge variant="outline">Price: {service.price} </Badge>}
      {service.link && (
         <Link href={service.link} target="_blank">
         <div className='flex items-center text-sm hover:text-zinc-500'>
            I&apos;m interested <ExternalLink className="ml-2 h-4 w-4" />
         </div>
       </Link>
      )}
    </div>
  </div>
);
