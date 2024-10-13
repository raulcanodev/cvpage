
interface DescriptionProps {
  description: string;
}

export const Description = ({description}: DescriptionProps) => {
  return (
    <p className="text-zinc-600 mb-4 whitespace-pre-wrap max-w-[500px]">{description}</p>
  )
}