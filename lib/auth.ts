import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import type { NextAuthOptions } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

// The authOptions object is used to configure the authentication provider
export const authOptions: NextAuthOptions = {

  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },
  providers: [
    credentials({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      
      // The authorize method is used to check the credentials
      async authorize(credentials) {
        await connectDB();

        // Find the user by email address and select the password field
        const user = await User.findOne({ email: credentials?.email }).select('+password');

        if (!user) throw new Error('Wrong Email');

        // Compare the password from the form with the password from the database
        const passwordMatch = await bcrypt.compare(credentials!.password, user.password);

        if (!passwordMatch) throw new Error('Wrong Password');

        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
};

