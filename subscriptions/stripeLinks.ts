'use client';
import { subscriptionsRef } from '@/converters/Subcription';
import { initFirebase } from '@/firebase';
import { Role } from '@/types';
import {
   addDoc,
   collection,
   getFirestore,
   onSnapshot,
   query,
   where,
} from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

export const getCheckoutUrl = async (
   userId: string,
   priceId: string
): Promise<string> => {
   if (!userId) throw new Error('User is not authenticated');
   const app = initFirebase();
   const db = getFirestore(app);
   const checkoutSessionRef = collection(
      db,
      'customers',
      userId,
      'checkout_sessions'
   );

   const docRef = await addDoc(checkoutSessionRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
   });

   return new Promise<string>((resolve, reject) => {
      const unsubscribe = onSnapshot(docRef, (snap) => {
         const { error, url } = snap.data() as {
            error?: { message: string };
            url?: string;
         };
         if (error) {
            unsubscribe();
            reject(new Error(`An error occurred: ${error.message}`));
         }
         if (url) {
            console.log('Stripe Checkout URL:', url);
            unsubscribe();
            resolve(url);
         }
      });
   });
};

export const getPortalUrl = async (userId: string): Promise<string> => {
   const app = initFirebase();
   let dataWithUrl: any;
   try {
      const functions = getFunctions(app, 'us-central1');
      const functionRef = httpsCallable(
         functions,
         'ext-firestore-stripe-payments-createPortalLink'
      );
      const { data } = await functionRef({
         customerId: userId,
         returnUrl: window.location.origin,
      });

      // Add a type to the data
      dataWithUrl = data as { url: string };
      console.log('Reroute to Stripe portal: ', dataWithUrl.url);
   } catch (error) {
      console.error(error);
   }

   return new Promise<string>((resolve, reject) => {
      if (dataWithUrl.url) {
         resolve(dataWithUrl.url);
      } else {
         reject(new Error('No url returned'));
      }
   });
};

export const getPremiumStatus = async (userId: string) => {
   if (!userId) throw new Error('User not logged in');

   const q = query(
      subscriptionsRef(userId),
      where('status', 'in', ['trialing', 'active'])
   );

   return new Promise<Role>((resolve, reject) => {
      const unsubscribe = onSnapshot(
         q,
         (snapshot) => {
            // In this implementation we only expect one active or trialing subscription to exist.
            console.log('Subscription snapshot', snapshot.docs.length);
            if (snapshot.docs.length === 0) {
               console.log('No active or trialing subscriptions found');
               resolve(null);
            } else {
               console.log('Active or trialing subscription found');

               resolve(snapshot.docs[0].data().role as Role);
            }
            unsubscribe();
         },
         reject
      );
   });
};
