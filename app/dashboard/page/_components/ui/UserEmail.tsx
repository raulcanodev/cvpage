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
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useUserContext } from '@/app/dashboard/context/UserContext';

export function UserEmail() {
  const { userData, updateUserData } = useUserContext();
  const [emailContact, setEmailContact] = useState(userData.emailContact || '');

  const handleSaveChanges = async () => {
    try {
      await updateUserData(userData._id, { emailContact });
    } catch (error) {
      console.error('Failed to update Instagram URL:', error);
    }
  };

  return (
    <>
    <Dialog>
      <DialogTrigger asChild>
        <Mail
          className={`w-5 h-5 cursor-pointer ${userData.email && 'text-black dark:text-white'}`}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Email</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              placeholder="hello@gmail.com"
              className="col-span-4"
              defaultValue={userData.emailContact}
              onChange={(e) => setEmailContact(e.target.value)}
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
