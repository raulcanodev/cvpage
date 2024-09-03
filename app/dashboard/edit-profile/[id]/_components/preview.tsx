
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface PreviewProps {
  name: string;
  description: string;
  services: {
    id: string;
    title: string;
    price: string;
    description: string;
  }[];
  colorScheme: string;
  colorSchemes: {
    [key: string]: {
      background: string;
      primary: string;
      secondary: string;
    };
  };
}

export function Preview({ name, description, services, colorSchemes, colorScheme }: PreviewProps) {
  return (
    <div className="w-[375px] h-[812px] bg-white dark:bg-gray-800 rounded-[60px] shadow-xl overflow-hidden border-8 border-gray-800 dark:border-gray-200">
    <div className="w-40 h-6 bg-gray-800 dark:bg-gray-200 mx-auto rounded-b-3xl"></div>
    <div className={`p-8 overflow-y-auto h-full ${colorSchemes[colorScheme].background} dark:bg-gray-800`}>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="w-20 h-20">
          <AvatarImage src="/placeholder.svg?height=100&width=100" alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Bali</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">$62.1k/month</p>
        </div>
      </div>
      <p className="text-sm mb-6">{description}</p>
      <Input className="mb-4" placeholder="marc.louvion@gmail.com" />
      <Button className={`w-full mb-6 ${colorSchemes[colorScheme].primary} text-white`}>Subscribe</Button>
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="bg-white dark:bg-gray-700 rounded-lg p-4 transition-all hover:shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <span className={`text-sm font-medium ${colorSchemes[colorScheme].secondary} ${colorSchemes[colorScheme].primary.replace('bg-', 'text-')} px-2 py-1 rounded-full`}>
                {service.price}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
            <Button variant="link" className={`mt-2 p-0 h-auto ${colorSchemes[colorScheme].primary.replace('bg-', 'text-')} hover:underline`}>
              Learn more →
            </Button>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}