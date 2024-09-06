"use client";
import { DashboardNavbar } from './components/layout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className=''>
      <DashboardNavbar />
      {children}
    </div>
    </>
  );
}
