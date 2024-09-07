'use client';
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
import { Instagram } from 'lucide-react';
import { useState } from 'react';
import { useUserContext } from '@/app/dashboard/context/UserContext';

export function UserInstagram() {
  const { userData, updateUserData } = useUserContext();
  const [instagramUrl, setInstagramUrl] = useState(userData.instagramUrl || '');

  const handleSaveChanges = async () => {
    try {
      await updateUserData(userData._id, { instagramUrl });
    } catch (error) {
      console.error('Failed to update Instagram URL:', error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Instagram
            className={`w-5 h-5 cursor-pointer ${userData.instagramUrl && 'text-black dark:text-white'}`}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Instagram URL</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="instagramUrl"
                placeholder="https://www.instagram.com/username"
                className="col-span-4"
                value={userData.instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" onClick={handleSaveChanges}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
