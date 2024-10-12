'use client';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/app/dashboard/context/UserContext';
import Link from 'next/link';
import config from '@/config';
import { Loader2 } from 'lucide-react';

export function Preview() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useUserContext();
  const { customDomain } = userData;

  useEffect(() => {
    setRefreshKey((prevKey) => prevKey + 1);
    setIsLoading(true);
  }, [userData]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div className="bg-zinc-800 rounded-[50px] p-3 mx-auto max-w-[23.5rem] aspect-[9/19]">
        <div className="bg-zinc-950 rounded-[40px] h-full overflow-hidden text-black relative">
          {customDomain && (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 rounded-[32px]">
                  <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
                </div>
              )}
              <iframe
                key={refreshKey} 
                src={`${config.domainUrl}/${customDomain}`}
                title="Preview"
                className="w-full h-full rounded-[32px] absolute top-0 left-0"
                frameBorder="0"
                onLoad={handleIframeLoad}
                style={{
                  overflow: 'hidden',
                  scrollbarWidth: 'none',
                }}
              />
            </>
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
      <p className="text-center mt-4 text-zinc-400 text-sm">Preview of your {config.appName} page✨</p>
      {customDomain && (
        <Link
          href={`${config.domainUrl}/${customDomain}`}
          target='_blank'
          className="block text-center mt-2 text-zinc-400 text-sm underline hover:no-underline"
        >
          {config.domainName}/{customDomain}
        </Link>
      )}
    </>
  );
}