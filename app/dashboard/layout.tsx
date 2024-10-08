'use client';

import { CreativeNavbar } from './components/layout';
import { UserProvider } from './context/UserContext';
import { Toaster } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <Toaster position="top-left" />
      <div className="min-h-screen pt-16">
        <div className="fixed left-0 right-0 top-0 z-50 flex justify-center">
          <div className="w-full dark:bg-zinc-950 bg-zinc-50 px-4 py-2">
            <div className="flex justify-center items-center h-14 pt-10">
              <CreativeNavbar />
            </div>
          </div>
        </div>
        <div className="container mx-auto max-w-[75rem] px-2 py-8">{children}</div>
      </div>
    </UserProvider>
  );
}
