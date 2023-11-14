'use client';
import { PropsWithChildren, useEffect } from 'react';

import { signInWithCustomToken, updateCurrentUser } from 'firebase/auth';

import { useAuth, useUser } from '@clerk/nextjs';
import { auth } from '@/firebase';

const FirebaseProvider = ({ children }: PropsWithChildren) => {
   const { getToken } = useAuth();
   const { user } = useUser();
   useEffect(() => {
      const signInWithClerk = async () => {
         const token = await getToken({ template: 'integration_firebase' });
         if (!token) return;
         await signInWithCustomToken(auth, token);
         if (
            user?.emailAddresses &&
            user.emailAddresses.length > 0 &&
            auth.currentUser
         ) {
            await updateCurrentUser(auth, {
               ...auth.currentUser!,
               email: user.emailAddresses[0].emailAddress || null,
            });
         }

         /**
          * The userCredentials.user object will call the methods of
          * the Firebase platform as an authenticated user.
          */
      };

      signInWithClerk();
   }, []);

   return <>{children}</>;
};

export default FirebaseProvider;
