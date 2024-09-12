import Link from 'next/link'

export function SideBanner() {
  return (
    <div
    className="hidden lg:flex lg:flex-1 flex-col justify-between p-12 bg-cover bg-center"
    style={{ backgroundImage: `url('/black-building.jpg')` }}
  >
    <div>
      <Link href="/" className="text-2xl font-bold">
        hitme.to
      </Link>
    </div>
    <div>
      <blockquote className="text-xl">
        This platform has revolutionized how I showcase my services online. It is simple,
        elegant, and incredibly effective.
      </blockquote>
      <p className="mt-4">John Doe, Freelance Designer</p>
    </div>
  </div>
  )
}