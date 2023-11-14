import { db } from '@/firebase';
import { Subscription } from '@/types';
import {
   collection,
   DocumentData,
   FirestoreDataConverter,
} from 'firebase/firestore';

const subscriptionConverter: FirestoreDataConverter<Subscription> = {
   toFirestore: function (subscription: Subscription): DocumentData {
      return { ...subscription };
   },
   fromFirestore: function (snapshot, options): Subscription {
      const data = snapshot.data(options);
      const sub = { ...data } as Subscription;

      return sub;
   },
};

export const subscriptionsRef = (userId: string) =>
   collection(db, 'customers', userId, 'subscriptions').withConverter(
      subscriptionConverter
   );
