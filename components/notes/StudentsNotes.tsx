'use client';
import { FieldValues } from '@/types';
import { Accordion, AccordionItem, Textarea } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
const letters = 'abcdefghijklmnopqrstuvwxyz';
type Props = {
   fields: FieldValues[];
};
const AnecdotalNotes = ({ fields }: Props) => {
   const [state, setState] = useState(fields);
   const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
      let value = e.target.value;
      state.forEach((f) => {
         const t = f.subvalue.find((s) => s.name === name);
         if (t) {
            t.value = value;
            //console.log(t);
            const newState = [...state];
            const s = newState.map((s) => {
               if (s.value === f.value) {
                  s.subvalue = f.subvalue;
               }
               return s; // return the object to maintain immutability.
            });

            setState(s);
         }
      });

      // console.log(e.target.value);
   };
   useEffect(() => {
      setState(fields);
   }, [fields]);
   return (
      <div className='w-full'>
         {state.map((c) => (
            <div className='flex gap-3 my-3 w-full' key={c.id}>
               <div className='shadow-md w-full'>
                  <Accordion fullWidth variant='bordered' key={c.id}>
                     <AccordionItem
                        textValue={c.id.toString()}
                        className='w-full'
                        title={
                           <p className='font-semibold'>
                              {c.id} - {c.value}
                           </p>
                        }
                     >
                        {c.subvalue.map((f, i) => (
                           <div key={i}>
                              <h2>
                                 {i + 1} - {f.name}
                              </h2>
                              {f.focus && f.focus.length > 0 && (
                                 <div className='inset-2 shadow-sm outline-offset-2 mt-1 rounded-sm'>
                                    <p className='text-medium text-slate-500 ml-2'>
                                       Focus:
                                    </p>
                                    <div className='flex space-x-3 p-2'>
                                       {f.focus.map((p, i) => (
                                          <p
                                             className='text-sm text-gray-400'
                                             key={i}
                                          >
                                             {letters[i]} - {p}
                                          </p>
                                       ))}
                                    </div>
                                 </div>
                              )}
                              <div>
                                 <Textarea
                                    color='secondary'
                                    placeholder={
                                       f.focus && f.focus.length > 0
                                          ? f.focus.join(' \n')
                                          : `Write ${f.name}`
                                    }
                                    value={f.value}
                                    onChange={(e) => onChange(e, f.name)}
                                    rows={5}
                                    variant='bordered'
                                    className='my-2 placeholder:text-gray-400'
                                 />
                              </div>
                           </div>
                        ))}
                     </AccordionItem>
                  </Accordion>
               </div>
            </div>
         ))}
      </div>
   );
};

export default AnecdotalNotes;
