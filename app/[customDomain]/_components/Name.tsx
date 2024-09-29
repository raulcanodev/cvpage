
interface NameProps {
  name: string;
}

export const Name = ({name}: NameProps) => {
  return (
    <h1 className="text-4xl text-zinc-700 font-bold mb-4">{name}</h1>
  )
}