'use client';
import { Fields } from '@/data';
import { onAddStudent } from '@/firebaseFunctions/students';
import {
   useModalState,
   useStudentsCount,
   useSubscription,
} from '@/providers/store';
import { Student } from '@/types.js';
import { capitalizeString } from '@/utils/capitalizeString';
import {
   Button,
   Input,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   useDisclosure,
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { IoMdPersonAdd } from 'react-icons/io';

const AddStudentModal = () => {
   const { data: session } = useSession();
   const openModal = useModalState((s) => s.setIsOpen);
   const studentsTotal = useStudentsCount((s) => s.total);
   const subs = useSubscription((s) => s.subscription);
   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
   const [student, setStudent] = useState<Student>({
      name: '',
      lastName: '',
      userId: session?.user.id!,
      fields: [...Fields],
   });
   const onSave = async () => {
      if (!session) return;
      if (!student.name || !student.lastName) {
         toast.error('Both fields are required');
         return;
      }
      await onAddStudent(student);
      console.log('saved');
      setStudent({
         name: '',
         lastName: '',
         userId: session.user.id,
         fields: [...Fields],
      });
      onClose();
   };

   const handleAddStudent = () => {
      if (studentsTotal >= 2 && !subs) {
         toast.error('You can only add 2 students');
         openModal(true);
         return;
      }
      if (subs && subs.status !== 'active') {
         toast.error('You must be a paid member to add students');

         return;
      }
      onOpen();
   };

   return (
      <>
         <Button
            startContent={<IoMdPersonAdd size={24} />}
            onPress={handleAddStudent}
            color='secondary'
         >
            Add Student
         </Button>
         <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement='top-center'
         >
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className='flex flex-col gap-1'>
                        Add New Student
                     </ModalHeader>
                     <ModalBody className='space-y-4'>
                        <Input
                           isRequired
                           defaultValue={student.name}
                           autoFocus
                           label='First Name'
                           placeholder='John'
                           variant='underlined'
                           onChange={(e) =>
                              setStudent({
                                 ...student,
                                 name: capitalizeString(e.target.value),
                              })
                           }
                        />
                        <Input
                           isRequired
                           defaultValue={student.lastName}
                           label='Last Name'
                           placeholder='Smith'
                           value={student.lastName}
                           onChange={(e) =>
                              setStudent({
                                 ...student,
                                 lastName: capitalizeString(e.target.value),
                              })
                           }
                           variant='underlined'
                        />
                     </ModalBody>
                     <ModalFooter>
                        <Button color='danger' variant='flat' onPress={onClose}>
                           Cancel
                        </Button>
                        <Button color='primary' onPress={onSave}>
                           Save Student
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>
      </>
   );
};

export default AddStudentModal;
