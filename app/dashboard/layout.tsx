'use client';
import { CreativeNavbar } from './components/layout';
import { UserProvider } from './context/UserContext';
import { Toaster } from 'sonner';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <UserProvider>
    <Toaster position="top-center" />

      <div className="min-h-screen">
        <div className="container mx-auto max-w-[75rem] px-2 py-8">
          <CreativeNavbar />
          {children}
        </div>
      </div>
      </UserProvider>
    </>
  );
}
