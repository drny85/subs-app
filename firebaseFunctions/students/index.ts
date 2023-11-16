import { studentsCollection } from '@/firebase';
import { Student } from '@/types';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export const onDeleteStudent = async (studentId: string): Promise<boolean> => {
   try {
      if (!studentId) return false;
      const ref = doc(studentsCollection, studentId);
      await deleteDoc(ref);
      return true;
   } catch (error) {
      console.log('Error deleting student', error);
      return false;
   }
};

export const onUpdateStudent = async (student: Student): Promise<boolean> => {
   try {
      if (!student) return false;
      const ref = doc(studentsCollection, student.id);

      await updateDoc(ref, { ...student });
      return true;
   } catch (error) {
      console.log('Error updating student', error);
      return false;
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
