'use client';
// CSR
import { useState, useEffect } from 'react';

// Components
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { EditUser, EditUserServices } from './_components/layout';
import { ThemeSwitcher } from '@/components/layout';
import { MapPin, Link } from 'lucide-react';

// SSR
import { redirect } from 'next/navigation';

// Actions
import { getUserById, updateUser, getSessionId } from '@/actions';

interface Props {
  params: {
    id: string;
  };
}

export default function DashboardEditProfile({ params }: Props) {
  const [error, setError] = useState<string>();
  const [user, setUser] = useState<string>();
  const { id } = params;

  const userData = JSON.parse(user || '{}');

  const handleSubmit = async (formData: FormData) => {
    const description = formData.get('description')?.toString();
    const customDomain = formData.get('customDomain')?.toString();
    const location = formData.get('location')?.toString();
    const website = formData.get('website')?.toString();
    const twitter = formData.get('twitter')?.toString();
    const instagram = formData.get('instagram')?.toString();

    // Extraemos los servicios del formulario
    const services = userData.services.map((service: any, index: number) => ({
      title: formData.get(`service Title-${index}`)?.toString() || service.title,
      price: Number(formData.get(`servicePrice-${index}`)) || service.price,
      description: formData.get(`serviceDescription-${index}`)?.toString() || service.description,
    }));

    const r = await updateUser(id, {
      description: description || userData.description || '',
      customDomain: customDomain || userData.customDomain || '',
      location: location || userData.location || '',
      website: website || userData.website || '',
      twitter: twitter || userData.twitter || '',
      instagram: instagram || userData.instagram || '',
      services, // Añadir los servicios actualizados
    });

    //!-> Works but TS error: Error doesn't exist on type 'string'
    // if (r?.error) {
    //   setError(r.error);
    //   return;
    // } else {
    //   return; // Puede que necesites redirigir después de la actualización
    // }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
      } catch (error) {
        setError('User not authorized to view this page or user not found');
      }
    };

    fetchUser();
  }, [id]);

  return (
    <>
      <div className='min-h-scren'>
        <div className="container mx-auto px-4 py-8">
        <ThemeSwitcher/>

          {/* Main Content */}
          <div className='flex flex-col lg:flex-row gap-8'>
            
            {/* Left - User */}
            <div className='flex-1 space-y-8 '>
              <EditUser/>
              <EditUserServices/>
            </div>

            {/* Right - Phone Preview */}
            <div className="lg:w-1/3">
            <div className="bg-zinc-800 rounded-[40px] p-4 mx-auto max-w-[300px] aspect-[9/19]">
              <div className="bg-zinc-200 rounded-[32px] h-full p-4 text-black">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold">Raul Cano</h3>
                    <p className="text-xs flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> Lisbon
                    </p>
                  </div>
                  <div className="bg-green-500 text-white p-1 rounded-full">
                    <Link className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-sm mb-4">Bio</p>
                {/* {startups.map(startup => startup.active && (
                  <div key={startup.id} className="bg-white rounded-lg p-3 mb-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{startup.name}</h4>
                      <span className="text-xs">{startup.price}</span>
                    </div>
                    <p className="text-xs text-gray-600">{startup.description}</p>
                  </div>
                ))} */}
              </div>
            </div>
            <p className="text-center mt-4 text-zinc-400 text-sm">
              Preview of your Hitmeto. Deploy to go live ✨
            </p>
            <p className="text-center mt-2 text-zinc-400 text-sm">
              hitme.to/raulcano
            </p>
          </div>
          </div>
        </div>
      </div>
      {error && <p>{error}</p>}
    </>
  );
}