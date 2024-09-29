import { Avatar as UiAvatar, AvatarFallback, AvatarImage } from '@/components/ui';

interface AvatarProps {
  avatar?: string;
  name?: string;
  firstLetterName?: string;
}

export const Avatar = ({ avatar, name, firstLetterName }: AvatarProps) => {
  return (
    <>
      <UiAvatar className="w-32 h-32 mx-auto mb-6 object-cover">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{firstLetterName}</AvatarFallback>
      </UiAvatar>
    </>
  );
}
