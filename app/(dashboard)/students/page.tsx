import AddStudentModal from '@/components/students/AddStudentModal';
import StudentsTable from '@/components/students/StudentsTable';
import { UserButton } from '@clerk/nextjs';

const StudentsPage = () => {
   return (
      <div>
         <div className='flex max-w-xl justify-between py-3'>
            <UserButton />
            <h2 className='font-semibold text-2xl'>My Students</h2>

            <AddStudentModal />
         </div>
         <StudentsTable />
      </div>
   );
};

export default StudentsPage;
