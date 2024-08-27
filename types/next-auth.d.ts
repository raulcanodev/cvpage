// types/next-auth.d.ts

import { DefaultSession } from 'next-auth';

// Extend the built-in session type avoid session.user._id errors
declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}