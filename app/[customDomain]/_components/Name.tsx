interface NameProps {
  name: string;
  pageColor: string;
}

export const Name = ({ name, pageColor }: NameProps) => {
  const textColor = pageColor === 'monochrome' ? 'text-zinc-800' : 'text-white';
  return (
    <h1 className={`text-4xl ${textColor} font-bold mb-2`}>{name}</h1>
  )
}