'use client';
import React, { useState } from 'react';
import {
   Modal,
   ModalContent,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Button,
   useDisclosure,
   Input,
} from '@nextui-org/react';
import { IoMdPersonAdd } from 'react-icons/io';
import { Student } from '@/types.js';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import { Fields } from '@/data';
import { onAddStudent } from '@/firebaseFunctions/students';

const AddStudentModal = () => {
   const { user, isLoaded } = useUser();
   if (!isLoaded || !user) return null;
   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
   const [student, setStudent] = useState<Student>({
      name: '',
      lastName: '',
      userId: user?.id,
      fields: [...Fields],
   });
   const onSave = async () => {
      if (!student.name || !student.lastName) {
         toast.error('Both fields are required');
         return;
      }
      await onAddStudent(student);
      console.log('saved');
      onClose();
   };

   return (
      <>
         <Button
            startContent={<IoMdPersonAdd size={24} />}
            onPress={onOpen}
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
                           autoCapitalize='words'
                           className='capitalize'
                           variant='underlined'
                           onChange={(e) =>
                              setStudent({ ...student, name: e.target.value })
                           }
                        />
                        <Input
                           isRequired
                           defaultValue={student.lastName}
                           label='Last Name'
                           className='capitalize'
                           placeholder='Smith'
                           value={student.lastName}
                           autoCapitalize='words'
                           onChange={(e) =>
                              setStudent({
                                 ...student,
                                 lastName: e.target.value,
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
