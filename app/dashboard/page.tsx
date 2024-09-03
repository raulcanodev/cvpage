"use client";
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, Paintbrush, BarChart2, Settings, MapPin, DollarSign, Mail,
  Link, Tag, Flag, Maximize2, Trash2, Twitter, Github, Instagram, Youtube, Linkedin, Mail as MailIcon
} from 'lucide-react'

export default function DashboardPage() {
  const [bio, setBio] = useState("I quit my job to start working as a")
  const [startups, setStartups] = useState([
    { id: 1, name: "Hitme", description: "Is great", price: "$200/mo", active: true }
  ])

  const addStartup = () => {
    const newStartup = { id: Date.now(), name: "New Startup", description: "Description", price: "$0/mo", active: true }
    setStartups([...startups, newStartup])
  }

  const toggleStartup = (id: number) => {
    setStartups(startups.map(startup => 
      startup.id === id ? { ...startup, active: !startup.active } : startup
    ))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700">
              <User className="w-4 h-4 mr-2" /> PAGE
            </Button>
            <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700">
              <Paintbrush className="w-4 h-4 mr-2" /> STYLE
            </Button>
            <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700">
              <BarChart2 className="w-4 h-4 mr-2" /> STATS
            </Button>
            <Button variant="outline" className="bg-zinc-900 text-white border-zinc-700">
              <Settings className="w-4 h-4 mr-2" /> SETTINGS
            </Button>
          </div>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white">DEPLOY</Button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 space-y-8">
            {/* Profile Section */}
            <div className="bg-zinc-900 p-6 rounded-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Raul Cano" />
                  <AvatarFallback>RC</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">Raul Cano</h2>
                  <Input 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    className="bg-zinc-800 border-zinc-700 mt-2"
                  />
                </div>
              </div>
              <div className="flex space-x-4 text-zinc-400">
                <MapPin className="w-5 h-5" />
                <DollarSign className="w-5 h-5" />
                <Mail className="w-5 h-5" />
              </div>
            </div>

            {/* Add Startup Button */}
            <Button onClick={addStartup} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-6">
              + ADD STARTUP
            </Button>

            {/* Startups List */}
            {startups.map(startup => (
              <div key={startup.id} className="bg-zinc-900 p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt={startup.name} />
                      <AvatarFallback>{startup.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{startup.name}</h3>
                      <p className="text-zinc-400">{startup.description}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={startup.active}
                    onCheckedChange={() => toggleStartup(startup.id)}
                  />
                </div>
                <div className="flex space-x-4 text-zinc-400">
                  <Link className="w-5 h-5" />
                  <DollarSign className="w-5 h-5" />
                  <Tag className="w-5 h-5" />
                  <Flag className="w-5 h-5" />
                  <Maximize2 className="w-5 h-5" />
                  <Trash2 className="w-5 h-5" />
                </div>
              </div>
            ))}

            {/* Social Media Links */}
            <div className="flex justify-center space-x-6 text-zinc-400">
              <Twitter className="w-6 h-6" />
              <Github className="w-6 h-6" />
              <Instagram className="w-6 h-6" />
              <Youtube className="w-6 h-6" />
              <Linkedin className="w-6 h-6" />
              <MailIcon className="w-6 h-6" />
            </div>
          </div>

          {/* Right Column - Phone Preview */}
          <div className="lg:w-1/3">
            <div className="bg-zinc-800 rounded-[40px] p-4 mx-auto max-w-[300px] aspect-[9/19]">
              <div className="bg-zinc-200 rounded-[32px] h-full p-4 text-black">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold">Raul Cano</h3>
                    <p className="text-xs flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> Lisbon
                    </p>
                  </div>
                  <div className="bg-green-500 text-white p-1 rounded-full">
                    <Link className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-sm mb-4">{bio}</p>
                {startups.map(startup => startup.active && (
                  <div key={startup.id} className="bg-white rounded-lg p-3 mb-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{startup.name}</h4>
                      <span className="text-xs">{startup.price}</span>
                    </div>
                    <p className="text-xs text-gray-600">{startup.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center mt-4 text-zinc-400 text-sm">
              Preview of your Indie Page. Deploy to go live ✨
            </p>
            <p className="text-center mt-2 text-zinc-400 text-sm">
              indiepage/raulcano
            </p>
          </div>

        </div>
        
      </div>
    </div>
  )
}