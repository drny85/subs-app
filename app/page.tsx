import WelcomePage from '@/components/students/WelcomePage';
import SubscriptionPage from '@/components/subscription/SubscriptionPage';

export default function Home() {
   return (
      <div className='min-h-screen flex flex-col mx-auto items-center justify-center'>
         <WelcomePage />
      </div>
   );
}
