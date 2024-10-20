import { connectDB } from '@/lib/mongodb';
import User from '@/models/Schemas';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from 'next-auth';
import config from '@/config';
import EmailProvider, { SendVerificationRequestParams } from "next-auth/providers/email";
import { Resend } from 'resend';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from '@/lib/mongoclient';

if (
  !process.env.GITHUB_CLIENT_ID ||
  !process.env.GITHUB_CLIENT_SECRET ||
  !process.env.GOOGLE_CLIENT_ID ||
  !process.env.GOOGLE_CLIENT_SECRET
) {
  throw new Error("Auth required env variables are not set");
}

interface NextAuthOptionsExtended extends NextAuthOptions {
  adapter: any;
}

export const authOptions: NextAuthOptionsExtended = {
  adapter: MongoDBAdapter(client),

  pages: {
    signIn: '/dashboard/page',
    signOut: '/auth/signin',
    error: '/auth/signin',
  },

  providers: [
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
      sendVerificationRequest : async ( params: SendVerificationRequestParams ) => {
        let { identifier, url, provider } = params;
        try {
          let resend = new Resend(process.env.RESEND_API_KEY!)
          await resend.emails.send({
            from: provider.from,
            to: identifier,
            subject: config.email.subject.login,
            html: '<html><body>\
              <h2>Your Login Link</h2>\
              <p>Welcome to StreakUp!</p>\
              <p>Please click the magic link below to sign in to your account.</p>\
              <p><a href="' + url + '"><b>Sign in</b></a></p>\
              <p>or copy and paste this URL into your browser:</p>\
              <p><a href="' + url + '">' + url + '</a></p>\
              <br /><br /><hr />\
              <p><i>This email was intended for ' + identifier + '. If you were not expecting this email, you can ignore this email.</i></p>\
              </body></html>',
          });
        } catch (error) {
          console.log({ error });
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({user, account}): Promise<any> {

      if(account?.provider === 'google' || account?.provider === 'github') {
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