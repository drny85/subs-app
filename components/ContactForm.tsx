'use client';
import { Button, Card, Input, Textarea } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsEnvelope } from 'react-icons/bs';

import { FormDataSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useState } from 'react';
import { useSubscription } from '@/providers/store';
import { Role } from '@/types';

type Inputs = z.infer<typeof FormDataSchema>;

const ContactForm = () => {
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const subs = useSubscription((s) => s.subscription);
   const {
      register,
      reset,
      handleSubmit,
      formState: { errors, isLoading },
   } = useForm<Inputs>({ resolver: zodResolver(FormDataSchema) });

   const processForm: SubmitHandler<Inputs> = async (data) => {
      try {
         setLoading(true);
         const s: Inputs = {
            ...data,
            subscriptionPlan:
               subs && subs.status === 'active' ? (subs.role as Role) : null,
         };
         const res = await axios.post('/api/contact', data);
         if (res.status === 200) {
            toast.success('Email sent successfully');
            reset();
            router.back();
         }
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }

      // router.back();
   };

   return (
      <Card className='w-full'>
         <form
            className='w-full h-full p-6 space-y-6 items-center flex flex-col'
            onSubmit={handleSubmit(processForm)}
         >
            <Input
               radius={'md'}
               label='Subject'
               {...register('subject')}
               required
               placeholder='Type a Subject here'
               autoCapitalize='words'
               className='capitalize'
               name='subject'
               variant='bordered'
               labelPlacement='outside'
               fullWidth
               errorMessage={errors.subject && errors.subject.message}
            />
            <Textarea
               labelPlacement='outside'
               label='Email Body'
               {...register('message')}
               name='message'
               variant='bordered'
               required
               errorMessage={errors.message && errors.message.message}
               placeholder='Write your message here. Please be very expeficy about your needs or concerns.'
               minRows={10}
            />
            <Button
               isLoading={loading}
               disabled={isLoading}
               startContent={<BsEnvelope size={26} />}
               size='lg'
               color='primary'
               type='submit'
               variant='solid'
               className='w-[60%]'
            >
               Send
            </Button>
         </form>
      </Card>
   );
};

export default ContactForm;
