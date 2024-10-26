"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  Input,
  Button,
} from '@/components/ui';
import { MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUserContext } from '@/app/dashboard/context/UserContext';

export function UserLocation() {
  const { userData, updateUserData } = useUserContext();
  const [location, setLocation] = useState('');

  useEffect(() => {
    setLocation(userData.location || '');
  }, [userData.location]);

  const handleSaveChanges = async () => {
    try {
      await updateUserData(userData._id, { location });
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <MapPin className={`w-5 h-5 cursor-pointer ${userData.location && 'text-black dark:text-white'}`} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Location</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                id="location"
                placeholder="Lisbon"
                className="col-span-4"
                value={location}
                onChange={(e) => setLocation(e.target.value)} 
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