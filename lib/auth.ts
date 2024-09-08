import { connectDB } from '@/lib/mongodb';
import User from '@/models/Schemas';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';

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
      // console.log("user", user);
      // console.log("account", account);

      if(account?.provider === 'google') {
        const { email, name } = user;
        try {
          await connectDB();
          const userExist = await User.findOne({ email });

          if(!userExist){
            const response = await fetch("http://localhost:3000/api/user", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email,
                name,
              }),
            })
            if (response.ok) {
              return user;
            }
          }
        } catch(error) {
          console.error(error);
        }
      }

      return user;
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