'use client';
import { db } from '@/firebase';
import { useStudentsCount } from '@/providers/store';
import { Student } from '@/types';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useStudents = () => {
   const { data: session } = useSession();
   const [students, setStudents] = useState<Student[]>([]);
   const setTotal = useStudentsCount((s) => s.setTotal);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      if (!session) {
         setLoading(false);
         return;
      }
      const q = query(
         collection(db, 'students'),
         where('userId', '==', session.user.id)
      );
      return onSnapshot(q, (snap) => {
         setStudents(
            snap.docs.map((d) => ({ id: d.id, ...d.data() } as Student))
         );
         setTotal(snap.size);
         setLoading(false);
      });
   }, [session?.user]);

   return { students, loading };
};
