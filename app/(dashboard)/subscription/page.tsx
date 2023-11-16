'use client';
import Loading from '@/components/Loading';
import SubscriptionCard from '@/components/SubscriptionCard';
import { useSubscription } from '@/providers/store';
import { subsData } from '@/subscriptionData';
import React from 'react';

const MySubscription = () => {
   const subs = useSubscription((s) => s.subscription);
   if (subs === undefined) return <Loading />;
   return (
      <div className='mx-auto flex flex-col w-full'>
         <div>
            <h2 className='text-2xl text-center my-4'>
               Manage My Subscription
            </h2>
         </div>
         <div className='grid sm:grid-cols-2 gap-4'>
            {subsData.map((s) => (
               <SubscriptionCard key={s.id} sub={s} currentSub={subs!} />
            ))}
         </div>
      </div>
   );
};

export default MySubscription;
