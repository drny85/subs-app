import { studentsCollection } from '@/firebase';
import { Student } from '@/types';
import { addDoc, deleteDoc, doc } from 'firebase/firestore';

export const onDeleteStudent = async (studentId: string) => {
   try {
      if (!studentId) return;
      const ref = doc(studentsCollection, studentId);
      await deleteDoc(ref);
   } catch (error) {
      console.log('Error deleting student', error);
   }
};

export const onDeleteAllStudents = async () => {};
export const onAddStudent = async (student: Student) => {
   try {
      if (!student) return;
      await addDoc(studentsCollection, { ...student });
   } catch (error) {
      console.log('Error adding student', error);
   }
};
