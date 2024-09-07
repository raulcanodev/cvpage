import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, BarChart, Rocket } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  avatar: string
}

const teamMembers: TeamMember[] = [
  {
    name: "Jane Doe",
    role: "Founder & CEO",
    avatar: ""
  },
  {
    name: "John Smith",
    role: "CTO",
    avatar: ""
  },
  {
    name: "Alice Johnson",
    role: "Head of Design",
    avatar: ""
  }
]

export default function About() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            About hitme.to
          </h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            We are revolutionizing how professionals and businesses showcase their services online. 
            Our platform is designed to simplify your digital presence and amplify your reach.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <Globe className="w-16 h-16 mb-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Global Reach, Local Impact</h3>
              <p className="text-gray-500 dark:text-gray-400">
                hitme.to connects you with clients worldwide while maintaining a personalized touch. 
                Our platform ensures your services are discoverable to the right audience, no matter where they are.
              </p>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Did You Know?</h4>
              <p className="text-gray-600 dark:text-gray-300">
                hitme.to users report an average 40% increase in client inquiries within the first month of use.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2">
              <BarChart className="w-16 h-16 mb-4 text-purple-600 dark:text-purple-400" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Data-Driven Growth</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Leverage our analytics tools to understand your audience better. 
                Gain insights into visitor behavior, popular services, and conversion rates to optimize your offerings.
              </p>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Success Story</h4>
              <p className="text-gray-600 dark:text-gray-300">
                hitme.to`&ldquo;`s analytics helped me identify my most popular service, leading to a 25% increase in revenue! - Sarah K., Freelance Designer
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <Rocket className="w-16 h-16 mb-4 text-green-600 dark:text-green-400" />
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Continuous Innovation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We`&ldquo;`re constantly evolving to meet the changing needs of our users. 
                Our team is dedicated to bringing you cutting-edge features that keep you ahead in the digital landscape.
              </p>
            </div>
            <div className="w-full md:w-1/2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Coming Soon</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Exciting new features on the horizon: integrated scheduling, custom domain support, and AI-powered content suggestions!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">Meet Our Team</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{member.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Join Our Journey
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}