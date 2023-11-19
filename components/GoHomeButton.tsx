'use client';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const GoHomeButton = () => {
   const router = useRouter();
   return (
      <Button
         variant='bordered'
         color='success'
         onPress={() => router.replace('/')}
      >
         Go it!
      </Button>
   );
};

export default GoHomeButton;
