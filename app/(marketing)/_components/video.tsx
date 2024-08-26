import { Button } from "@/components/ui/button"
import {  Play } from "lucide-react"
// import OptimizedYouTubeEmbed from "./OptimizedYouTubeEmbed"

export default function Video() {

  return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">See hitme.to in Action</h2>
            {/* <OptimizedYouTubeEmbed 
              videoId="dQw4w9WgXcQ"
              title="hitme.to Demo Video"
            /> */}
            <div className="mt-8 text-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Watch Full Demo
              </Button>
            </div>
          </div>
        </section>
  )
}