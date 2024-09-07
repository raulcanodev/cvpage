'use client';
import { CreativeNavbar } from './components/layout';
import { UserProvider } from './context/UserContext';
import { Toaster } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <UserProvider>
    <Toaster position="top-center" />
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <CreativeNavbar />
          {children}
        </div>
      </div>
      </UserProvider>
    </>
  );
}
