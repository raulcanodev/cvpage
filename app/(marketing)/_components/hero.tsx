import React, { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle the submission logic here
    console.log('Submitted username:', username)
  }

  return (
    <div className="bg-gray-200 dark:bg-zinc-950 text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create your professional <span className="bg-blue-600 px-2">landing page</span> in minutes, not hours
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Build a stunning online presence, showcase your services, and connect with your audience effortlessly.
            </p>
            <div className="space-y-4 mb-8">
              <Feature text="Customizable templates for any profession" />
              <Feature text="Integrated booking and contact forms" />
              <Feature text="SEO optimization for better visibility" />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  hitme.to/
                </span>
                <Input
                  type="text"
                  placeholder="yourname"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-20 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
          <div className="hidden md:block">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-semibold mb-4">Growth Statistics</h3>
              <div className="text-4xl font-bold mb-2">1,234 <span className="text-green-400 text-2xl">+567</span></div>
              <p className="text-gray-400 mb-4">New users in the last 30 days</p>
              <div className="h-48 bg-gray-700 rounded-md flex items-end">
                <div className="w-full bg-green-400 rounded-b-md" style={{height: '70%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center">
      <Check className="text-green-400 mr-2 h-5 w-5" />
      <span>{text}</span>
    </div>
  )
}