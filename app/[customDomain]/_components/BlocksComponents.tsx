import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui';

interface Service {
  title?: string;
  subtitle?: string;
  price?: string;
  description?: string;
  category?: string;
  link?: string;
  date?: string;
  dateEnd?: string;
  location?: string;
  image?: string;
  active?: boolean;
}

const containerStyle = 'my-2';
const titleStyle = 'text-2xl font-bold text-gray-900 mb-2 mt-8';
const subtitleStyle = 'text-xl font-semibold text-gray-800 mb-1';
const descriptionStyle = 'text-base text-gray-600 whitespace-pre-wrap mb-2';
const dateStyle = 'text-sm text-gray-500 mb-2';
const linkButtonStyle = 'inline-flex items-center text-gray-600 hover:underline mt-2';

export const ImageBlock = ({ service }: { service: Service }) => (
  <div className={containerStyle}>
    {service.image && (
      <Image
        src={service.image}
        alt={service.title || ''}
        width={1280}
        height={720}
        className="w-full h-auto rounded-lg mb-4"
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
    <h3 className={subtitleStyle}>{service.title}</h3>
    {service.subtitle && (
      <p className="text-lg font-medium text-gray-700 mb-1">{service.subtitle}</p>
    )}
    {(service.date || service.dateEnd) && (
      <p className={dateStyle}>
        {service.date}
        {service.date && service.dateEnd && ' - '}
        {service.dateEnd}
      </p>
    )}
    <p className={descriptionStyle}>{service.description}</p>
    {service.link && (
      <Link href={service.link} target="_blank" className={linkButtonStyle}>
        Learn More <ExternalLink className="ml-2 h-4 w-4" />
      </Link>
    )}
  </div>
);

export const ProjectBlock = ({ service }: { service: Service }) => (
  <div className={containerStyle}>
    <div className='flex justify-between items-center mb-2'>
      <h3 className={subtitleStyle}>{service.title}</h3>
      {service.category && <Badge>{service.category}</Badge>}
    </div>
    <p className={descriptionStyle}>{service.description}</p>
    {service.link && (
      <Link href={service.link} target="_blank" className={linkButtonStyle}>
        Visit Project <ExternalLink className="ml-2 h-4 w-4" />
      </Link>
    )}
  </div>
);

export const ServiceBlock = ({ service }: { service: Service }) => (
  <div className={containerStyle}>
    <div className='flex justify-between items-center mb-2'>
      <h3 className={subtitleStyle}>{service.title}</h3>
      {service.category && <Badge variant="secondary">{service.category}</Badge>}
    </div>
    <p className={descriptionStyle}>{service.description}</p>
    <div className="flex justify-between items-center mt-4">
      {service.price && <Badge variant="outline">Price: {service.price}</Badge>}
      {service.link && (
        <Link href={service.link} target="_blank" className={linkButtonStyle}>
          I'm interested <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  </div>
);

export const EducationBlock = ({ service }: { service: Service }) => (
  <div className={containerStyle}>
    <h3 className={subtitleStyle}>{service.title}</h3>
    {service.subtitle && (
      <p className="text-lg font-medium text-gray-700 mb-1">{service.subtitle}</p>
    )}
    {(service.date || service.dateEnd) && (
      <p className={dateStyle}>
        {service.date}
        {service.date && service.dateEnd && ' - '}
        {service.dateEnd}
      </p>
    )}
    <p className={descriptionStyle}>{service.description}</p>
  </div>
);