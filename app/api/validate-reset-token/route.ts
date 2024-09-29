import { NextApiRequest, NextApiResponse } from 'next';
import { fetchUserByToken } from '@/lib/mongodb'; 

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (req.method === 'GET') {
    const user = await fetchUserByToken(token as string);

    if (user) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(404).json({ valid: false, message: 'Invalid token' });
    }
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
