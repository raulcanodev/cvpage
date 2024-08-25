import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { MessageCircle, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";




interface Props {
  children?: React.ReactNode
}

export default function Navbar({children}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  const { status } = useSession();
  const router = useRouter();


  const toggleMenu = () => setIsOpen(!isOpen)

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <button
          className="border border-solid border-black rounded"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });

          }}
        >
          Sign Out
        </button>
      )
    } else if (status === "loading") {
      return (
        <span className="text-[#888] text-sm mt-7">Loading...</span>
      )
    } else {
      return (
        <Link
          href="/login"
          className="border border-solid border-black rounded"
        >
          Sign In
        </Link>
      )
    }
  }

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800">
      <a href="#" className="flex items-center justify-center">
        <MessageCircle className="h-6 w-6 text-gray-800" />
        <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-gray-200">hitme.to</span>
      </a>
      <div className="ml-auto flex items-center">
        <nav className="hidden md:flex gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </a>
        </nav>
        <Button className="hidden md:flex ml-4">{showSession()}</Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-4 md:hidden"
          >
            <nav className="flex flex-col space-y-4">
              <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Features
              </a>
              <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
                Pricing
              </a>
              <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
                About
              </a>
              {children}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}