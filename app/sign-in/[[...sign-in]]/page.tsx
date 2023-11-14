import { SignIn } from '@clerk/clerk-react';
import React from 'react';

const SingInPage = () => {
   return (
      <div className='min-h-screen flex justify-center items-center'>
         <SignIn />
      </div>
   );
};

export default SingInPage;
