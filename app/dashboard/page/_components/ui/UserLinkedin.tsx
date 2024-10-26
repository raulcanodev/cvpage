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
import { Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUserContext } from '@/app/dashboard/context/UserContext';

export function UserLinkedin() {
  const { userData, updateUserData } = useUserContext();
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(userData.linkedinUrl ? userData.linkedinUrl || '' : '');
  }, [userData.linkedinUrl]);

  const handleSaveChanges = async () => {
    try {
      const linkedinUrl = username;
      await updateUserData(userData._id, { linkedinUrl });
    } catch (error) {
      console.error('Failed to update LinkedIn URL:', error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Linkedin
            className={`w-5 h-5 cursor-pointer ${userData.linkedinUrl && 'text-black dark:text-white'}`}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>LinkedIn URL</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                placeholder="https://www.linkedin.com/in/username/"
                className="col-span-4"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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