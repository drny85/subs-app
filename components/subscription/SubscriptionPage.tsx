'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import Loading from '../Loading';
import { useSubscription } from '@/providers/store';
import { useRouter } from 'next/navigation';
import WelcomePage from '../students/WelcomePage';
const SubscriptionPage = () => {
   const [loading, setLoading] = React.useState(false);

   const router = useRouter();
   const { user, isLoaded } = useUser();

   const subscription = useSubscription((s) => s.subscription);
   if (subscription && subscription.status === 'active' && user && isLoaded) {
      router.replace('/students');
   }

   React.useEffect(() => {
      setLoading(true);
   }, []);

   if (!isLoaded || !loading) return <Loading />;
   return (
      <div>
         <WelcomePage />
      </div>
   );
};

export default SubscriptionPage;
