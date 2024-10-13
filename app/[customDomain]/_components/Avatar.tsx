import Image from 'next/image';

interface AvatarProps {
  avatar?: string;
  name?: string;
  firstLetterName?: string;
}

export const Avatar = ({ avatar, name, firstLetterName }: AvatarProps) => {
  return (
    <div className="w-[100px] h-[100px] relative overflow-hidden rounded-r-2xl">
      {avatar ? (
        <Image
          src={avatar}
          alt={name || "Profile picture"}
          width={100}
          height={100}
          className="rounded-r-2xl object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-zinc-500 text-3xl font-bold">
          {firstLetterName}
        </div>
      )}
    </div>
  );
}