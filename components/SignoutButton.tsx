'use client';
import { useRouter } from 'next/navigation';
import { auth, initFirebase } from '@/firebase';
import { getCheckoutUrl, getPremiumStatus } from '@/subscriptions/stripeLinks';
import { useUser } from '@clerk/nextjs';

export const SignoutButton = () => {
   const { user } = useUser();

   const router = useRouter();

   const onPress = async () => {
      try {
         auth.signOut();
      } catch (error) {
         console.log(error);
      }
   };
   const upgradeToPremium = async () => {
      try {
         if (!user) return;
         const priceId = 'price_1OA186Jl9lpkDFOwq12DfMSq';
         const checkoutUrl = await getCheckoutUrl(user?.id, priceId);
         router.push(checkoutUrl);
         console.log('Upgrade to Premium');
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div className='space-x-4 space-y-6'>
         <button
            onClick={onPress}
            className='px-8 py-3 rounded-lg bg-slate-700 text-white'
         >
            Sign Out
         </button>
         <button onClick={upgradeToPremium}>Subscribe</button>
      </div>
   );
};
