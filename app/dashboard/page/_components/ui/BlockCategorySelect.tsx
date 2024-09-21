'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { useUserContext } from '@/app/dashboard/context/UserContext';

interface ServiceCategorySelectProps {
  serviceId: string;
}

const categories = [
  { value: 'textarea', label: 'Description' },
  { value: 'project', label: 'Project' },
  { value: 'service', label: 'Service' },
  { value: 'title', label: 'Title' },
  { value: 'workexperience', label: 'Work Experience' },
];

export function BlockCategorySelect({ serviceId }: ServiceCategorySelectProps) {
  const { updateUserService } = useUserContext();
  const [category, setCategory] = useState();

  const handleCategoryChange = async (value: string) => {
    try {
      await updateUserService(serviceId, { category: value });
    } catch (error) {
      console.error('Failed to update service category:', error);
    }
  };

  return (
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className=" bg-zinc-900 border-none">
          <SelectValue placeholder="Select block" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value}>
              {cat.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
  );
}