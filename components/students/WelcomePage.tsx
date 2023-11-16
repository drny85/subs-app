'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useSubscription } from '@/providers/store';
import Loading from '../Loading';

const WelcomePage: React.FC = () => {
   const [loading, setLoading] = React.useState(false);

   const router = useRouter();
   const { user, isLoaded } = useUser();

   const subscription = useSubscription((s) => s.subscription);

   React.useEffect(() => {
      if (
         subscription &&
         subscription.status === 'active' &&
         user &&
         isLoaded
      ) {
         router.replace('/students');
      }
      console.log(subscription);
      setLoading(true);
   }, [subscription]);

   if (!isLoaded || !loading) return <Loading />;
   return (
      <div className='min-h-screen flex items-center justify-center w-full'>
         <div className='max-w-2xl p-6 bg-white'>
            <h1 className='text-3xl font-bold mb-4'>Welcome to My Notes App</h1>
            <p className='text-gray-600 mb-6'>
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
               <div className='flex space-x-4'>
                  <Link href='/subscription'>
                     <p className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition'>
                        Get Basic Subscription
                     </p>
                  </Link>
                  <Link href='/subscription'>
                     <p className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition'>
                        Get Premium Subscription
                     </p>
                  </Link>
               </div>
            </motion.div>
            <motion.div
               className='absolute bottom-7 self-center flex gap-4 items-center justify-center'
               initial={{ opacity: 0, x: -100 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 1, delay: 0.4, type: 'just' }}
            >
               <p>Already have a subscription?</p>
               <Link href={'/students'}>
                  <Button variant='faded'>Login</Button>
               </Link>
            </motion.div>
         </div>
      </div>
   );
};

export default WelcomePage;
