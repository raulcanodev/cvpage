'use client';

import { useState } from 'react';
import { EditUser, EditUserServices, Preview } from './_components/layout';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, EyeIcon } from 'lucide-react';

export default function DashboardEditProfile() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 pb-20 lg:pb-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left - User */}
        <div className="flex-1 space-y-8">
          <EditUser />
          <EditUserServices />
        </div>
        
        {/* Right - Phone Preview (Desktop) */}
        <div className="hidden lg:block lg:w-1/3">
          <Preview />
        </div>
      </div>

      {/* Preview Button (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              <EyeIcon className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] h-[80vh] flex flex-col">
            <div className="flex-1 overflow-auto">
              <Preview />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}