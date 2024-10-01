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
  const { userData } = useUserContext()
  const { premium, customDomain } = userData


  return (
    <div className="min-h-screen p-4 md:p-8 text-black  dark:text-white">
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="account" className="w-full">
          
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-200 dark:bg-zinc-800">
            <TabsTrigger value="account" className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black dark:data-[state=active]:bg-zinc-700 dark:data-[state=active]:text-white">ACCOUNT</TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black dark:data-[state=active]:bg-zinc-700 dark:data-[state=active]:text-white">BILLING</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Change username</h2>
              <div className="flex space-x-2">
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border-zinc-300 text-black dark:border-zinc-700 dark:text-white flex-grow"
                />
                <Button variant="secondary" className="bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600">UPDATE</Button>
              </div>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Hitme.to domain</h2>
              <div className="flex justify-between items-center">
                <span className="text-zinc-600 dark:text-zinc-400">hitme.to/{customDomain}</span>
                <Button variant="outline" size="sm" onClick={() => {
                  navigator.clipboard.writeText(`hitme.to/${customDomain}`)
                }}>
                  <Copy className="h-4 w-4 mr-2" />
                  COPY
                </Button>
              </div>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Custom domain</h2>
              <div className="flex space-x-2">
                <Input
                  value={customDomain}
                  className="bg-transparent border-zinc-300 text-black dark:border-zinc-700 dark:text-white flex-grow"
                />
                <Button className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500">SAVE</Button>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Logout/>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Billing</h2>
              <p>
                {premium && (
                  <div className='space-y-3'>
                    <p>
                      You are currently subscribed to the <strong>Premium</strong> plan 🥰
                    </p>
                  </div>
                )}
                {!premium && (
                  <div className='space-y-3'>
                    <p>
                      Upgrade to the <strong>Premium</strong> plan to unlock all features.
                    </p>
                  </div>
                )}
              </p>
            </div>
            <p className='mt-4 text-sm'>
              Contact us at <a href="#" className="text-blue-600 dark:text-blue-500">email@email.com</a> for any billing inquiries.
            </p>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}
