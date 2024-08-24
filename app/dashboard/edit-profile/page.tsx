"use client";
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Trash2, Link, Eye, MessageCircle } from "lucide-react"

interface Service {
  id: number
  title: string
  price: string
  description: string
  details: string
}

export default function Component() {
  const [name, setName] = useState("Jane Doe")
  const [username, setUsername] = useState("janedoe")
  const [bio, setBio] = useState("Freelance Developer & Designer")
  const [whatsapp, setWhatsapp] = useState("1234567890")
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Web Development",
      price: "$500",
      description: "Custom website development",
      details: "Fully responsive, SEO-optimized websites built with modern technologies like React and Next.js."
    },
    {
      id: 2,
      title: "UI/UX Design",
      price: "$300",
      description: "User-centered design solutions",
      details: "Intuitive and visually appealing interfaces designed to enhance user experience and engagement."
    }
  ])

  const addService = () => {
    const newService: Service = {
      id: Date.now(),
      title: "",
      price: "",
      description: "",
      details: ""
    }
    setServices([...services, newService])
  }

  const updateService = (id: number, field: keyof Service, value: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: value } : service
    ))
  }

  const removeService = (id: number) => {
    setServices(services.filter(service => service.id !== id))
  }

  const PreviewProfile = () => (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src="/placeholder-avatar.jpg" alt={name} />
          <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h1>
        <p className="text-gray-600 mb-4">{bio}</p>
        <Button 
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          onClick={() => window.open(`https://wa.me/${whatsapp}`, '_blank')}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact via WhatsApp
        </Button>
      </div>
      <div className="space-y-4">
        {services.map((service) => (
          <Card key={service.id} className="overflow-hidden">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">{service.price}</span>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">hitme.to Dashboard</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Profile Preview</DialogTitle>
                </DialogHeader>
                <PreviewProfile />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button>Change Avatar</Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="username">hitme.to URL</Label>
                <div className="flex items-center">
                  <span className="bg-gray-200 p-2 rounded-l-md text-gray-700">hitme.to/</span>
                  <Input 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="rounded-l-none"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input 
                  id="whatsapp" 
                  value={whatsapp} 
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manage Services</CardTitle>
          </CardHeader>
          <CardContent>
            {services.map((service) => (
              <div key={service.id} className="mb-8 p-4 border rounded-lg">
                <div className="grid gap-4 mb-4">
                  <div>
                    <Label htmlFor={`title-${service.id}`}>Title</Label>
                    <Input 
                      id={`title-${service.id}`}
                      value={service.title} 
                      onChange={(e) => updateService(service.id, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`price-${service.id}`}>Price</Label>
                    <Input 
                      id={`price-${service.id}`}
                      value={service.price} 
                      onChange={(e) => updateService(service.id, 'price', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`description-${service.id}`}>Short Description</Label>
                    <Input 
                      id={`description-${service.id}`}
                      value={service.description} 
                      onChange={(e) => updateService(service.id, 'description', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`details-${service.id}`}>Detailed Description</Label>
                    <Textarea 
                      id={`details-${service.id}`}
                      value={service.details} 
                      onChange={(e) => updateService(service.id, 'details', e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={() => removeService(service.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Service
                </Button>
              </div>
            ))}
            <Button onClick={addService} className="w-full">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add New Service
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">Your hitme.to Link:</span>
              </div>
              <a 
                href={`https://hitme.to/${username}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-blue-600 hover:underline"
              >
                https://hitme.to/{username}
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="w-full sm:w-auto">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}