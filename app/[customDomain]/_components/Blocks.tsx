import { ImageBlock, TitleBlock, DescriptionBlock, WorkExperienceBlock, ProjectBlock, EducationBlock } from './BlocksComponents';

interface BlocksProps {
  filteredServices: any[];
  pageColor: string;
}

export const Blocks = ({ filteredServices, pageColor }: BlocksProps) => {
  return (
    <div className="space-y-4">
      {filteredServices.map((service, index) => (
        <div key={index} className="rounded-lg">
          {service.category === 'image' && <ImageBlock service={service} />}
          {service.category === 'title' && <TitleBlock service={service} pageColor={pageColor} />}
          {service.category === 'textarea' && <DescriptionBlock service={service} pageColor={pageColor} />}
          {service.category === 'workexperience' && <WorkExperienceBlock service={service} pageColor={pageColor} />}
          {service.category === 'project' && <ProjectBlock service={service} pageColor={pageColor} />}
          {service.category === 'education' && <EducationBlock service={service} pageColor={pageColor} />}
        </div>
      ))}
    </div>
  );
};