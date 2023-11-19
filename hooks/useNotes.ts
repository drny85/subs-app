'use client';
import { anecdotalsCollection } from '@/firebase';
import { Anecdotal } from '@/types';
import { onSnapshot, query, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export const useAnecdotals = () => {
   const [anecdotals, setAnecdotals] = useState<Anecdotal[]>([]);
   const { data: session } = useSession();
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      if (!session) {
         setLoading(false);
         return;
      }
      console.log('useAnecdotals');
      const docQuery = query(
         anecdotalsCollection,
         where('student.id', '==', session.user.id)
      );
      const sub = onSnapshot(docQuery, (snap) => {
         setAnecdotals(snap.docs.map((s) => ({ id: s.id, ...s.data() })));
         setLoading(false);
      });
      return sub;
   }, [session]);

   return { anecdotals, loading };
};
