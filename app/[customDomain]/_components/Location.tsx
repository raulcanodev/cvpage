import { MapPin } from 'lucide-react';

interface LocationProps {
  location: string;
}

export const Location = ({ location }: LocationProps) => {
  return (
    <div className="text-zinc-500 mb-4 inline-flex items-center space-x-1">
      <MapPin className="w-5 h-5" />
      <span className="text-base">{location}</span>
    </div>
  );
};
