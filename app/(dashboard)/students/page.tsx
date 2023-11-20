import AddStudentModal from '@/components/students/AddStudentModal';
import StudentsTable from '@/components/students/StudentsTable';

const StudentsPage = () => {
   return (
      <div>
         <div className='flex w-full justify-between items-center p-3'>
            <h2 className='font-semibold text-xl md:text-2xl'>My Students</h2>

            <AddStudentModal />
         </div>
         <StudentsTable />
      </div>
   );
};

export default StudentsPage;
