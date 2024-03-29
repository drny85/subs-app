'use client';
import Loading from '@/components/Loading';
import AnecdotalNotes from '@/components/notes/StudentsNotes';
import UpdateNotes from '@/components/notes/UpdateNotes';
import { useStudent } from '@/hooks/useStudent';
import { useModalState, useSubscription } from '@/providers/store';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsChevronLeft } from 'react-icons/bs';

const StudentPage = ({ params: { id } }: { params: { id: string } }) => {
   const router = useRouter();
   const subs = useSubscription((s) => s.subscription);
   const openModal = useModalState((s) => s.setIsOpen);
   const { student, loading } = useStudent(id);
   if (loading || subs === undefined) return <Loading />;
   if (!student) return null;

   if (!subs || (subs && subs.status !== 'active')) {
      return (
         <div className='flex items-center justify-center flex-col mt-20 gap-10'>
            <p className='text-xl font-semibold'>
               Please subscribe to get access to this page
            </p>
            <Button
               onPress={() => {
                  openModal(true);
               }}
               size='lg'
               variant='shadow'
            >
               Subscribe
            </Button>
         </div>
      );
   }

   return (
      <div className='flex flex-col mx-auto py-2 w-full'>
         <div className='flex sticky top-20 z-50 max-w-3xl justify-between w-full items-center shadow-md'>
            <div
               onClick={() => router.push('/students')}
               className='flex gap-1 items-center cursor-pointer'
            >
               <Link href={'/students'}>
                  <BsChevronLeft size={26} color='gray' />
               </Link>
               <p>Back</p>
            </div>

            <h1 className='capitalize text-md md:text-xl text-center font-semibold'>
               Notes For {student.name} {student.lastName}
            </h1>

            <UpdateNotes fields={student.fields!} studentId={student.id!} />
         </div>
         <div className='mt-12'>
            <AnecdotalNotes fields={student.fields!} />
         </div>
      </div>
   );
};

export default StudentPage;
