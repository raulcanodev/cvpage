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
import { Github } from 'lucide-react';
import { useState } from 'react';
import { useUserContext } from '@/app/dashboard/context/UserContext';

export function UserGithub() {
  const { userData, updateUserData } = useUserContext();
  const [githubUrl, setGithubUrl] = useState(userData.githubUrl || '');

  const handleSaveChanges = async () => {
    try {
      await updateUserData(userData._id, { githubUrl });
    } catch (error) {
      console.error('Failed to update Instagram URL:', error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Github
            className={`w-5 h-5 cursor-pointer ${userData.githubUrl && 'text-black dark:text-white'}`}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Github URL</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="instagramUrl"
                placeholder="https://github.com/username"
                className="col-span-4"
                defaultValue={userData.githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
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
