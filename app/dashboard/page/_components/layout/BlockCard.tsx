'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, Input, Switch, Textarea } from '@/components/ui';
import { GripVertical } from 'lucide-react';
import {
  ConfirmDeleteService,
  BlockCategorySelect,
  BlockImage,
} from '../ui';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import { ServicePriceDialog, LinkBlockDialog } from '../ui/';

interface ServiceCardProps {
  serviceId: string;
  title?: string;
  subtitle?: string;
  description?: string;
  category?: string;
  active?: boolean;
  data?: any;
  image?: string;
  link?: string;
  price?: string;
  location?: string;
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
  data,
}: ServiceCardProps) {
  return (
    <Card className={`border overflow-hidden rounded-2xl mb-2 dark:bg-zinc-900 bg-zinc-100`}>
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <GripVertical className="w-5 h-5 text-zinc-400 cursor-pointer" />

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
                data={data}
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
  );
}

export function ProjectCard({ serviceId, title, description, active }: ServiceCardProps) {
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
          <LinkBlockDialog serviceId={serviceId} />
        </div>
        <ConfirmDeleteService serviceId={serviceId} />
      </div>
    </>
  );
}

export function ServiceCard({ serviceId, title, description, active, link, price }: ServiceCardProps) {

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
  data,
}: ServiceCardProps) {
  const { updateUserService } = useUserContext();

  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');
  const [subTitleText, setSubTitleText] = useState(subtitle || '');
  const [dataText, setDateText] = useState(data || '');

  const [debouncedTitle] = useDebounce(titleText, 500);
  const [debouncedDescription] = useDebounce(descriptionText, 500);
  const [debouncedSubtitle] = useDebounce(subTitleText, 500);
  const [debouncedDate] = useDebounce(dataText, 500);

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
    if (debouncedDate && debouncedDate !== data) {
      updateUserService(serviceId, { date: debouncedDate });
    }
  }, [debouncedDate, serviceId, updateUserService]); //! LOOP INFINITE HERE

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <Input
            className="font-semibold bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 h-auto w-full"
            placeholder="Job Title"
            value={titleText}
            onChange={(e) => setTitleText(e.target.value)}
          />
          <Input
            className="bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 h-auto w-full"
            placeholder="Subtitle"
            value={subTitleText}
            onChange={(e) => setSubTitleText(e.target.value)}
          />
        </div>
        <Switch
          className="data-[state=checked]:bg-slate-300"
          checked={active}
          onCheckedChange={(e) => updateUserService(serviceId, { active: e })}
        />
      </div>

      <Textarea
        className="bg-transparent border-none text-gray-900 dark:text-white"
        placeholder="Description"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />
      <Input
        className="bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 h-auto mb-4"
        placeholder="Date"
        value={dataText}
        onChange={(e) => setDateText(e.target.value)}
      />

      <div className="flex items-center justify-between text-zinc-400">
        <ConfirmDeleteService serviceId={serviceId} />
      </div>
    </>
  );
}




export function ImageCard({ serviceId, image }: ServiceCardProps) {
  const { updateUserService } = useUserContext();
  const [imageUrl, setImageUrl] = useState(image || '');

  const [debouncedImageUrl] = useDebounce(imageUrl, 500);

  useEffect(() => {
    if (debouncedImageUrl !== image) {
      updateUserService(serviceId, { image: debouncedImageUrl });
    }
  }, [debouncedImageUrl, serviceId, image, updateUserService]);

  return (
    <div className="flex items-center">
      <Image
        src={imageUrl}
        alt="Service Image"
        width={100}
        height={100}
        className="rounded-lg"
      />
      <Input
        className="bg-transparent border-none text-gray-900 dark:text-white focus:ring-0 h-auto ml-4"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <ConfirmDeleteService serviceId={serviceId} />
    </div>
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
