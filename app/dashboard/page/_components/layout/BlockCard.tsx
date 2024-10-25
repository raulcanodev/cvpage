'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, Input, Switch, Textarea } from '@/components/ui';
import { ConfirmDeleteService, BlockCategorySelect, BlockImage } from '../ui';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import { ServicePriceDialog, LinkBlockDialog, BlockDate } from '../ui/';
import { Reorder, useDragControls } from 'framer-motion';
import { ReorderIcon } from './_components/DragIcon';
import { Service } from '@/types/types';

export interface ServiceCardProps extends Omit<Service, 'onDelete'> {
  serviceId: string;
  title?: string;
  subtitle?: string;
  description?: string;
  category?: string;
  active?: boolean;
  date?: string;
  dateEnd?: string;
  image?: string;
  link?: string;
  price?: string;
  location?: string;
  service?: Service;
  onDelete?: (serviceId: string) => Promise<void>;
  onUpdate: (serviceId: string, data: Partial<Service>) => Promise<void>;
}

export function BlockCard({
  serviceId,
  title,
  description,
  category,
  active,
  image,
  subtitle,
  link,
  price,
  location,
  date,
  dateEnd,
  service,
  onDelete,
  onUpdate,
}: ServiceCardProps) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item value={service} id={serviceId} dragListener={false} dragControls={dragControls}>
      <Card className={`border overflow-hidden rounded-2xl mb-2 dark:bg-zinc-900 bg-zinc-100`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <ReorderIcon dragControls={dragControls} />

            <div className="flex-1">
              {!category && <BlockCategorySelect serviceId={serviceId} initialCategory={category} />}
              {category === 'title' && <TitleCard serviceId={serviceId} title={title} onDelete={onDelete} onUpdate={onUpdate} />}
              {category === 'project' && (
                <ProjectCard
                  serviceId={serviceId}
                  title={title}
                  description={description}
                  active={active}
                  link={link}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              )}
              {category === 'service' && (
                <ServiceCard
                  serviceId={serviceId}
                  title={title}
                  description={description}
                  active={active}
                  link={link}
                  price={price}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              )}
              {category === 'textarea' && (
                <TextAreaCard serviceId={serviceId} description={description} onDelete={onDelete} onUpdate={onUpdate} />
              )}
              {category === 'workexperience' && (
                <WorkExperience
                  serviceId={serviceId}
                  title={title}
                  description={description}
                  date={date}
                  dateEnd={dateEnd}
                  subtitle={subtitle}
                  location={location}
                  active={active}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              )}
              {category === 'education' && (
                <Education
                  serviceId={serviceId}
                  title={title}
                  description={description}
                  date={date}
                  dateEnd={dateEnd}
                  subtitle={subtitle}
                  location={location}
                  active={active}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              )}
              {category === 'image' && <ImageCard serviceId={serviceId} image={image} onDelete={onDelete} onUpdate={onUpdate} />}
            </div>
          </div>
        </CardContent>
      </Card>
    </Reorder.Item>
  );
}

