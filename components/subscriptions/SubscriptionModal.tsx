'use client';
import { useModalState, useSubscription } from '@/providers/store';
import { subsData } from '@/subscriptionData';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import Loading from '../Loading';
import SubscriptionCard from './SubscriptionCard';

export default function SubscriptionModal() {
   const { isOpen, setIsOpen } = useModalState();

   const subs = useSubscription((s) => s.subscription);
   if (subs === undefined) return <Loading />;

   return (
      <Modal
         size='3xl'
         isOpen={isOpen}
         onOpenChange={setIsOpen}
         isDismissable={false}
      >
         <ModalContent className='p-6'>
            <ModalHeader className='flex flex-col gap-1 text-center text-xl md:text-2xl my-4'>
               {subs && subs.status === 'active'
                  ? 'Manage Subscription'
                  : 'Select a Subscription'}
            </ModalHeader>
            <ModalBody>
               <div className='mx-auto flex flex-col w-full'>
                  <div className='grid px-4 gap-5 grid-cols-1 sm:grid-cols-2'>
                     {subsData.map((s) => (
                        <SubscriptionCard
                           key={s.id}
                           sub={s}
                           currentSub={subs!}
                        />
                     ))}
                  </div>
               </div>
            </ModalBody>
         </ModalContent>
      </Modal>
   );
}
