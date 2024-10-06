'use client';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import config from '@/config';

export function Preview() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { userData } = useUserContext();
  const { customDomain } = userData;

  useEffect(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, [userData]);

  return (
    <>
      <div className="bg-zinc-800 rounded-[50px] p-3 mx-auto max-w-[23.5rem] aspect-[9/19]">
        <div className="bg-zinc-950 rounded-[40px] h-full overflow-hidden text-black relative">
          {customDomain && (
            <iframe
              key={refreshKey} // Use the key to force re-render
              src={`${config.domainUrl}/${customDomain}`}
              title="Preview"
              className="w-full h-full rounded-[32px] absolute top-0 left-0"
              frameBorder="0"
              style={{
                overflow: 'hidden',
                scrollbarWidth: 'none' ,
              }}
            />
          )}
          {!customDomain && (
            <div className="flex items-center justify-center h-full flex-col p-8 text-center space-y-3">
              <p className="text-zinc-400 text-sm">
                Add a custom domain to deploy your {config.appName} page
              </p>
              <p>🥳</p>
            </div>
          )}
        </div>
      </div>
      <p className="text-center mt-4 text-zinc-400 text-sm">Preview of your hitme.to page✨</p>
      <Link
        href={`${config.domainUrl}/${customDomain}`}
        target='_blank'
        className="block text-center mt-2 text-zinc-400 text-sm underline hover:no-underline"
      >
        hitme.to/{customDomain}
      </Link>
    </>
  );
}
