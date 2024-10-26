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
import { Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUserContext } from '@/app/dashboard/context/UserContext';

export function UserTwitter() {
  const { userData, updateUserData } = useUserContext();
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(userData.twitterUrl ? userData.twitterUrl.split('/').pop() || '' : '');
  }, [userData.twitterUrl]);

  const handleSaveChanges = async () => {
    try {
      const twitterUrl = username ? `https://twitter.com/${username}` : '';
      await updateUserData(userData._id, { twitterUrl });
    } catch (error) {
      console.error('Failed to update Twitter URL:', error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Twitter
            className={`w-5 h-5 cursor-pointer ${userData.twitterUrl && 'text-black dark:text-white'}`}
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Twitter Username</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                placeholder="username"
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