import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, Twitter } from "lucide-react"
import Link from 'next/link'

export default function BigCTA() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Discover the hitme.to advantage.
            <br />
            Elevate your online presence.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 mb-12 max-w-3xl mx-auto">
            Our intuitive platform helps you create a stunning, centralized hub for all your services and contact information in one place.
          </p>
          <Button 
            asChild
            className="bg-white text-zinc-950 hover:bg-zinc-300 text-lg py-6 px-8 rounded-full font-semibold transition-colors duration-300"
          >
            <Link href="/auth/register">
              Get started <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </main>
      <footer className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center text-zinc-300">
          <p className="mb-4 sm:mb-0">&copy; 2024 hitme.to. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/terms" className="hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <a href="https://twitter.com/hitmeto" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}