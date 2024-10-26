import { MapPin } from 'lucide-react';

interface LocationProps {
  location: string;
  pageColor: string;
}

export const Location = ({ location, pageColor }: LocationProps) => {
  const textColor = pageColor === 'monochrome' ? 'text-zinc-500' : 'text-gray-300';
  return (
    <div className={`flex items-center ${textColor} my-3`}>
      <MapPin className="w-4 h-4 mr-1" />
      <span>{location}</span>
    </div>
  )
}