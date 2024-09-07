"use client";
import React, { useEffect, useState } from 'react';
import { MapPin, Link } from 'lucide-react';
import { Button } from '@/components/ui/';
import { useUserContext } from '@/app/dashboard/context/UserContext';

export function Preview() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { userData } = useUserContext();
  const { customDomain } = userData;



  useEffect(() => {
    // Update the refresh key when the user data changes
    setRefreshKey(prevKey => prevKey + 1);
  }, [userData]);

  return (
    <>
      <div className="bg-zinc-800 rounded-[40px] p-4 mx-auto max-w-[23.43rem] aspect-[9/19]"> {/* Tamaño ajustado para simular un móvil */}
        <div className="bg-zinc-950 rounded-[32px] h-full overflow-hidden text-black relative"> Asegurar que el contenedor de iframe no muestra scroll
          
          {/* iframe que carga la página de localhost */}
          <iframe
            key={refreshKey} // Use the key to force re-render
            src={`http://localhost:3000/${customDomain}`}
            title="Preview"
            className="w-full h-full rounded-[32px] absolute top-0 left-0"
            frameBorder="0"
            style={{
              overflow: 'hidden',
              scrollbarWidth: 'none',  /* For Firefox */
            }}
          />
        </div>
      </div>
      <p className="text-center mt-4 text-zinc-400 text-sm">
        Preview of your Hitmeto. Deploy to go live ✨
      </p>
      <p className="text-center mt-2 text-zinc-400 text-sm">hitme.to/raulcano</p>
    </>
  );
}