import { ImageBlock, TitleBlock, DescriptionBlock, WorkExperienceBlock, Project, Simple } from './BlocksComponents';

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

interface BlocksProps {
  filteredServices: Service[];
  pageColor: string;
  pageFont: string;
}

export const Blocks = ({ filteredServices, pageColor, pageFont }: BlocksProps) => {

  const renderServiceBlock = (service: Service) => {
    switch (service.category) {
      case 'image':
        return <ImageBlock service={service} />;
      case 'title':
        return <TitleBlock service={service} />;
      case 'textarea':
        return <DescriptionBlock service={service} />;
      case 'workexperience':
        return <WorkExperienceBlock service={service} />;
      case 'project':
        return <Project service={service}/>;
      case 'service':
        return <div>Service Block</div>;
      case 'simple':
        return <Simple service={service}/>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {filteredServices.map((service, index) => (
        <div key={index}>
          {renderServiceBlock(service)}
        </div>
      ))}
    </div>
  );
};
