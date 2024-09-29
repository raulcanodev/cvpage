
interface DescriptionProps {
  description: string;
}

export const Description = ({description}: DescriptionProps) => {
return (
  <p className="text-zinc-500 mb-8">{description}</p>
)
}