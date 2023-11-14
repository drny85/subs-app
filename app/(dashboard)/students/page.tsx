import StudentsTable from '@/components/students/StudentsTable';
import { UserButton } from '@clerk/nextjs';

const StudentsPage = () => {
   return (
      <div>
         <div className='flex max-w-xl'>
            <UserButton />
         </div>
         <StudentsTable />
      </div>
   );
};

export default StudentsPage;
