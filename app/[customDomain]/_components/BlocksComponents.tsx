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

interface BlockProps {
  service: Service;
  pageColor: string;
}

const getStyles = (pageColor: string) => {
  const baseStyles = {
    title: 'text-3xl font-bold mt-10',
    subtitle: 'text-lg font-medium mb-1',
    description: 'whitespace-pre-wrap mb-2',
    date: 'text-xs mb-2',
    link: 'inline-flex items-center text-sm hover:underline mt-2',
    container: 'flex flex-col sm:flex-row justify-between items-start gap-2 my-4',
    content: 'flex-1',
  };

  switch (pageColor) {
    case 'monochrome':
      return {
        ...baseStyles,
        title: `${baseStyles.title} text-gray-900 dark:text-gray-900`,
        subtitle: `${baseStyles.subtitle} text-gray-700 dark:text-gray-700`,
        description: `${baseStyles.description} text-gray-600 dark:text-gray-600`,
        date: `${baseStyles.date} text-gray-500 dark:text-gray-500`,
        link: `${baseStyles.link} text-gray-600 dark:text-gray-600`,
      };
    case 'midnight':
      return {
        ...baseStyles,
        title: `${baseStyles.title} text-white dark:text-gray-50`,
        subtitle: `${baseStyles.subtitle} text-gray-50 dark:text-gray-50`,
        description: `${baseStyles.description} text-gray-300 dark:text-gray-300`,
        date: `${baseStyles.date} text-gray-300 dark:text-gray-300`,
        link: `${baseStyles.link} text-gray-300 dark:text-gray-300`,
      };
    case 'plain dark':
      return {
        ...baseStyles,
        title: `${baseStyles.title} text-white dark:text-gray-50`,
        subtitle: `${baseStyles.subtitle} text-gray-50 dark:text-gray-50`,
        description: `${baseStyles.description} text-gray-300 dark:text-gray-300`,
        date: `${baseStyles.date} text-gray-400 dark:text-gray-400`,
        link: `${baseStyles.link} text-gray-200 dark:text-gray-200`,
      };
    default:
      return baseStyles;
  }
};

export const ImageBlock = ({ service }: { service: Service }) => (
  <div className="my-2">
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

export const TitleBlock = ({ service, pageColor }: BlockProps) => {
  const styles = getStyles(pageColor);
  return <h2 className={styles.title}>{service.title}</h2>;
};

export const DescriptionBlock = ({ service, pageColor }: BlockProps) => {
  const styles = getStyles(pageColor);
  return <p className={styles.description}>{service.description}</p>;
};

export const ProjectBlock = ({ service, pageColor }: BlockProps) => {
  const styles = getStyles(pageColor);
  return (
    <div className="my-2">
      <div className='flex justify-between items-center mb-2'>
        <h3 className={styles.subtitle}>{service.title}</h3>
        {service.category && <Badge>{service.category}</Badge>}
      </div>
      <p className={styles.description}>{service.description}</p>
      {service.link && (
        <Link href={service.link} target="_blank" className={styles.link}>
          Visit Project <ExternalLink className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  );
};

export const EducationBlock = ({ service, pageColor }: BlockProps) => {
  const styles = getStyles(pageColor);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.subtitle}>{service.title}</h3>
        {service.subtitle && (
          <p className={`${styles.subtitle} font-medium mb-2`}>{service.subtitle}</p>
        )}
        <p className={styles.description}>{service.description}</p>
      </div>
      {(service.date || service.dateEnd) && (
        <p className={`${styles.date} text-right sm:text-left sm:whitespace-nowrap`}>
          {service.date}
          {service.date && service.dateEnd && ' - '}
          {service.dateEnd}
        </p>
      )}
    </div>
  );
};

export const WorkExperienceBlock = ({ service, pageColor }: BlockProps) => {
  const styles = getStyles(pageColor);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3 className={styles.subtitle}>{service.title}</h3>
        {service.subtitle && (
          <p className={`${styles.subtitle} font-medium mb-2`}>{service.subtitle}</p>
        )}
        <p className={styles.description}>{service.description}</p>
      </div>
      {(service.date || service.dateEnd) && (
        <p className={`${styles.date} text-right sm:text-left sm:whitespace-nowrap`}>
          {service.date}
          {service.date && service.dateEnd && ' - '}
          {service.dateEnd}
        </p>
      )}
    </div>
  );
};