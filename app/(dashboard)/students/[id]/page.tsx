'use client';
import AnecdotalNotes from '@/components/notes/StudentsNotes';
import { useStudent } from '@/hooks/useStudent';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Button } from '@nextui-org/react';
import UpdateNotes from '@/components/notes/UpdateNotes';
import Loading from '@/components/Loading';

const StudentPage = ({ params: { id } }: { params: { id: string } }) => {
   const router = useRouter();
   const { student, loading } = useStudent(id);
   if (loading) return <Loading />;
   if (!student) return null;

   return (
      <div className='flex min-h-screen flex-col mx-auto py-2 w-full'>
         <div className='flex justify-between w-full'>
            <div
               onClick={router.back}
               className='flex gap-1 items-center cursor-pointer'
            >
               <Button className='bg-white dark:bg-slate-700' isIconOnly>
                  <BsChevronLeft size={26} />
               </Button>
               <p>Back</p>
            </div>

            <h1 className='capitalize text-md md:text-xl text-center'>
               Notes For {student.name} {student.lastName}
            </h1>
            <UpdateNotes fields={student.fields!} studentId={student.id!} />
         </div>

         <AnecdotalNotes fields={student.fields!} />
      </div>
   );
};

export default StudentPage;
