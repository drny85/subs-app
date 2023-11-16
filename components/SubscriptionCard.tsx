'use client';
import { getCheckoutUrl, getPortalUrl } from '@/subscriptions/stripeLinks';
import { Subscription, SubscriptionData } from '@/types';
import { useUser } from '@clerk/nextjs';
import {
   Button,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
} from '@nextui-org/react';
import Link from 'next/link';
import { useState } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
const SubscriptionCard = ({
   sub,
   currentSub,
}: {
   sub: SubscriptionData;
   currentSub: Subscription;
}) => {
   const { user } = useUser();
   const [loading, setLoading] = useState(false);

   const plan = currentSub && currentSub?.role === sub.id;
   const onUpgrade = async () => {
      try {
         setLoading(true);
         if (currentSub) {
            const url = await getPortalUrl(user?.id!);
            if (url) {
               window.location.assign(url);
            }
         } else {
            if (!user) return;
            const checkoutUrl = await getCheckoutUrl(user?.id, sub.priceId);
            if (checkoutUrl) {
               window.location.assign(checkoutUrl);
            }
         }
      } catch (error) {
         console.log('Error upgrading', error);
      } finally {
         setLoading(false);
      }
   };

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
