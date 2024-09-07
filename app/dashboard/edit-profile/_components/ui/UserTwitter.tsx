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
import { Twitter } from 'lucide-react';

export function UserTwitter() {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Twitter className="w-5 h-5 " />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Twitter URL</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you`&ldquo;`re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {/* <Label htmlFor="name" className="text-right">
                Location
              </Label> */}
              <Input id="name" placeholder="https://x.com/username" className="col-span-4" />
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
