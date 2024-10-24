'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { handleCheckout } from '@/utils/checkout'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface PremiumPopupProps {
  email: string
  userId: string
}

export function PremiumPopup({ email, userId }: PremiumPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setIsVisible(false)

  const handlePremiumUpgrade = async () => {
    const checkoutUrl = await handleCheckout(email, userId)
    if (checkoutUrl) {
      router.push(checkoutUrl)
    } else {
      toast.error('Failed to initiate checkout. Please try again.')
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Upgrade to Premium</h2>
          <button onClick={handleClose} className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
            <X size={24} />
          </button>
        </div>
        <p className="text-zinc-600 dark:text-zinc-300 mb-6">
          Unlock all features and take your experience to the next level with our Premium plan!
        </p>
        <div className="space-y-4">
          <Button onClick={handlePremiumUpgrade} className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white">
            Upgrade Now 🚀
          </Button>
          {/* <Button onClick={handleClose} variant="outline" className="w-full">
            Maybe Later
          </Button> */}
        </div>
      </div>
    </div>
  )
}