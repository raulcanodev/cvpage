import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Username submitted:', username)
  }

  return (
<>
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6 leading-tight">
        Create Your Personal Landing Page
      </h2>
      <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Showcase your services, contact information, and personal brand all in one place. 
        Get started with your custom hitme.to URL today.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
        <div className="flex-grow flex items-center bg-white rounded-lg shadow-sm">
          <span className="text-gray-500 pl-4 pr-2">hitme.to/</span>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-grow border-0 focus:ring-0"
          />
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
      {/* <p className="text-sm text-gray-500 text-center mt-4">
        Need help setting up your page? <a href="#" className="text-blue-600 hover:underline">Contact us</a>
      </p> */}
    </div>
    </>
  )
}