'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Button,
  DialogClose,
} from '@/components/ui';
import { Link2 } from 'lucide-react';
import { useUserContext } from '@/app/dashboard/context/UserContext';

interface LinkProjectDialogProps {
  serviceId: string;
  serviceLink: string;
}

export function LinkBlockDialog({ serviceId, serviceLink }: LinkProjectDialogProps) {
  
  const { updateUserService } = useUserContext();
  const [link, setLink] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLink(value);
    
    // Basic URL validation (you can expand this)
    if (value && !/^https?:\/\/.+/.test(value)) {
      setError('Please enter a valid URL starting with http:// or https://');
    } else {
      setError(null);
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (!link) {
        setError('Please enter a valid URL');
        return;
      }
      await updateUserService(serviceId, { link }); 
    } catch (error) {
      console.error('Failed to update service link:', error);
      setError('Failed to update link. Please try again.');
    }
  };

  useEffect(() => {
    setLink(serviceLink);
  }, [serviceLink]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center">
          <Link2 className="w-5 h-5" /> 
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link</DialogTitle> 
          <DialogDescription>
            Set the link for your block. Make sure it starts with http:// or https://.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="serviceLink" className="text-right col-span-1">
              Link
            </label>
            <div className="col-span-3 relative">
              <Input
                id="serviceLink"
                placeholder="https://example.com"
                value={link}
                onChange={handleLinkChange}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleSaveChanges} disabled={!!error}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
