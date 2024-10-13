
interface NameProps {
  name: string;
}

export const Name = ({name}: NameProps) => {
  return (
    <h1 className="text-4xl text-zinc-800 font-bold mb-2">{name}</h1>
  )
}