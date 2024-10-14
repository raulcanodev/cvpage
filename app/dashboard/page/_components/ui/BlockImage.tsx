'use client';
import { useState, useRef } from 'react';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui';

export function BlockImage({ serviceId }: { serviceId: string }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateServiceImage } = useUserContext();

  // Handle file selection and automatic upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const formData = new FormData();
      formData.append('profile-image', file);

      // Automatically upload image after selection
      await updateServiceImage(serviceId, formData);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button type="button" onClick={triggerFileInput} variant="outline" className="w-full border-none bg-zinc-100 dark:bg-zinc-900">
        <Upload className="mr-2 h-4 w-4" /> Choose Image
      </Button>
      <input
        type="file"
        id="block-image"
        name="block-image"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
    </div>
  );
}
