import { sendVerificationRequest } from '@/utils/sendVerificationRequest';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import type { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { firebaseAuth, firestoreAdmin } from './firestore';

export const authOptions: AuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
         authorization: {
            params: {
               prompt: 'consent',
               access_type: 'offline',
               response_type: 'code',
            },
         },
      }),
      //@ts-ignore
      {
         id: 'resend',
         type: 'email',
         name: 'Email',
         sendVerificationRequest,
      },
   ],
   callbacks: {
      session: async ({ session, token }) => {
         if (session?.user) {
            if (token.sub) {
               session.user.id = token.sub;
               const fbToken = await firebaseAuth.createCustomToken(token.sub);
               session.firebaseToken = fbToken;
            }
         }
         return session;
      },

      jwt: async ({ token, user }) => {
         if (user) {
            token.id = user.id;
         }
         return token;
      },
   },
   adapter: FirestoreAdapter(firestoreAdmin),
   session: {
      strategy: 'jwt',
   },
   pages: {
      verifyRequest: '/verify-email',
   },
};
