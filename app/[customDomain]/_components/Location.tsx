import { MapPin } from 'lucide-react';

interface LocationProps {
  location: string;
}

export const Location = ({ location }: LocationProps) => {
  return (
    <div className="flex gap-1 items-center text-zinc-500 mb-4">
      <MapPin className="w-5 h-5" />
      <span className="text-base">{location}</span>
    </div>
  );
};
