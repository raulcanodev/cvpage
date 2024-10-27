'use client';
import { useState, useEffect } from 'react';
import { CreativeNavbar } from './components/layout';
import { UserProvider, useUserContext } from './context/UserContext';
import { Toaster } from 'sonner';
import { PremiumBanner, PremiumPopup } from './components/layout';
import { MinimalFooter } from '@/app/(marketing)/_components';

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { userData } = useUserContext();
  const [isUserPremium, setIsUserPremium] = useState(true); // Assume premium until proven otherwise

  useEffect(() => {
    // Check if userData exists and has a 'premium' status
    if (userData && userData.premium !== undefined) {
      setIsUserPremium(userData.premium); // Update only when userData.premium is defined
    }
  }, [userData]);

  return (
    <>
      <Toaster position="top-left" />

      <div className="min-h-screen pt-16 bg-gray-100 dark:bg-zinc-950">
        <div className="fixed left-0 right-0 top-0 z-50 flex justify-center">
          <div className="w-full bg-gray-100 dark:bg-zinc-950 px-4 py-2">
            {/* Render banner only if the user is not premium */}
            {!isUserPremium && (
              <PremiumBanner email={userData.email} userId={userData._id} />
            )}
            <div className="flex flex-col justify-center items-center h-14 pt-10">
              <CreativeNavbar />
            </div>
          </div>
        </div>
        <div className={`container mx-auto max-w-[75rem] px-2 py-8 ${!isUserPremium && 'mt-8'}`}>
          {children}
        </div>
      </div>
      <div className="mb-8 md:mb-3">
        <MinimalFooter />
      </div>

      {/* Render popup only if the user is not premium */}
      {!isUserPremium && <PremiumPopup email={userData.email} userId={userData._id} />}
    </>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <DashboardContent>{children}</DashboardContent>
    </UserProvider>
  );
}
