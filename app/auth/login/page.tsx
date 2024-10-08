'use client'

import React, { FormEvent, useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button, Input, Label, Alert, AlertDescription } from '@/components/ui'
import { AlertCircle } from 'lucide-react'
import { LineWave } from 'react-loader-spinner'
import { AcceptConditions, GoogleSignInButton, GithubSignInButton } from '../components'
import { toast } from 'sonner'

export default function Login() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    setIsSubmitting(true)

    toast.promise(
      signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      }),
      {
        loading: 'Signing in...',
        success: (res) => {
          if (res?.error) {
            throw new Error(res.error)
          }
          return 'Signed in successfully!'
        },
        error: (err) => {
          return err.message || 'An error occurred during sign in'
        },
        finally: () => {
          setIsSubmitting(false)
        },
      }
    )
  }

  useEffect(() => {
    if (status === 'authenticated') {
      toast.success('Welcome! 🥰')
      router.push(`/dashboard/page/`)
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="m-auto">
          <LineWave
            visible={true}
            height="100"
            width="100"
            color="gray"
            ariaLabel="line-wave-loading"
            wrapperStyle={{}}
            wrapperClass=""
            firstLineColor=""
            middleLineColor=""
            lastLineColor=""
          />
        </div>
      </div>
    )
  }

  return (
    <>
      <h2 className="mt-6 text-3xl font-extrabold text-zinc-950 dark:text-white">Welcome back</h2>
      <p className="mt-2 text-sm text-zinc-400">
        Or{' '}
        <Link href="/auth/register" className="font-medium hover:underline dark:text-white text-zinc-950">
          create a new account
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium text-zinc-500 dark:text-zinc-200">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            autoComplete="on"
            className="mt-1 block w-full dark:bg-zinc-900 dark:border-zinc-700 border-zinc-300 text-black dark:text-white"
          />
        </div>

        <div>
          <Label htmlFor="password" className="block text-sm font-medium text-zinc-500 dark:text-zinc-200">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            name="password"
            required
            autoComplete="on"
            className="mt-1 block w-full dark:bg-zinc-900 dark:border-zinc-700 border-zinc-300 text-black dark:text-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="/auth/forgot-password" className="font-medium dark:text-white text-black hover:underline">
              Forgot your password?
            </Link>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-zinc-50 dark:bg-zinc-950 text-zinc-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6">
          <GithubSignInButton />
          <GoogleSignInButton />
        </div>
      </div>
      <AcceptConditions />
    </>
  )
}