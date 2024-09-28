import { Card, CardContent } from "@/components/ui"
import Image from 'next/image'

export function ProfileCard() {
  return (
    <Card className="w-full max-w-3xl mx-auto my-12">
      <CardContent className="flex items-start space-x-4 p-6">
        <Image
          alt="Profile picture"
          className="rounded-full"
          width={62}
          height={62}
          src="/raul.jpeg"
        />
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Why I built hitme.to</h2>
          <p className="">
            Hey, Raúl here! Every time I launch a product, I always find myself doing the same things over - worrying if I&apos;ve done everything right and spending hours thinking of how to promote my product.
          </p>
          <p className="">
            And so I built this template. To help you and me launch products right, and not spend hours with repetitive work :P
          </p>
        </div>
      </CardContent>
    </Card>
  )
}