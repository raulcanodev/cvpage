'use client';
// CSR
import { useState, useEffect } from 'react';

// Components
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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

    const r = await updateUser(id, {
      description: description || userData.description || '',
      customDomain: customDomain || userData.customDomain || '',
      location: location || userData.location || '',
      website: website || userData.website || '',
      twitter: twitter || userData.twitter || '',
      instagram: instagram || userData.instagram || '',
    });
    // TODO: Handle error to show to the user
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return redirect(`/dashboard/edit-profile/${id}`);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id); //* <- In this action we prevent the user from seeing the page if they are not authorized
        setUser(userData);
      } catch (error) {
        setError('User not authorized to view this page or user not found'); //! NOT WORKING USER STILL GETS TO SEE THE PAGE
      }
    };
    
    fetchUser();
  }, [id]);

  return (
    <>
      <div>
        {user}
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
          <Button type="submit">Update</Button>
        </form>
      </div>
      {error && <p>{error}</p>}
    </>
  );
}
