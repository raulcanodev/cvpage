'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, Input, Switch, Textarea } from '@/components/ui';
import { GripVertical } from 'lucide-react';
import { ConfirmDeleteService, ServicePriceDialog, BlockCategorySelect } from '../ui';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { useDebounce } from 'use-debounce';

interface ServiceCardProps {
  serviceId: string;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  active?: boolean;
}

export function BlockCard({ serviceId, title, description, category, active }: ServiceCardProps) {

  return (
    <>
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden my-2">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <GripVertical className="w-5 h-5 text-zinc-400 cursor-pointer" />

            <div className="flex-1">
              {!category && <BlockCategorySelect serviceId={serviceId} />}
              {category === 'title' && <TitleCard serviceId={serviceId} title={title} />}
              {category === 'project' && <ProjectCard serviceId={serviceId} title={title} description={description} active={active} />}
              {category === 'service' && <ServiceCard serviceId={serviceId} title={title} description={description} active={active} />}
              {category === 'textarea'} && <TextAreaCard serviceId={serviceId} description={description} />
              {/* <BlockCategorySelect serviceId={serviceId} /> */}
              {/* <TitleCard serviceId={serviceId} title={title} /> */}
              {/* <ProjectCard serviceId={serviceId} title={title} description={description} category={category} active={active} /> */}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
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
            className="font-semibold bg-transparent border-none text-white focus:ring-0 h-auto w-full"
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
        className="bg-zinc-900 text-white border-none focus:ring-0 mb-4 w-full h-auto"
        placeholder="Description"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />

      {/* Bottom - Actions */}
      <div className="flex items-center justify-between text-zinc-400">
        <div className="flex gap-1 align-center">
          {/* <ServicePriceDialog serviceId={serviceId} /> */}
        </div>
        <ConfirmDeleteService serviceId={serviceId} />
      </div>
    </>
  );
}

export function ServiceCard({ serviceId, title, description, active }: ServiceCardProps) {
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
            className="font-semibold bg-transparent border-none text-white focus:ring-0 h-auto w-full"
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
      <Input
        className="bg-zinc-900 text-white border-none focus:ring-0 mb-4 w-full h-auto"
        placeholder="Description"
        value={descriptionText}
        onChange={(e) => setDescriptionText(e.target.value)}
      />

      {/* Bottom - Actions */}
      <div className="flex items-center justify-between text-zinc-400">
        <div className="flex gap-1 align-center">
          <ServicePriceDialog serviceId={serviceId} />
        </div>
        <ConfirmDeleteService serviceId={serviceId} />
      </div>
    </>
  );
}

export function TitleCard({serviceId, title}: ServiceCardProps) {
  const { updateUserService } = useUserContext();
  const [titleText, setTitleText] = useState(title || '');

  const [debouncedTitle] = useDebounce(titleText, 500);

  useEffect(() => {
    if (debouncedTitle !== title) {
      updateUserService(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, serviceId, title, updateUserService]);

  return (

    <div className='flex items-center'>
      <Input
        className="font-semibold bg-transparent border-none text-white focus:ring-0 h-auto w-full"
        placeholder="Service title..."
        value={titleText}
        onChange={(e) => setTitleText(e.target.value)}
        />
        <ConfirmDeleteService serviceId={serviceId} />
    </div>

  )
}

export function TextAreaCard({serviceId, description}: ServiceCardProps) {
  const { updateUserService } = useUserContext()
  const [textArea, setTextArea] = useState(description || '')

  const [debouncedTextArea] = useDebounce(textArea, 500)

  useEffect(()=>{
    if(debouncedTextArea !== description){
      updateUserService(serviceId, {description: debouncedTextArea})
    }
  }, [description, serviceId, debouncedTextArea, updateUserService])

  return (
    <>
      <Textarea
        className=''
        value={textArea}
        onChange={(e)=> setTextArea(e.target.value)}
        />
        <ConfirmDeleteService serviceId={serviceId} />
    </>
  )
}