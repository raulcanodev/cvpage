import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Pricing</h2>
          <h3 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Scale your online presence with value at every level
          </h3>
          <p className="mt-4 text-xl text-gray-500">
            From personal branding to business growth, we`&ldquo;`ve got you covered.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Card className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="px-6 py-8 bg-white">
              <CardTitle className="text-2xl font-bold text-gray-900">Personal</CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-8">
              <div className="flex items-baseline text-5xl font-extrabold">
                $0
                <span className="ml-1 text-2xl font-medium text-gray-500">/month</span>
              </div>
              <p className="mt-4 text-lg text-gray-500">
                Perfect for individuals looking to establish their online presence.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">Custom hitme.to URL</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">Up to 5 service listings</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">Basic analytics</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">Social media integration</p>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="px-6 py-8 bg-gray-50">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold">
                Get started today
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gray-900 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="px-6 py-8 bg-gray-900">
              <CardTitle className="text-2xl font-bold text-white">Professional</CardTitle>
              <span className="px-3 py-1 text-sm text-white bg-blue-500 rounded-full uppercase">Most popular</span>
            </CardHeader>
            <CardContent className="px-6 py-8">
              <div className="flex items-baseline text-5xl font-extrabold text-white">
                $9.99
                <span className="ml-1 text-2xl font-medium text-gray-400">/month</span>
              </div>
              <p className="mt-4 text-lg text-gray-300">
                For businesses and professionals who need more power and customization.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="ml-3 text-base text-gray-300">Everything in Personal, plus:</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="ml-3 text-base text-gray-300">Unlimited service listings</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="ml-3 text-base text-gray-300">Advanced analytics and insights</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="ml-3 text-base text-gray-300">Custom domain support</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-green-400" />
                  </div>
                  <p className="ml-3 text-base text-gray-300">Priority support</p>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="px-6 py-8 bg-gray-800">
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold">
                Get started today
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}