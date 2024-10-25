'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui"
import { Copy } from 'lucide-react'
import { Logout } from './_components/ui/'
import { useUserContext } from '@/app/dashboard/context/UserContext'
import config from '@/config'
import Link from 'next/link'
import { toast } from 'sonner'
import { handleCheckout } from '@/utils/checkout'

export default function SettingsPage() {
  const [username, setUsername] = useState('raulcano')
  const [domain, setDomain] = useState('')
  const { userData, updateUserDomain } = useUserContext()
  const { premium, customDomain, email, _id } = userData
  
  const router = useRouter()

  const handlePremiumUpgrade = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const checkoutUrl = await handleCheckout(email, _id)
    if (checkoutUrl) {
      router.push(checkoutUrl)
    }
  }

  const handleUpdateDomain = (e: React.FormEvent) => {
    e.preventDefault()
    if (!domain.trim() || domain === customDomain) return
    try {
      const escapedDomain = domain
        .replace(/[^a-zA-Z0-9-]/g, '') // Remove any character that is not a letter, number, or hyphen
        .trim()
        .toLowerCase()
      if (escapedDomain !== domain) {
        toast.error('Invalid domain name')
        return
      }
      updateUserDomain(userData._id, escapedDomain)
    } catch (error) {
      console.error('Failed to update custom domain:', error)
    }
  }

  return (
    <div className="p-4 md:p-8 text-black dark:text-white">
      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-200 dark:bg-zinc-800">
            <TabsTrigger value="account" className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black dark:data-[state=active]:bg-zinc-700 dark:data-[state=active]:text-white">ACCOUNT</TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-zinc-300 data-[state=active]:text-black dark:data-[state=active]:bg-zinc-700 dark:data-[state=active]:text-white">BILLING</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-6">
            {email && (
              <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Email Account</h2>
                <div className="flex space-x-2">
                  <p className='text-black dark:text-white'>{email}</p>
                </div>
              </div>
            )}

            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{config.domainName} domain</h2>
              <div className="flex justify-between items-center">
                <span className="text-zinc-600 dark:text-zinc-400">{config.domainName}/{customDomain}</span>
                <Button variant="outline" className='border-none' size="sm" onClick={() => {
                  navigator.clipboard.writeText(`${config.domainName}/${customDomain}`)
                }}>
                  <Copy className="h-4 w-4 mr-2" />
                  COPY
                </Button>
              </div>
            </div>

            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                {customDomain ? 'Update' : 'Add'} custom domain
              </h2>
              <form onSubmit={handleUpdateDomain} className="flex space-x-2">
                <Input
                  placeholder={customDomain || ''}
                  onChange={(e) => setDomain(e.target.value)}
                  className="bg-transparent border-zinc-300 text-black dark:border-zinc-700 dark:text-white flex-grow"
                />
                <Button 
                  type="submit"
                  className="border-none"
                  variant="outline"
                >
                  SAVE
                </Button>
              </form>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Logout/>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Billing</h2>
              {premium ? (
                <div className='space-y-3'>
                  <p>
                    You are currently in the <strong>Premium</strong> plan 🥰
                  </p>
                </div>
              ) : (
                <div className='space-y-3'>
                  <p>
                    Upgrade to 
                      <span className="text-blue-600 dark:text-blue-500 cursor-pointer" onClick={handlePremiumUpgrade}> Premium </span>
                    to unlock all features. 🚀
                  </p>
                  <p className='text-xs'>Only {config.lemonsqueezy.price}. No subscription, keep it forever</p>
                </div>
              )}
            </div>
            <p className='mt-4 text-sm'>
              Contact us at <a href="mailto:email@email.com" className="text-blue-600 dark:text-blue-500">email@email.com</a> for any billing inquiries.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}