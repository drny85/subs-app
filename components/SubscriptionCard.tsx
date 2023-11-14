'use client';
import React from 'react';
import {
   Card,
   CardBody,
   CardHeader,
   CardFooter,
   ButtonGroup,
   Button,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
const SubscriptionCard = () => {
   const router = useRouter();
   return (
      <Card>
         <CardHeader>
            <h3>Plan</h3>
         </CardHeader>
         <CardFooter>
            <Button onClick={() => router.push('/students')} color='secondary'>
               Subscribe
            </Button>
         </CardFooter>
      </Card>
   );
};

export default SubscriptionCard;
