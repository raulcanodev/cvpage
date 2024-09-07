'use client';
import { DashboardNavbar, CreativeNavbar } from './components/layout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="container mx-auto px-4 py-8">
          <CreativeNavbar />
          {children}
        </div>
      </div>
    </>
  );
}
