'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, Input, Switch, Textarea } from '@/components/ui';
import { GripVertical } from 'lucide-react';
import { ConfirmDeleteService, BlockCategorySelect, BlockImage } from '../ui';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import { ServicePriceDialog, LinkBlockDialog, BlockDate } from '../ui/';

import { useMotionValue, Reorder, useDragControls } from 'framer-motion';
import { ReorderIcon } from './_components/DragIcon';

interface ServiceCardProps {
  serviceId: string;
  title?: string;
  subtitle?: string;
  description?: string;
  category?: string;
  active?: boolean;
  date?: any;
  image?: string;
  link?: string;
  price?: string;
  location?: string;
  service?: ServiceCardProps;
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
  service
}: ServiceCardProps) {

  const dragControls = useDragControls();

  return (
    <Reorder.Item value={service} id={serviceId} dragListener={false} dragControls={dragControls}>

      <Card className={`border overflow-hidden rounded-2xl mb-2 dark:bg-zinc-900 bg-zinc-100`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <ReorderIcon dragControls={dragControls} />

            <div className="flex-1">
              {!category && <BlockCategorySelect serviceId={serviceId} />}
              {category === 'title' && <TitleCard serviceId={serviceId} title={title} />}
              {category === 'project' && (
                <ProjectCard
                  serviceId={serviceId}
                  title={title}
                  description={description}
                  active={active}
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
                />
              )}
              {category === 'textarea' && (
                <TextAreaCard serviceId={serviceId} description={description} />
              )}
              {category === 'workexperience' && (
                <WorkExperience
                  serviceId={serviceId}
                  title={title}
                  description={description}
                  date={date}
                  subtitle={subtitle}
                  location={location}
                  active={active}
                />
              )}
              {category === 'education' && (
                <Education
                  serviceId={serviceId}
                  title={title}
                  description={description}
                  date={date}
                  subtitle={subtitle}
                  location={location}
                  active={active}
                />
              )}

              {category === 'image' && <ImageCard serviceId={serviceId} image={image} />}
              {category === 'simple' && (
                <Simple serviceId={serviceId} title={title} description={description} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

    </Reorder.Item>
  );
}

export function ProjectCard({ serviceId, title, description, active, link }: ServiceCardProps) {
  const { updateUserService } = useUserContext();
  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');

  const [debouncedTitle] = useDebounce(titleText, 500);
  const [debouncedDescription] = useDebounce(descriptionText, 500);

  useEffect(() => {
    if (debouncedTitle !== title) {
      updateUserService(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, serviceId, title, updateUserService]);

  useEffect(() => {
    if (debouncedDescription !== description) {
      updateUserService(serviceId, { description: debouncedDescription });
    }
  }, [debouncedDescription, serviceId, description, updateUserService]);

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
          onCheckedChange={(e) => updateUserService(serviceId, { active: e })}
        />
      </div>

      {/* Description */}
      <Input
        className="bg-transparent text-gray-900 dark:text-white border-none focus:ring-0 mb-4 w-full h-auto"
        placeholder="Description"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />

      {/* Bottom - Actions */}
      <div className="flex items-center justify-between text-zinc-400">
        <div className="flex gap-1 align-center">
          <LinkBlockDialog serviceId={serviceId} serviceLink={link || ''} />
        </div>
        <ConfirmDeleteService serviceId={serviceId} />
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
}: ServiceCardProps) {
  const { updateUserService } = useUserContext();
  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');

  const [debouncedTitle] = useDebounce(titleText, 500);
  const [debouncedDescription] = useDebounce(descriptionText, 500);

  useEffect(() => {
    if (debouncedTitle !== title) {
      updateUserService(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, serviceId, title, updateUserService]);

  useEffect(() => {
    if (debouncedDescription !== description) {
      updateUserService(serviceId, { description: debouncedDescription });
    }
  }, [debouncedDescription, serviceId, description, updateUserService]);

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
          onCheckedChange={(e) => updateUserService(serviceId, { active: e })}
        />
      </div>

      {/* Description */}
      <Textarea
        className="bg-transparent text-gray-900 dark:text-white border-none focus:ring-0 mb-4 w-full h-auto"
        placeholder="Description"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />

      {/* Bottom - Actions */}
      <div className="flex items-center justify-between text-zinc-400">
        <div className="flex gap-1 align-center">
          <ServicePriceDialog serviceId={serviceId} servicePrice={price || ''} />
          <LinkBlockDialog serviceId={serviceId} serviceLink={link || ''} />
        </div>
        <ConfirmDeleteService serviceId={serviceId} />
      </div>
    </>
  );
}

export function TitleCard({ serviceId, title }: ServiceCardProps) {
  const { updateUserService } = useUserContext();
  const [titleText, setTitleText] = useState(title || '');

  const [debouncedTitle] = useDebounce(titleText, 500);

  useEffect(() => {
    if (debouncedTitle !== title) {
      updateUserService(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, serviceId, title, updateUserService]);

  return (
    <div className="flex items-center">
      <Input
        className="font-semibold bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 h-auto w-full"
        placeholder="Service title..."
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
      />
      <ConfirmDeleteService serviceId={serviceId} />
    </div>
  );
}

export function TextAreaCard({ serviceId, description }: ServiceCardProps) {
  const { updateUserService } = useUserContext();
  const [textArea, setTextArea] = useState(description || '');

  const [debouncedTextArea] = useDebounce(textArea, 500);

  useEffect(() => {
    if (debouncedTextArea !== description) {
      updateUserService(serviceId, { description: debouncedTextArea });
    }
  }, [debouncedTextArea, serviceId, description, updateUserService]);

  return (
    <>
      <Textarea
        className="bg-transparent border-none text-gray-900 dark:text-white"
        value={textArea}
        onChange={(e) => setTextArea(e.target.value)}
      />
      <div className="text-right mt-3">
        <ConfirmDeleteService serviceId={serviceId} />
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
}: ServiceCardProps) {
  const { updateUserService } = useUserContext();

  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');
  const [subTitleText, setSubTitleText] = useState(subtitle || '');
  const [dateText, setDateText] = useState(date || '');

  const [debouncedTitle] = useDebounce(titleText, 500);
  const [debouncedDescription] = useDebounce(descriptionText, 500);
  const [debouncedSubtitle] = useDebounce(subTitleText, 500);
  const [debouncedDate] = useDebounce(dateText, 500);

  useEffect(() => {
    if (debouncedTitle && debouncedTitle !== title) {
      updateUserService(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, serviceId, updateUserService, title]);

  useEffect(() => {
    if (debouncedDescription && debouncedDescription !== description) {
      updateUserService(serviceId, { description: debouncedDescription });
    }
  }, [debouncedDescription, serviceId, updateUserService, description]);

  useEffect(() => {
    if (debouncedSubtitle && debouncedSubtitle !== subtitle) {
      updateUserService(serviceId, { subtitle: debouncedSubtitle });
    }
  }, [debouncedSubtitle, serviceId, updateUserService, subtitle]);

  useEffect(() => {
    if (debouncedDate && debouncedDate !== date) {
      updateUserService(serviceId, { date: debouncedDate });
    }
  }, [debouncedDate, serviceId, updateUserService]); //! LOOP INFINITE HERE

  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-between mb-2 w-full">
        {/* Role Input */}
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

        {/* Company Input */}
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

        {/* Switch Component */}
        {/* <Switch
      className="data-[state=checked]:bg-slate-300 mt-3 md:mt-0"
      checked={active}
      onCheckedChange={(e) => updateUserService(serviceId, { active: e })}
    /> */}
      </div>

      {/* Description Textarea */}
      <Textarea
        className="bg-transparent border-none text-gray-900 dark:text-white"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />

      {/* Block Date and Delete Button */}
      <div className="flex items-center justify-between text-zinc-400 mt-4 flex-col md:flex-row">
        <BlockDate serviceId={serviceId} />
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
}: ServiceCardProps) {
  const { updateUserService } = useUserContext();

  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');
  const [subTitleText, setSubTitleText] = useState(subtitle || '');
  const [dateText, setDateText] = useState(date || '');

  const [debouncedTitle] = useDebounce(titleText, 500);
  const [debouncedDescription] = useDebounce(descriptionText, 500);
  const [debouncedSubtitle] = useDebounce(subTitleText, 500);
  const [debouncedDate] = useDebounce(dateText, 500);

  useEffect(() => {
    if (debouncedTitle && debouncedTitle !== title) {
      updateUserService(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, serviceId, updateUserService, title]);

  useEffect(() => {
    if (debouncedDescription && debouncedDescription !== description) {
      updateUserService(serviceId, { description: debouncedDescription });
    }
  }, [debouncedDescription, serviceId, updateUserService, description]);

  useEffect(() => {
    if (debouncedSubtitle && debouncedSubtitle !== subtitle) {
      updateUserService(serviceId, { subtitle: debouncedSubtitle });
    }
  }, [debouncedSubtitle, serviceId, updateUserService, subtitle]);

  useEffect(() => {
    if (debouncedDate && debouncedDate !== date) {
      updateUserService(serviceId, { date: debouncedDate });
    }
  }, [debouncedDate, serviceId, updateUserService]); //! LOOP INFINITE HERE

  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-between mb-2 w-full">
        {/* Role Input */}
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

        {/* Company Input */}
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

      {/* Description Textarea */}
      <Textarea
        className="bg-transparent border-none text-gray-900 dark:text-white"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />

      {/* Block Date and Delete Button */}
      <div className="flex items-center justify-between text-zinc-400 mt-4 flex-col md:flex-row">
        <BlockDate serviceId={serviceId} />
      </div>
    </>
  );
}

export function ImageCard({ serviceId, image }: ServiceCardProps) {
  return (
    <>
      <Image
        className="w-full object-cover object-top rounded-xl"
        width={1280}
        height={720}
        src={image || 'https://fakeimg.pl/1280x720?font=noto'}
        alt="Block Image"
      />
      <div className="flex justify-between mt-4">
        <BlockImage serviceId={serviceId} />
        <ConfirmDeleteService serviceId={serviceId} />
      </div>
    </>
  );
}

export function Simple({ serviceId, title, description }: ServiceCardProps) {
  const { updateUserService } = useUserContext();
  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');

  const [debouncedTitle] = useDebounce(titleText, 500);
  const [debouncedDescription] = useDebounce(descriptionText, 500);

  useEffect(() => {
    if (debouncedTitle !== title) {
      updateUserService(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, serviceId, title, updateUserService]);

  useEffect(() => {
    if (debouncedDescription !== description) {
      updateUserService(serviceId, { description: debouncedDescription });
    }
  }, [debouncedDescription, serviceId, description, updateUserService]);

  return (
    <>
      <Input
        className="font-semibold bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 h-auto mb-2"
        placeholder="Title"
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
      />
      <Textarea
        className="bg-transparent border-none text-gray-900 dark:text-white"
        placeholder="Description"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />
      <ConfirmDeleteService serviceId={serviceId} />
    </>
  );
}
