import { connectDB } from '@/lib/mongodb';
import User from '@/models/Schemas';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { sendVerificationRequest } from '@/utils/resend';
import config from '@/config';

interface UserType {
  id: string; 
  name: string;
  email: string;
  password?: string;
}

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
      async authorize(credentials): Promise<UserType | null> {
        await connectDB();
        const user = await User.findOne({ email: credentials?.email }).select('+password');

        if (!user) throw new Error('Wrong Email');

        const passwordMatch = await bcrypt.compare(credentials!.password, user.password);

        if (!passwordMatch) throw new Error('Wrong Password');

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    EmailProvider({
      from: config.email.noreply,
      sendVerificationRequest,
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({user, account}): Promise<any> {

      if(account?.provider === 'google' || account?.provider === 'github'){ {
        const { email, name, image } = user;

        try {
          await connectDB();
          let userExist = await User.findOne({ email });
          
          if(!userExist){
            userExist = await User.create({ name, email, avatar: image });
          }

          user.id = userExist?._id.toString(); 

        } catch(error) {
          console.error(error);
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      // If the user is authenticated, store the user's id in the token
      if (user) {
        token.id = user.id;
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