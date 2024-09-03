import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
  Input,
  Button,
} from '@/components/ui';
import { Linkedin } from 'lucide-react';

export function UserLinkedin() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Linkedin className="w-5 h-5 " />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>LinkedIn URL</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <Label htmlFor="name" className="text-right">
                Location
              </Label> */}
              <Input id="name" placeholder="www.linkedin.com/in/username" className="col-span-4" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
