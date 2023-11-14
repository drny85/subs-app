import { db } from '@/firebase';
import { Student } from '@/types';
import { useUser } from '@clerk/nextjs';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export const useStudents = () => {
   const { user } = useUser();
   const [students, setStudents] = useState<Student[]>([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      if (!user) {
         setLoading(false);
         return;
      }
      const q = query(
         collection(db, 'students'),
         where('userId', '==', user.id)
      );
      return onSnapshot(q, (snap) => {
         setStudents(
            snap.docs.map((d) => ({ id: d.id, ...d.data() } as Student))
         );
         setLoading(false);
      });
   }, [user]);

   return { students, loading };
};
