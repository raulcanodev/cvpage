'use client';

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, CheckCircle } from "lucide-react"
import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center">
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome to hitme.to!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your account has been successfully created. You're now ready to start building your professional online presence.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">
              Proceed to Login
            </Link>
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help getting started? Check out our <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">quick start guide</a>.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}