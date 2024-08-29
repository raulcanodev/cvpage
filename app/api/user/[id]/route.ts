import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { getUserById, updateUserById } from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the current user's session
  const session = await getServerSession(authOptions);
  const currentUserId = session?.user?._id;

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Get the user ID from the URL path
  const url = new URL(req.url || '', `http://${req.headers.host}`);
  const id = url.pathname.split('/').pop();

  //* Authorization check
  if (currentUserId !== id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Handle GET request - Retrieve user data
  if (req.method === 'GET') {
    try {
      const user = await getUserById(session.user._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch user data' });
    }
  }

  // Handle POST request - Update user data
  if (req.method === 'POST') {
    const { email, name, description, customDomain, phone, profileImage, services } = req.body;

    // Validate the fields here

    try {
      await updateUserById(session.user._id, {
        email,
        name,
        description,
        customDomain,
        phone,
        profileImage,
        services,
      });

      return res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update profile' });
    }
  }

  // If method is not GET or POST, return 405 Method Not Allowed
  return res.status(405).end();
}

// session.user._id