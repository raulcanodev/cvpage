'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui"
import { Copy } from 'lucide-react'
import { Logout } from './_components/ui/'
import { useUserContext } from '@/app/dashboard/context/UserContext'

export default function SettingsPage() {
  const [username, setUsername] = useState('raulcano')
  const [customDomain, setCustomDomain] = useState('marclou.com')
  const router = useRouter()
  const { userData } = useUserContext()
  const { premium } = userData
  

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      router.push('/')
    }
  }

  const handleLogout = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-[#2C2C2E]">
            <TabsTrigger value="account" className="data-[state=active]:bg-[#3A3A3C] data-[state=active]:text-white">ACCOUNT</TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-[#3A3A3C] data-[state=active]:text-white">BILLING</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-6">
            <div className="bg-[#2C2C2E] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Change username</h2>
              <div className="flex space-x-2">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-[#3A3A3C] border-[#4A4A4C] text-white flex-grow"
                />
                <Button variant="secondary" className="bg-[#4A4A4C] hover:bg-[#5A5A5C]">UPDATE</Button>
              </div>
            </div>

            <div className="bg-[#2C2C2E] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Hitme.to domain</h2>
              <div className="flex justify-between items-center">
                <span className="text-[#8E8E93]">hitme.to/{username}</span>
                <Button variant="outline" size="sm" onClick={() => {
                  navigator.clipboard.writeText(`hitme.to/${username}`)
                }}>
                  <Copy className="h-4 w-4 mr-2" />
                  COPY
                </Button>
              </div>
            </div>

            <div className="bg-[#2C2C2E] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Custom domain</h2>
              <div className="flex space-x-2">
                <Input
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="bg-[#3A3A3C] border-[#4A4A4C] text-white flex-grow"
                />
                <Button className="bg-[#FF2D55] hover:bg-[#FF3B30]">SAVE</Button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Logout/>
            </div>
          </TabsContent>
          <TabsContent value="billing">
            <div className="bg-[#2C2C2E] p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Billing</h2>
              <p className="">
                {premium && (
                  <div className='space-y-3'>

                  <p>
                    You are currently subscribed to the <strong>Premium</strong> plan.</p>
                    {/* // TODO: Add a cat gif here */}
                  </div>
                )}
                {!premium && (
                  <div className='space-y-3'>
                    <p>
                      Upgrade to the <strong>Premium</strong> plan to make this cat happy.
                    </p>
                  {/* // TODO: Add a cat gif here */}
                  </div>

                )}
              </p>
            </div>
            <p className='mt-4 text-sm'>
                Contact us at <a href="#" className="text-blue-500">email@email.com</a> for any billing inquiries.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}