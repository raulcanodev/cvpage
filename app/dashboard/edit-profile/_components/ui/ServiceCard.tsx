"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  Input,
  Switch,
} from '@/components/ui';
import { DollarSign, Link, Tag, GripVertical } from 'lucide-react';
import { ConfirmDeleteService } from '../ui';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { Service } from '@/types/types';

interface ServiceCardProps {
  index: number;
  serviceId: string;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  active?: boolean;
}

export function ServiceCard({ serviceId, title, description, category, price, active }: Service) {
 const { userData, updateUserService } = useUserContext();
 console.log("active", active);
 


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
                  <Avatar className="w-7 h-7 border border-zinc-700">
                    <AvatarImage src="" alt="Change this" />
                    <AvatarFallback>RC</AvatarFallback>
                  </Avatar>
                  <Input
                    className="font-semibold bg-transparent border-none  text-white focus:ring-0 h-auto w-full"
                    placeholder="Service title..."
                    defaultValue={title}
                    onChange={(e)=> updateUserService(serviceId, {title: e.target.value})}
                  />
                </div>
                <Switch className="data-[state=checked]:bg-slate-300" checked={active}
                onCheckedChange={(e)=> updateUserService(serviceId, {active: e})}
                />
              </div>

              {/* Description */}
              <Input
                className="bg-zinc-900 text-white border-none focus:ring-0 mb-4 w-full h-auto"
                placeholder="Description of your service..."
                defaultValue={description}
                onChange={(e)=> updateUserService(serviceId, {description: e.target.value})}
              />

              {/* Bottom - Actions */}
              <div className="flex items-center justify-between text-zinc-400">
                <div className="flex space-x-3">
                  <button className="hover:text-white transition-colors">
                    <Link className="w-5 h-5" />
                  </button>
                  <button className="hover:text-white transition-colors">
                    <DollarSign className="w-5 h-5" />
                  </button>
                  <button className="hover:text-white transition-colors">
                    <Tag className="w-5 h-5" />
                  </button>
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
