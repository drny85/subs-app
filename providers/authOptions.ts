import { auth } from '@/firebase';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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
      CredentialsProvider({
         name: 'credentials',
         credentials: {
            email: { label: 'Email', type: 'text' },
            password: { label: 'Password', type: 'password' },
         },
         async authorize(credentials) {
            if (!credentials || !credentials.email || !credentials.password) {
               return null;
            }

            try {
               const { user } = await signInWithEmailAndPassword(
                  auth,
                  credentials.email,
                  credentials.password
               );
               if (!user) return null;
               return { ...user, id: user.uid };
            } catch (error) {
               console.log(error);
               console.log('Error signing in with email and password');

               return null;
            }
         },
      }),
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
};
