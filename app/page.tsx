import WelcomePage from '@/components/WelcomePage';
import { authOptions } from '@/providers/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Home = async () => {
   const session = await getServerSession(authOptions);

   // if (session) {
   //    return redirect('/students');
   // }
   return (
      <div className='min-h-screen flex flex-col mx-auto items-center justify-center'>
         <WelcomePage />
      </div>
   );
};

export default Home;
