'use client';
import { FieldValues } from '@/types';
import React, { useEffect, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { Accordion, AccordionItem, Textarea } from '@nextui-org/react';
const letters = 'abcdefghijklmnopqrstuvwxyz';
type Props = {
   fields: FieldValues[];
};
const AnecdotalNotes = ({ fields }: Props) => {
   const [open, setOpen] = useState(false);

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
                        className='w-full'
                        title={
                           <p className='font-semibold'>
                              {c.id} - {c.value}
                           </p>
                        }
                     >
                        {c.subvalue.map((f, i) => (
                           <div>
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
                                          <p className='text-sm text-gray-400'>
                                             {letters[i]}-{p}
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
                                    className='my-2 placeholder:text-red-600'
                                    role='textbox'
                                 />
                              </div>
                           </div>
                        ))}
                     </AccordionItem>
                  </Accordion>
                  {/* <Accordion.Root type="single" collapsible>
              <Accordion.Item className="AccordionItem" value={c.value}>
                <Accordion.Trigger className="text-xl font-semibold flex items-center justify-between w-full">
                  {c.id} - {c.value}
                  <BsChevronDown className="AccordionChevron font-bold h-6 w-8" />
                </Accordion.Trigger>
                <Accordion.Content>
                  {c.subvalue.map((f, i) => (
                    <Box key={f.name} my={"3"} p={"2"}>
                      <Text className="font-semibold">
                        {i + 1}- {f.name}
                      </Text>
                      {f.focus && f.focus.length > 0 && (
                        <Flex align={"center"} py="1" ml={"2"}>
                          <Text color="gray" className="font-semibold text-sm">
                            Focus:
                          </Text>

                          <Grid
                            columns={{ initial: "1", md: "2", lg: "3" }}
                            align={"center"}
                            justify={"center"}
                            className="bg-slate-100 rounded-md flex-1"
                            ml={"2"}
                          >
                            {f.focus?.map((f, i) => (
                              <Box className="flex-grow px-2 py-1" key={i}>
                                <Text color="gray" size={"1"}>
                                  <b>{`${letters[i]})`}</b>- {f}
                                </Text>
                              </Box>
                            ))}
                          </Grid>
                        </Flex>
                      )}
                      <TextArea
                        placeholder={
                          f.focus && f.focus.length > 0
                            ? f.focus.join(" \n")
                            : `Write ${f.name}`
                        }
                        value={f.value}
                        onChange={(e) => onChange(e, f.name)}
                        rows={5}
                        className="placeholder-orange-600"
                        role="textbox"
                      />
                    </Box>
                  ))}
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root> */}
               </div>
            </div>
         ))}
      </div>
   );
};

export default AnecdotalNotes;
