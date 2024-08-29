'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Pencil, Plus, GripVertical, X, Eye } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// Backend
import { getUserById } from '@/lib/mongodb'; // Function to get the user
import { authOptions } from '@/lib/auth';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';

interface Service {
  id: string
  title: string
  description: string
  price: string
}

type ColorScheme = 'blue' | 'green' | 'purple' | 'pink'

const colorSchemes: Record<ColorScheme, { primary: string, secondary: string, background: string }> = {
  blue: { primary: 'bg-blue-500', secondary: 'bg-blue-100', background: 'bg-blue-50' },
  green: { primary: 'bg-green-500', secondary: 'bg-green-100', background: 'bg-green-50' },
  purple: { primary: 'bg-purple-500', secondary: 'bg-purple-100', background: 'bg-purple-50' },
  pink: { primary: 'bg-pink-500', secondary: 'bg-pink-100', background: 'bg-pink-50' },
}


interface Props {
  params: {
    id: string;
  };
}

export default function DashboardEditProfile({ params }: Props) {
  // Backend data
  const { id } = params;
  console.log(id)
  //! const session = await getServerSession(authOptions); --> Not allowed in the client
  //! const currentUserId = session?.user?._id; --> Not allowed in the client

  const [name, setName] = useState('Marc Lou')
  const [description, setDescription] = useState('Your Saturday issue to find startup ideas, launch fast, and get profitable 💸')
  const [services, setServices] = useState<Service[]>([
    { id: '1', title: 'ShipFast', description: 'Ship your startup in days, not months', price: '$57.4k/mo' },
  ])
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [colorScheme, setColorScheme] = useState<ColorScheme>('blue')

  const handleAddService = () => {
    const newService: Service = {
      id: Date.now().toString(),
      title: 'New Service',
      description: 'Description of the new service',
      price: '$0/mo'
    }
    setServices([...services, newService])
  }

  const handleUpdateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ))
  }

  const handleDeleteService = (id: string) => {
    setServices(services.filter(service => service.id !== id))
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    const items = Array.from(services)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setServices(items)
  }

  const MobilePreview = () => (
    <div className="fixed bottom-4 right-4 md:hidden">
      <Button onClick={() => setIsPreviewOpen(true)} className={`rounded-full shadow-lg ${colorSchemes[colorScheme].primary} text-white`}>
        <Eye className="mr-2 h-4 w-4" /> Preview
      </Button>
    </div>
  )

  const Preview = () => (
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
  )

  const handleSubmit = async () => {
    // Handle form submission
    try {
      const response = await fetch(`/api/user/${id}`, {
        method: 'POST',
        body: JSON.stringify({ name, description, services }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            
            {/* // Image, name description */}
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" alt={name} />
                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <Button className={`${colorSchemes[colorScheme].primary} text-white`}>Change Image</Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label>Color Scheme</Label>
                    <div className="flex space-x-2 mt-1">
                      {(Object.keys(colorSchemes) as ColorScheme[]).map((color) => (
                        <button
                          key={color}
                          onClick={() => setColorScheme(color)}
                          className={`w-8 h-8 rounded-full ${colorSchemes[color].primary} ${colorScheme === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                          aria-label={`Select ${color} color scheme`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* // Services list */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Services</h2>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="services">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {services.map((service, index) => (
                          <Draggable key={service.id} draggableId={service.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                              >
                                <div className="flex items-center mb-2">
                                  <div {...provided.dragHandleProps} className="mr-2">
                                    <GripVertical className="h-5 w-5 text-gray-400" />
                                  </div>
                                  <Input 
                                    value={service.title} 
                                    onChange={(e) => handleUpdateService(service.id, 'title', e.target.value)}
                                    className="font-semibold flex-grow"
                                  />
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm" className="ml-2">
                                        <Pencil className="h-4 w-4" />
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Edit Price</DialogTitle>
                                      </DialogHeader>
                                      <div className="py-4">
                                        <Label htmlFor={`price-${service.id}`}>Price</Label>
                                        <Input 
                                          id={`price-${service.id}`}
                                          value={service.price} 
                                          onChange={(e) => handleUpdateService(service.id, 'price', e.target.value)}
                                          className="mt-1"
                                        />
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                </div>
                                <Textarea 
                                  value={service.description} 
                                  onChange={(e) => handleUpdateService(service.id, 'description', e.target.value)}
                                  className="mb-2"
                                />
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteService(service.id)}>
                                  <X className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <Button onClick={handleAddService} className={`w-full mt-4 ${colorSchemes[colorScheme].primary} text-white`}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </CardContent>
            </Card>

          </div>
          
          {/* // Preview */}
          <div className="hidden md:flex justify-center items-start pt-12">
            <Preview />
          </div>

      </div>

      </div>

      {/* // Mobile preview */}
      <MobilePreview />
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-[425px] p-0">
          <DialogHeader className="p-6">
            <DialogTitle>Profile Preview</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            <Preview />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
