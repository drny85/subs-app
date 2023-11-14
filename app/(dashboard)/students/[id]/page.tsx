'use client';
import AnecdotalNotes from '@/components/notes/StudentsNotes';
import { useStudent } from '@/hooks/useStudent';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Button } from '@nextui-org/react';
import UpdateNotes from '@/components/notes/UpdateNotes';

const StudentPage = ({ params: { id } }: { params: { id: string } }) => {
   const router = useRouter();
   const { student, loading } = useStudent(id);
   if (loading || !student) return null;
   console.log(student.fields);
   return (
      <div>
         <div className='flex justify-between items-center py-2'>
            <div className='flex gap-2 items-center'>
               <Button onPress={router.back} isIconOnly>
                  <BsChevronLeft size={26} />
               </Button>
               <p>Back</p>
            </div>
            <h1 className='capitalize text-2xl text-center'>
               Notes For {student.name} {student.lastName}
            </h1>
            <UpdateNotes fields={student.fields!} studentId={student.id!} />
         </div>
         <AnecdotalNotes fields={student.fields!} />
      </div>
   );
};

export default StudentPage;
