'use client';
import { useModalState, useSubscription } from '@/providers/store';

import { Button } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { signIn, useSession } from 'next-auth/react';
import React from 'react';
import Loading from './Loading';
import MemberPage from './MemberPage';
import { useSearchParams } from 'next/navigation';

const WelcomePage = () => {
   const params = useSearchParams();
   const show = params.get('show') === 'true';

   const { data: session, status } = useSession();

   const subscription = useSubscription((s) => s.subscription);
   const openModal = useModalState((s) => s.setIsOpen);
   if (status === 'loading') return <Loading />;

   if (subscription && subscription.status === 'active' && session) {
      return <MemberPage />;
   }

   if (show) {
      openModal(show);
   }
   return (
      <div className='min-h-screen flex my-8 md:mt-12 justify-center w-full text-gray-700'>
         <div className='max-w-2xl p-6 bg-white'>
            <h1 className='text-3xl font-bold mb-4'>Welcome to My Notes App</h1>
            <p className='mb-6'>
               Store and manage all your students' notes in one place.
            </p>
            <div className='mb-8'>
               <h2 className='text-xl font-semibold mb-2'>Features:</h2>
               <ul className='list-disc pl-6'>
                  <li>Organize notes by student and subject</li>
                  <li>Easy-to-use interface for teachers</li>
                  <li>Secure and private storage</li>
               </ul>
            </div>
            <div className='mb-8'>
               <h2 className='text-xl font-semibold mb-2'>
                  Subscription Types:
               </h2>
               <p className='mb-4'>
                  Choose the subscription that fits your needs:
               </p>
               <ul className='list-disc pl-6'>
                  <li>Basic Subscription - Free access to limited features</li>
                  <li>
                     Premium Subscription - Unlock full access and premium
                     features
                  </li>
               </ul>
            </div>
            <motion.div
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.7, type: 'just' }}
            >
               <p className='mb-4'>
                  Ready to get started? Choose your subscription now!
               </p>
               <div className='flex mt-10 justify-center'>
                  <Button
                     size='lg'
                     variant='flat'
                     color='secondary'
                     onPress={() => {
                        if (session) {
                           openModal(true);
                        } else {
                           signIn('google', { callbackUrl: '/?show=true' });
                        }
                     }}
                  >
                     Subscribe Today
                  </Button>
               </div>
            </motion.div>
            {!session && (
               <motion.div
                  className='absolute bottom-12 self-center flex gap-4 items-center justify-center left-0 right-0'
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.4, type: 'just' }}
               >
                  <p>Already have a subscription?</p>
                  <Button variant='flat' onPress={() => signIn()}>
                     Login
                  </Button>
               </motion.div>
            )}
         </div>
      </div>
   );
};

export default WelcomePage;
