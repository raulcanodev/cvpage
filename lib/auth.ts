import { connectDB } from '@/lib/mongodb';
import User from '@/models/Schemas';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';

// TODO: Fix the type of the user object

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await connectDB();
        // Find the user by email address and select the password field
        const user = await User.findOne({ email: credentials?.email }).select('+password');

        if (!user) throw new Error('Wrong Email');

        // Compare the password from the form with the password from the database
        const passwordMatch = await bcrypt.compare(credentials!.password, user.password);

        if (!passwordMatch) throw new Error('Wrong Password');

        // Return user with id included
        return {
          id: user._id.toString(), // Convert ObjectId to string
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({user, account}): Promise<any> {

      if(account?.provider === 'google') {
        const { email, name, image } = user;

        try {
          await connectDB();
          let userExist = await User.findOne({ email });
          
          if(!userExist){
            userExist = await User.create({ name, email, avatar: image });
          }

          user._id = userExist?._id.toString(); 

        } catch(error) {
          console.error(error);
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      // If the user is authenticated, store the user's id in the token
      if (user) {
        token.id = user._id;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Transfer the user id from the token to the session
      if (token?.id) {
        if (!session.user) {
          session.user = {};
        }
        // This is the path to the user id
        session.user._id = token.id;
        
      }
      return session;
    },
  },
};