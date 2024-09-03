'use client';
// CSR
import { useState, useEffect } from 'react';

// Components
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { EditUser } from './_components';
import { ThemeSwitcher } from '@/components/layout';

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
      <div>
        <ThemeSwitcher/>
        <EditUser/>
        {user && (
          <form action={handleSubmit}>
            <label>Update description</label>
            <Textarea name="description" defaultValue={userData.description} />
            <label>Update custom domain</label>
            <Textarea name="customDomain" defaultValue={userData.customDomain} />
            <label>Update location</label>
            <Textarea name="location" defaultValue={userData.location} />
            <label>Update website</label>
            <Textarea name="website" defaultValue={userData.website} />
            <label>Update twitter</label>
            <Textarea name="twitter" defaultValue={userData.twitter} />
            <label>Update instagram</label>
            <Textarea name="instagram" defaultValue={userData.instagram} />

            {/* Añadir campos para cada servicio */}
            {userData.services?.map((service:any, index:number) => (
              <div key={index}>
                <label>Service Title</label>
                <input
                  type="text"
                  name={`serviceTitle-${index}`}
                  defaultValue={service.title}
                />
                <label>Service Price</label>
                <input
                  type="number"
                  name={`servicePrice-${index}`}
                  defaultValue={service.price}
                />
                <label>Service Description</label>
                <Textarea
                  name={`serviceDescription-${index}`}
                  defaultValue={service.description}
                />
              </div>
            ))}

            <Button type="submit">Update</Button>
          </form>
        )}
      </div>
      {error && <p>{error}</p>}
    </>
  );
}