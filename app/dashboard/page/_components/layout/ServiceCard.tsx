'use client';
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Input,
  Switch,
} from '@/components/ui';
import {  GripVertical } from 'lucide-react';
import { ConfirmDeleteService, ServicePriceDialog, ServiceCategorySelect } from '../ui';
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

export function ServiceCard({ serviceId, title, description, category, active }: ServiceCardProps) {
  const { updateUserService } = useUserContext();
  const [titleText, setTitleText] = useState(title || '');
  const [descriptionText, setDescriptionText] = useState(description || '');
  
  // Debounce the title and description updates
  const [debouncedTitle] = useDebounce(titleText, 500);
  const [debouncedDescription] = useDebounce(descriptionText, 500);

  useEffect(() => {
    // Update the service title and description in the backend
    if (debouncedTitle !== title) {
      updateUserService(serviceId, { title: debouncedTitle });
    }
  }, [debouncedTitle, serviceId, title, updateUserService]);

  useEffect(() => {
    // Update the service description in the backend
    if (debouncedDescription !== description) {
      updateUserService(serviceId, { description: debouncedDescription });
    }
  }, [debouncedDescription, serviceId, description, updateUserService]);

  return (
    <>
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden my-2">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <GripVertical className="w-5 h-5 text-zinc-400 cursor-pointer" />
            <div className="flex-1">
              {/* Top - Avatar, Title and Switch */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  {/* Placeholder for Avatar */}
                  <Input
                    className="font-semibold bg-transparent border-none text-white focus:ring-0 h-auto w-full"
                    placeholder="Service title..."
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
                placeholder="Description of your service..."
                value={descriptionText}
                onChange={(e) => setDescriptionText(e.target.value)}
              />

              {/* Bottom - Actions */}
              <div className="flex items-center justify-between text-zinc-400">
                <div className="flex gap-1 align-center">
                  <ServicePriceDialog serviceId={serviceId} />
                  <ServiceCategorySelect serviceId={serviceId}/>
                </div>
                <ConfirmDeleteService serviceId={serviceId} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}