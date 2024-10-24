'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import config from '@/config'

export function PremiumBanner() {
  const [isVisible, setIsVisible] = useState(true)

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
            Upgrade to Premium
          </p>
          <Link href={config.lemonsqueezy.productLink} passHref>
            <Button 
              size="sm"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-blue-100 whitespace-nowrap"
            >
              Upgrade Now
            </Button>
          </Link>
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