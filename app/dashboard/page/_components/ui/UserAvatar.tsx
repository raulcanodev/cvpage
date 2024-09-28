'use client';
import { useState, useRef } from 'react';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { updateAvatar } from '@/actions';
import { Camera, Upload } from 'lucide-react';
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
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui';
import { DialogClose } from '@radix-ui/react-dialog';

export function UserAvatar() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userData, updateUserAvatar, updateUserData } = useUserContext();
  const { avatar, name } = userData;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleAvatarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profile-image', selectedFile);
      await updateUserAvatar(userData._id ,formData);
   
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const deleteProfileImage = async () => {
    setPreviewUrl(null);
    await updateUserData(userData._id, { avatar: '' });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Avatar className="w-12 h-12 cursor-pointer">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>
            <Camera className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleAvatarSubmit}>
          <DialogHeader>
            <DialogTitle>Update Avatar</DialogTitle>
            <DialogDescription>
              Choose a new profile picture. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32 border-2 border-primary">
                <AvatarImage
                className='object-cover w-full h-full object-top'
                  src={previewUrl || avatar}
                  alt="Profile picture preview"
                />
                <AvatarFallback>
                  {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </AvatarFallback>
              </Avatar>
              <Input
                type="file"
                id="profile-image"
                name="profile-image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Button type="button" onClick={triggerFileInput} variant="outline">
                <Upload className="mr-2 h-4 w-4" /> Choose Image
              </Button>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
            <Button variant="outline" onClick={deleteProfileImage}>
                Delete
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" disabled={!selectedFile}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
