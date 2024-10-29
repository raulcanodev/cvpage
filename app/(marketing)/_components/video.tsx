'use client'

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Play } from "lucide-react"
import Image from "next/image"

interface VideoSectionProps {
  videoId: string
  title?: string
  thumbnailQuality?: 'default' | 'hq' | 'maxres'
}

export default function Video({
  videoId,
  title = "Featured Video",
  thumbnailQuality = 'maxres'
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [thumbnailError, setThumbnailError] = useState(false)

  // Get YouTube thumbnail URL
  const getThumbnailUrl = (quality: string) => {
    return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`
  }

  // https://www.youtube.com/watch?v=lKsU3h8VXkc

  // Handle thumbnail loading error by falling back to lower quality
  const handleThumbnailError = () => {
    if (thumbnailQuality === 'maxres') {
      setThumbnailError(true)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="w-full max-w-5xl mx-auto md:py-24">
      <Card className="overflow-hidden bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
            {isLoading && (
              <div className="absolute inset-0 z-20">
                <Skeleton className="w-full h-full" />
              </div>
            )}
            
            {!isPlaying ? (
              // Thumbnail and play button
              <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
                {/* Thumbnail */}
                <Image
                  src={getThumbnailUrl(thumbnailError ? '' : thumbnailQuality)}
                  alt={title}
                  className="w-full h-full object-cover"
                  onError={handleThumbnailError}
                  loading="lazy"
                  width={1280}
                  height={720}
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Play className="w-8 h-8 md:w-12 md:h-12 text-primary fill-zinc-800 stroke-zinc-800 translate-x-0.5" />
                  </div>
                </div>
              </div>
            ) : (
              // YouTube iframe
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}