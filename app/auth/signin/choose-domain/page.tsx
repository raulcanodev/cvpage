'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'

export default function ChooseDomainPage() {
  const [domain, setDomain] = useState('')
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const checkDomainAvailability = async () => {
    setIsLoading(true)
    // Simulating an API call to check domain availability
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsAvailable(Math.random() > 0.5) // Randomly set availability for demo purposes
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await checkDomainAvailability()
  }

  const handleContinue = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
            Choose your domain
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Select a unique domain for your hitme.to profile
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm">
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-700 bg-gray-900 text-gray-400 text-sm">
                hitme.to/
              </span>
              <Input
                type="text"
                required
                className="appearance-none rounded-none rounded-r-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-900 placeholder-gray-500 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="yourdomain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-zinc-100 hover:bg-zinc-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Checking...
                </>
              ) : (
                'Check Availability'
              )}
            </Button>
          </div>
        </form>

        {isAvailable !== null && (
          <div className={`mt-4 p-4 rounded-md ${isAvailable ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {isAvailable ? 'Domain is available!' : 'Domain is not available. Please try another.'}
          </div>
        )}

        {isAvailable && (
          <div className="mt-6">
            <Button
              onClick={handleContinue}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}