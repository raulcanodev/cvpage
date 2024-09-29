import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Service {
  title?: string;
  subtitle?: string;
  price?: string;
  description?: string;
  category?: string;
  link?: string; 
  data?: string;
  location?: string;
  image?: string;
  active?: boolean;
}

const commonCardStyle = "bg-white border-b border-gray-200";
const commonTitleStyle = "text-lg font-semibold text-gray-900";
const commonDescriptionStyle = "text-sm text-gray-600";

export const ImageBlock = ({ service }: { service: Service }) => (
  <Card className={`${commonCardStyle} overflow-hidden`}>
    {service.image && (
      <Image
        src={service.image}
        alt={service.title || ''}
        width={1280}
        height={720}
        className="w-full h-auto"
      />
    )}
  </Card>
);

export const TitleBlock = ({ service }: { service: Service }) => (
  <Card className={commonCardStyle}>
    <CardHeader>
      <CardTitle className={commonTitleStyle}>{service.title}</CardTitle>
      <CardDescription className={commonDescriptionStyle}>{service.description}</CardDescription>
    </CardHeader>
  </Card>
);

export const DescriptionBlock = ({ service }: { service: Service }) => (
  <Card className={commonCardStyle}>
    <CardContent className="py-3">
      <p className={commonDescriptionStyle}>{service.description}</p>
    </CardContent>
  </Card>
);

export const WorkExperienceBlock = ({ service }: { service: Service }) => (
  <Card className={commonCardStyle}>
    <CardHeader>
      <CardTitle className={commonTitleStyle}>{service.title}</CardTitle>
      <CardDescription className={commonDescriptionStyle}>{service.description}</CardDescription>
      <p className="text-xs text-gray-500 mt-1">{service.location}</p>
    </CardHeader>
  </Card>
);

export const Project = ({ service }: { service: Service }) => (
  <Card className={commonCardStyle}>
    <CardHeader>
      <CardTitle className={commonTitleStyle}>{service.title}</CardTitle>
      <CardDescription className={commonDescriptionStyle}>{service.description}</CardDescription>
    </CardHeader>
  </Card>
);

export const Service = ({ service }: { service: Service }) => (
  <Card className={commonCardStyle}>
    <CardHeader>
      <CardTitle className={commonTitleStyle}>{service.title}</CardTitle>
      <CardDescription className={commonDescriptionStyle}>{service.description}</CardDescription>
    </CardHeader>
  </Card>
);