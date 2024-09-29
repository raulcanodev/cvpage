import { MapPin } from 'lucide-react';

interface LocationProps {
  location: string;
}

export const Location = ({ location }: LocationProps) => {
  return (
    <div className="flex gap-1 items-center justify-center text-zinc-400 mb-4">
      <MapPin className="w-5 h-5" />
      <span className="text-lg">{location}</span>
    </div>
  );
};
