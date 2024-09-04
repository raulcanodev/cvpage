"use client";
import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  Input,
  Switch,
} from '@/components/ui';
import { DollarSign, Flag, Link, Maximize2, Tag, Trash2, GripVertical } from 'lucide-react';
import { ConfirmDeleteService } from '../ui';
import { useUserContext } from '../../../../context/UserContext';

interface ServiceCardProps {
  index: number;
}

export function ServiceCard({ index }: ServiceCardProps) {
 const { userData, updateUserData, updateUserService } = useUserContext();
 const { id, services } = userData;

  const handleSaveChanges = () => {
    try {
      updateUserService(id, { services });
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

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
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Change this" />
                    <AvatarFallback>{index}</AvatarFallback>
                  </Avatar>
                  <Input
                    className="font-semibold bg-transparent border-none  text-white focus:ring-0 h-auto w-full"
                    placeholder="Service title..."
                  />
                </div>
                <Switch className="data-[state=checked]:bg-pink-500" />
              </div>

              {/* Description */}
              <Input
                className="bg-zinc-900 text-white border-none focus:ring-0 mb-4 w-full h-auto"
                placeholder="Description of your service..."
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
                <ConfirmDeleteService />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
