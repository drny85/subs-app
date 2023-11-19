'use client';

import { getPremiumStatus } from '@/subscriptions/stripeLinks';
import { useSession } from 'next-auth/react';
import { PropsWithChildren, useEffect } from 'react';
import { useSubscription } from './store';

const SubscriptionProvider = ({ children }: PropsWithChildren) => {
   const { data: session } = useSession();

   const setSub = useSubscription((s) => s.setSubscription);
   useEffect(() => {
      if (!session) return;
      getPremiumStatus(session.user.id)
         .then((s) => {
            setSub(s);
         })
         .catch((e: any) => {
            console.log(e);
            setSub(null);
         });
   }, [session?.user]);
   return <>{children}</>;
};

export default SubscriptionProvider;
