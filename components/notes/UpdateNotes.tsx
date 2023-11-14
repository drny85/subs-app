'use client';
import { studentsCollection } from '@/firebase';
import { FieldValues } from '@/types';
import { Button } from '@nextui-org/react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BiSave } from 'react-icons/bi';

type Props = {
   fields: FieldValues[];
   studentId: string;
};

const UpdateNotes = ({ fields, studentId }: Props) => {
   const [loading, setLoading] = useState(false);
   const onUpdate = async () => {
      try {
         const docRef = doc(studentsCollection, studentId);
         setLoading(true);
         const st = await getDoc(docRef);
         if (!st.exists()) {
            toast.error('Student not found');
            return;
         }
         await updateDoc(docRef, { fields });
         toast.success('Student updated successfully');
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };
   return (
      <Button
         disabled={loading}
         startContent={<BiSave />}
         isLoading={loading}
         color='secondary'
         onClick={onUpdate}
      >
         Update
      </Button>
   );
};
export default UpdateNotes;
