import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Input,
  Textarea,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Label,
  Button,
} from '@/components/ui/';
import { MapPin, DollarSign, Mail } from 'lucide-react';

export function EditUser() {
  return (
    <>
     <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

      {/* Profile Section */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Raul Cano" />
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>
          <div>
            <Input
              className="text-2xl font-bold text-white bg-zinc-900 border-zinc-900 focus:ring-transparent"
              defaultValue={'Raul Cano'}
            />
          </div>
        </div>
        <Textarea
          // value={bio}
          // onChange={(e) => setBio(e.target.value)}
          className="bg-zinc-900 text-white border-zinc-900 my-4 focus:ring-0"
          placeholder="Tell us about yourself..."
        />
        <div className="flex space-x-4 text-zinc-400">
          <MapPin className="w-5 h-5" />
          <DollarSign className="w-5 h-5" />
          <Mail className="w-5 h-5" />
        </div>
      </div>
    </>
  );
}
