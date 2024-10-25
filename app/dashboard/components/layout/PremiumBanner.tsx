'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import config from '@/config'
import { handleCheckout } from '@/utils/checkout'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface PremiumPopupProps {
  email: string
  userId: string
}

export function PremiumBanner({ email, userId }: PremiumPopupProps) {
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()

  const handlePremiumUpgrade = async () => {
    const checkoutUrl = await handleCheckout(email, userId)
    if (checkoutUrl) {
      router.push(checkoutUrl)
    } else {
      toast.error('Failed to initiate checkout. Please try again.')
    }
  }

  useEffect(() => {
    const bannerDismissed = localStorage.getItem('premiumBannerDismissed')
    if (bannerDismissed) {
      setIsVisible(false)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('premiumBannerDismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="bg-blue-600 text-white py-2 px-4 rounded-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-grow" /> 
        <div className="flex items-center space-x-4 flex-grow">
          <p className="text-sm font-medium">
            Unlock all features
          </p>
            <Button
             onClick={handlePremiumUpgrade} 
              size="sm"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-100 whitespace-nowrap"
            >
              Upgrade Now
            </Button>
        </div>
        {/* <button 
          onClick={handleClose} 
          className="text-white hover:text-blue-200 p-2 ml-4"
          aria-label="Close banner"
        >
          <X size={20} />
        </button> */}
      </div>
    </div>
  )
}