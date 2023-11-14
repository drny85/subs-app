'use client';

import { auth } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const SigninButton = () => {
   const onPress = async () => {
      try {
         const provider = new GoogleAuthProvider();
         const result = await signInWithPopup(auth, provider);
         console.log(result.user);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div>
         <button
            onClick={onPress}
            className='px-8 py-3 rounded-lg bg-slate-700 text-white'
         >
            Sign In
         </button>
      </div>
   );
};
