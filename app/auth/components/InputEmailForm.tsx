'use client';
import React, { FormEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Button, Input, Label } from '@/components/ui';
import { toast } from 'sonner';

export function InputEmailForm() {
  return (
    <>
      <h2 className="mt-6 text-3xl font-extrabold">Reset your password</h2>
      <form className="mt-4 space-y-6">
        <div>
          <Label htmlFor="email" className="block text-sm font-medium">
            Email address
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            className="mt-1 block w-full bg-zinc-900 border-zinc-700 text-white"
          />
        </div>

        <Button type="submit" className="w-full bg-white text-black hover:bg-zinc-200">
          Send Email
        </Button>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="/auth/login" className="font-medium text-white hover:underline">
              Sign in to your account
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
