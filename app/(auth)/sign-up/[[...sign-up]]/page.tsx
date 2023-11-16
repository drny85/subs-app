import { SignUp } from '@clerk/clerk-react';
import React from 'react';

export const SignUpPage = () => {
   return (
      <div className='min-h-screen flex justify-center items-center'>
         <SignUp />
      </div>
   );
};
