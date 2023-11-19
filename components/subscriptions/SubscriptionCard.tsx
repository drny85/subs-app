'use client';
import { getCheckoutUrl, getPortalUrl } from '@/subscriptions/stripeLinks';
import { Subscription, SubscriptionData } from '@/types';

import {
   Button,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
const SubscriptionCard = ({
   sub,
   currentSub,
}: {
   sub: SubscriptionData;
   currentSub: Subscription;
}) => {
   const { data: session } = useSession();
   const [loading, setLoading] = useState(false);

   const plan = currentSub && currentSub?.role === sub.id;
   const onUpgrade = useCallback(async () => {
      try {
         if (!session) return;
         setLoading(true);
         if (currentSub) {
            const url = await getPortalUrl(session.user.id!);
            if (url) {
               window.location.assign(url);
            }
         } else {
            const checkoutUrl = await getCheckoutUrl(
               session.user?.id,
               sub.priceId
            );
            if (checkoutUrl) {
               window.location.assign(checkoutUrl);
            }
         }
      } catch (error) {
         console.log('Error upgrading', error);
      } finally {
         setLoading(false);
      }
   }, [session]);

   return (
      <Card className='w-full px-3 sm:max-w-[250px] md:max-[380px]:'>
         <CardHeader>
            <h3 className='text-center text-xl md:text-2xl font-semibold'>
               {sub.name}
            </h3>
         </CardHeader>
         <CardBody>
            <div className='flex items-center gap-2'>
               <p className='text-2xl md:text-3xl font-semibold text-center'>
                  ${sub.price}
               </p>
               <span className='text-gray-400'>/ per month</span>
            </div>

            <div className='space-y-2 mt-3'>
               {sub.descriptions.map((d) => (
                  <div className='flex gap-1 items-center'>
                     <IoMdCheckmark />
                     <p className='text-sm'>{d}</p>
                  </div>
               ))}
            </div>
         </CardBody>
         <CardFooter className='w-full'>
            <Link href={'/students'}>
               <Button
                  isLoading={loading}
                  disabled={loading}
                  fullWidth
                  color={plan ? 'secondary' : 'primary'}
                  onPress={onUpgrade}
               >
                  {plan ? 'Manage' : 'Subscribe'}
               </Button>
            </Link>
         </CardFooter>
      </Card>
   );
};

export default SubscriptionCard;
