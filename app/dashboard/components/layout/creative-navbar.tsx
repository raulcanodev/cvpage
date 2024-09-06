import { Button } from '@/components/ui';
import { BarChart2, Paintbrush, Settings, User } from 'lucide-react';

export function CreativeNavbar() {
  return (
    <>
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8 mx-auto">
        <div className="flex gap-3">
          <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700 flex gap-2 md:gap-0 items-center md:flex-row">
            <User className="w-4 h-4 mb-1 md:mr-2 md:mb-0" /> 
            <span className="">PAGE</span>
          </Button>
          <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700 flex gap-2 md:gap-0 items-center md:flex-row">
            <Paintbrush className="w-4 h-4 mb-1 md:mr-2 md:mb-0" /> 
            <span className="">STYLE</span>
          </Button>
          {/* <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700 flex gap-2 md:gap-0 items-center md:flex-row">
            <BarChart2 className="w-4 h-4 mb-1 md:mr-2 md:mb-0" /> 
            <span className="">STATS</span>
          </Button> */}
          <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700 flex gap-2 md:gap-0 items-center md:flex-row">
            <Settings className="w-4 h-4 mb-1 md:mr-2 md:mb-0" /> 
            <span className="">SETTINGS</span>
          </Button>
        </div>
      </div>
    </>
  );
}