export function ProjectCard({ serviceId, title, description, active, link, onDelete, onUpdate }: ServiceCardProps) {
  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');

  const [debouncedTitle] = useDebounce(titleText, 500); // 500ms debounce delay
  const [debouncedDescription] = useDebounce(descriptionText, 500); // 500ms debounce delay

  // Trigger onUpdate only when the debounced values change
  useEffect(() => {
    if (debouncedTitle !== title) {
      onUpdate(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, title, serviceId, onUpdate]);

  useEffect(() => {
    if (debouncedDescription !== description) {
      onUpdate(serviceId, { description: debouncedDescription });
    }
  }, [debouncedDescription, description, serviceId, onUpdate]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <Input
            className="font-semibold bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 h-auto w-full"
            placeholder="Project"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
          />
        </div>
        <Switch
          className="data-[state=checked]:bg-slate-300"
          checked={active}
          onCheckedChange={(e) => onUpdate(serviceId, { active: e })}
        />
      </div>

      <Input
        className="bg-transparent text-gray-900 dark:text-white border-none focus:ring-0 mb-4 w-full h-auto"
        placeholder="Description"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />

      <div className="flex items-center justify-between text-zinc-400">
        <div className="flex gap-1 align-center">
          <LinkBlockDialog serviceId={serviceId} serviceLink={link || ''} />
        </div>
        <ConfirmDeleteService serviceId={serviceId} onDelete={onDelete} />
      </div>
    </>
  );
}

export function ServiceCard({
  serviceId,
  title,
  description,
  active,
  link,
  price,
  onDelete,
  onUpdate,
}: ServiceCardProps) {
  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');

  const [debouncedTitle] = useDebounce(titleText, 500); // 500ms debounce for title
  const [debouncedDescription] = useDebounce(descriptionText, 500); // 500ms debounce for description

  // Update the title only when debouncedTitle changes
  useEffect(() => {
    if (debouncedTitle !== title) {
      onUpdate(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, title, serviceId, onUpdate]);

  // Update the description only when debouncedDescription changes
  useEffect(() => {
    if (debouncedDescription !== description) {
      onUpdate(serviceId, { description: debouncedDescription });
    }
  }, [debouncedDescription, description, serviceId, onUpdate]);

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <Input
            className="font-semibold bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 h-auto w-full"
            placeholder="Service"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
          />
        </div>
        <Switch
          className="data-[state=checked]:bg-slate-300"
          checked={active}
          onCheckedChange={(e) => onUpdate(serviceId, { active: e })}
        />
      </div>

      <Textarea
        className="bg-transparent text-gray-900 dark:text-white border-none focus:ring-0 mb-4 w-full h-auto"
        placeholder="Description"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />

      <div className="flex items-center justify-between text-zinc-400">
        <div className="flex gap-1 align-center">
          <ServicePriceDialog serviceId={serviceId} servicePrice={price || ''} />
          <LinkBlockDialog serviceId={serviceId} serviceLink={link || ''} />
        </div>
        <ConfirmDeleteService serviceId={serviceId} onDelete={onDelete} />
      </div>
    </>
  );
}

export function TitleCard({ serviceId, title, onDelete, onUpdate }: ServiceCardProps) {
  const [titleText, setTitleText] = useState(title || '');
  const [debouncedTitle] = useDebounce(titleText, 500);

  useEffect(() => {
    if (debouncedTitle !== title) {
      onUpdate(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, title, serviceId, onUpdate]);

  return (
    <div className="flex items-center w-full">
      <Input
        className="font-semibold bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 h-auto w-full"
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
        aria-label="Block title"
      />
      
      <ConfirmDeleteService serviceId={serviceId} onDelete={onDelete} />
    </div>
  );
}

export function TextAreaCard({ serviceId, description, onDelete, onUpdate }: ServiceCardProps) {
  const [textArea, setTextArea] = useState(description || '');
  const [debouncedTextArea] = useDebounce(textArea, 500);

  useEffect(() => {
    if (debouncedTextArea !== description) {
      onUpdate(serviceId, { description: debouncedTextArea });
    }
  }, [debouncedTextArea, description, serviceId, onUpdate]);

  return (
    <>
      <Textarea
        className="bg-transparent border-none text-gray-900 dark:text-white"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <div className="text-right mt-3">
        <ConfirmDeleteService serviceId={serviceId} onDelete={onDelete} />
      </div>
    </>
  );
}

export function WorkExperience({
  serviceId,
  title,
  subtitle,
  description,
  active,
  location,
  date,
  dateEnd,
  onDelete,
  onUpdate,
}: ServiceCardProps) {
  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');
  const [subTitleText, setSubTitleText] = useState(subtitle || '');

  const [debouncedTitle] = useDebounce(titleText, 500);        // 500ms debounce for title
  const [debouncedSubTitle] = useDebounce(subTitleText, 500);  // 500ms debounce for subtitle
  const [debouncedDescription] = useDebounce(descriptionText, 500); // 500ms debounce for description

  useEffect(() => {
    if (debouncedTitle !== title) {
      onUpdate(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, title, serviceId, onUpdate]);

  useEffect(() => {
    if (debouncedSubTitle !== subtitle) {
      onUpdate(serviceId, { subtitle: debouncedSubTitle });
    }
  }, [debouncedSubTitle, subtitle, serviceId, onUpdate]);

  useEffect(() => {
    if (debouncedDescription !== description) {
      onUpdate(serviceId, { description: debouncedDescription });
    }
  }, [debouncedDescription, description, serviceId, onUpdate]);

  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-between mb-2 w-full">
        <div className="relative flex-grow md:mr-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            Role
          </span>
          <Input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            className="pl-[3.3rem] bg-transparent border-none text-gray-900 dark:text-white w-full"
          />
        </div>

        <div className="relative flex-grow md:ml-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            Company
          </span>
          <Input
            type="text"
            value={subTitleText}
            onChange={(e) => setSubTitleText(e.target.value)}
            className="pl-[5.6rem] bg-transparent border-none text-gray-900 dark:text-white w-full"
          />
        </div>
      </div>
      <Textarea
        className="bg-transparent border-none text-gray-900 dark:text-white"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />

      <div className="flex items-center justify-between text-zinc-400 mt-4 flex-col md:flex-row">
        <BlockDate serviceId={serviceId} date={date} dateEnd={dateEnd} />
        <ConfirmDeleteService serviceId={serviceId} onDelete={onDelete} />
      </div>
    </>
  );
}

export function Education({
  serviceId,
  title,
  subtitle,
  description,
  active,
  location,
  date,
  dateEnd,
  onDelete,
  onUpdate,
}: ServiceCardProps) {
  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');
  const [subTitleText, setSubTitleText] = useState(subtitle || '');

  const [debouncedTitle] = useDebounce(titleText, 500);
  const [debouncedSubTitle] = useDebounce(subTitleText, 500);
  const [debouncedDescription] = useDebounce(descriptionText, 500);

  useEffect(() => {
    if (debouncedTitle !== title) {
      onUpdate(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, title, serviceId, onUpdate]);

  useEffect(() => {
    if (debouncedSubTitle !== subtitle) {
      onUpdate(serviceId, { subtitle: debouncedSubTitle });
    }
  }, [debouncedSubTitle, subtitle, serviceId, onUpdate]);

  useEffect(() => {
    if (debouncedDescription !== description) {
      onUpdate(serviceId, { description: debouncedDescription });
    }
  }, [debouncedDescription, description, serviceId, onUpdate]);

  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-between mb-2 w-full">
        <div className="relative flex-grow md:mr-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            Degree
          </span>
          <Input
            type="text"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
            className="pl-[4.6rem] bg-transparent border-none text-gray-900 dark:text-white w-full"
          />
        </div>

        <div className="relative flex-grow md:ml-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            School
          </span>
          <Input
            type="text"
            value={subTitleText}
            onChange={(e) => setSubTitleText(e.target.value)}
            className="pl-[4.5rem] bg-transparent border-none text-gray-900 dark:text-white w-full"
          />
        </div>
      </div>

      <Textarea
        className="bg-transparent border-none text-gray-900 dark:text-white"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />

      <div className="flex items-center justify-between text-zinc-400 mt-4 flex-col md:flex-row">
        <BlockDate serviceId={serviceId} date={date} dateEnd={dateEnd} />
        <ConfirmDeleteService serviceId={serviceId} onDelete={onDelete} />
      </div>
    </>
  );
}

export function ImageCard({ serviceId, image, onDelete }: ServiceCardProps) {
  return (
    <>
      {image && (
        <Image
          className="w-full object-cover object-top rounded-xl"
          width={1280}
          height={720}
          src={image}
          alt="Block Image"
        />
      )}

      <div className="flex justify-between mt-4">
        <BlockImage serviceId={serviceId} />
        <ConfirmDeleteService serviceId={serviceId} onDelete={onDelete} />
      </div>
    </>
  );
}