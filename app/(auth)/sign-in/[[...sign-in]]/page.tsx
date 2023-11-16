import { SignIn } from '@clerk/clerk-react';

const SingInPage = () => {
   return (
      <div className='min-h-screen flex justify-center items-center'>
         <SignIn redirectUrl={'/'} />
      </div>
   );
};

export default SingInPage;
