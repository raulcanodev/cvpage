interface DescriptionProps {
  description: string;
  pageColor: string;
}

export const Description = ({ description, pageColor }: DescriptionProps) => {
  const textColor = pageColor === 'monochrome' ? 'text-zinc-600' : 'text-gray-200';
  return (
    <p className={`text-lg ${textColor} mb-2 pl-2`}>{description}</p>
  )
}