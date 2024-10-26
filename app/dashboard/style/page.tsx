'use client';
import { useState } from 'react';
import { Preview } from '../page/_components/layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import { PageStyle } from './_components/layout/PageStyle';

export default function DashboardEditProfile() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <div className="mx-auto py-0 pb-20 lg:pb-8">
      <div className="flex flex-col lg:flex-row justify-between gap-3">
        {/* Left - User */}
        <div className="flex-1 lg:mt-5 flex gap-3 flex-col lg:max-w-[47.5rem]">
          <PageStyle />
        </div>

        {/* Right - Phone Preview (Desktop) */}
        <div className="hidden lg:block lg:w-1/3">
          <Preview />
        </div>
      </div>

      {/* Preview Button (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4">
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogTrigger asChild>
            <Button className="w-full rounded-xl">
              <Eye className="w-4 h-4 mr-2" />
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
