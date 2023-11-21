'use client';
import { motion } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { useEffect, useState } from 'react';
import Loading from './Loading';

import { cn } from '@/utils/cn';
import { Button } from '@nextui-org/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AnalogClock from './AnalogClock';
import ModernAnalogClock from './AnalogClock';
const play = Playfair_Display({
   subsets: ['latin'],
   weight: ['400', '500', '600', '700', '800', '900'],
});

interface Quote {
   _id: string;
   tags: string[];
   content: string;
   author: string;
   authorSlug: string;
   length: number;
   dateAdded: string;
}

const MemberPage = () => {
   const { data: session, status } = useSession();
   const router = useRouter();

   const [quote, setQuote] = useState<Quote | null>(null);

   useEffect(() => {
      const fetchQuote = async () => {
         try {
            const response = await axios.get<Quote>(
               'https://api.quotable.io/random'
            );
            setQuote(response.data);
         } catch (error) {
            console.error('Error fetching quote:', error);
         }
      };

      fetchQuote();
   }, []);

   if (status === 'loading') return <Loading />;

   return (
      <div
         className={cn(
            'flex flex-col mx-auto items-center justify-center  p-4 absolute top-80 max-w-2xl',
            play.className
         )}
      >
         <motion.div
            initial={{ opacity: 0, translateX: -100 }}
            animate={{ opacity: 1, translateX: 0, translateY: -80 }}
            transition={{ duration: 0.7, delay: 1 }}
         >
            <ModernAnalogClock size='md' />
            <p className='text-xl md:text-3xl font-semibold text-center my-4'>
               Welcome Back {session?.user.name}
            </p>
         </motion.div>
         <motion.div
            initial={{ opacity: 0, translateX: 100 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.7, type: 'spring', delay: 1 }}
         >
            <p className='text-2xl py-6 text-center'>
               I hope you are having an excellent day
            </p>

            {quote && (
               <div className='space-y-10'>
                  <p
                     style={{ lineHeight: 2 }}
                     className='text-xl my-4 font-thin italic'
                  >
                     {quote.content}
                  </p>
                  <p className='text-light text-right mr-12 italic'>
                     --{quote.author}
                  </p>
               </div>
            )}
         </motion.div>
         <motion.div className='mt-20'>
            <Button
               onPress={() => router.push('/students')}
               variant='bordered'
               color='secondary'
               size='lg'
            >
               View My Students
            </Button>
         </motion.div>
      </div>
   );
};

export default MemberPage;
