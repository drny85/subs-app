import GoHomeButton from '@/components/GoHomeButton';
import { Card, CardBody, CardFooter } from '@nextui-org/react';

const VerificationEmail = () => {
   return (
      <div className='flex justify-center items-center min-h-screen'>
         <div className='mb-10'>
            <Card>
               <CardBody>
                  <p className='text-center text-xl md:text-2xl'>
                     Email was sent
                  </p>
                  <div className='gap-6 flex flex-col p-6'>
                     <p>Please check your email to login to your account.</p>
                     <p>
                        If you can&apos;t find the email, please check your spam
                        folder.
                     </p>
                  </div>
               </CardBody>
               <CardFooter className='flex justify-center'>
                  <GoHomeButton />
               </CardFooter>
            </Card>
         </div>
      </div>
   );
};

export default VerificationEmail;
