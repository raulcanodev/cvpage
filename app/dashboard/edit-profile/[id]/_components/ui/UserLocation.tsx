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
} from '@/components/ui';
import { MapPin } from 'lucide-react';

export function UserLocation() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <MapPin className="w-5 h-5" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Location</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <Label htmlFor="name" className="text-right">
                Location
              </Label> */}
              <Input id="name" placeholder="Lisbon" className="col-span-4" />
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
