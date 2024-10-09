'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useUserContext } from '@/app/dashboard/context/UserContext';

interface ServiceCategorySelectProps {
  serviceId: string;
}

const categories = [
  { value: 'education', label: 'Education', premium: true },
  { value: 'image', label: 'Image', premium: true },
  { value: 'textarea', label: 'Description', premium: false },
  { value: 'project', label: 'Project', premium: true },
  { value: 'service', label: 'Service', premium: true },
  { value: 'title', label: 'Title', premium: false },
  { value: 'workexperience', label: 'Work Experience', premium: true },
];

export function BlockCategorySelect({ serviceId }: ServiceCategorySelectProps) {
  const { updateUserService, userData } = useUserContext();
  const { premium } = userData;

  const handleCategoryChange = async (value: string) => {
    try {
      await updateUserService(serviceId, { category: value });
    } catch (error) {
      console.error('Failed to update service category:', error);
    }
  };

  return (
      <Select onValueChange={handleCategoryChange}>
        <SelectTrigger className=" bg-transparent border-none">
          <SelectValue placeholder="Select block" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat.value} value={cat.value} disabled={!premium && cat.premium}>
              <div className="flex flex-row items-center gap-1">
                {cat.label}
                {!premium && cat.premium && <span>(Premium)</span>}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
  );
}
