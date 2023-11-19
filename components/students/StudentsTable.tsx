'use client';
import { onDeleteStudent, onUpdateStudent } from '@/firebaseFunctions/students';
import { useStudents } from '@/hooks/useStudents';
import { useSubscription } from '@/providers/store';
import { Student } from '@/types';
import { capitalizeString } from '@/utils/capitalizeString';
import {
   Button,
   Input,
   Modal,
   ModalBody,
   ModalContent,
   ModalFooter,
   ModalHeader,
   Pagination,
   SortDescriptor,
   Table,
   TableBody,
   TableCell,
   TableColumn,
   TableHeader,
   TableRow,
   Tooltip,
   useDisclosure,
} from '@nextui-org/react';
import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
import { BiEditAlt, BiSearch } from 'react-icons/bi';
import { MdOutlineDelete } from 'react-icons/md';
import Loading from '../Loading';
type PageSelection = 5 | 10 | 15 | 20;

const StudentsTable = () => {
   const subscription = useSubscription((s) => s.subscription);
   const { students, loading } = useStudents();
   const [student, setStudent] = useState<Student | null>(null);
   const [edit, setEdit] = useState(false);
   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
   const [page, setPage] = useState(1);
   const [filterValue, setFilterValue] = useState('');
   const hasSearchFilter = Boolean(filterValue);
   const [rowsPerPage, setRowsPerPage] = useState<PageSelection>(10);

   const onEditSave = async () => {
      if (!student) return;
      const updated = await onUpdateStudent(student);
      if (updated) {
         setEdit(false);
         setStudent(null);
         onClose();
      }
   };
   const onDeleteStudentPress = async () => {
      try {
         if (!student) return;

         const deleted = await onDeleteStudent(student.id!);
         if (deleted) {
            setStudent(null);
            onClose();
         }
         //onClose();
      } catch (error) {
         console.log('Error deleting student', error);
      }
   };

   const filteredItems = useMemo(() => {
      let filteredStudents = [...students];

      if (hasSearchFilter) {
         filteredStudents = filteredStudents.filter(
            (user) =>
               user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
               user.lastName.toLowerCase().includes(filterValue.toLowerCase())
         );
      }

      return filteredStudents;
   }, [students, filterValue, hasSearchFilter]);
   const pages = Math.ceil(filteredItems.length / rowsPerPage);

   const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
      column: 'name' || 'lastName',
      direction: 'ascending',
   });
   const items = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      return filteredItems.slice(start, end);
   }, [page, filteredItems, rowsPerPage]);

   const onSearchChange = useCallback((value?: string) => {
      if (value) {
         setFilterValue(value);
         setPage(1);
      } else {
         setFilterValue('');
      }
   }, []);

   const onClear = useCallback(() => {
      setFilterValue('');
      setPage(1);
   }, []);

   const sortedItems = useMemo(() => {
      return [...items].sort((a: Student, b: Student) => {
         const first = a[sortDescriptor.column as keyof Student] as string;
         const second = b[sortDescriptor.column as keyof Student] as string;
         const cmp = first < second ? -1 : first > second ? 1 : 0;

         return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      });
   }, [sortDescriptor, items]);

   const topContent = useMemo(() => {
      return (
         <div className='flex flex-col gap-4'>
            <div className='flex items-end justify-between gap-3'>
               <Input
                  isClearable
                  className='w-full sm:max-w-[100%]'
                  placeholder='Search by name or last name'
                  startContent={<BiSearch />}
                  value={filterValue}
                  size='md'
                  onClear={() => onClear()}
                  onValueChange={onSearchChange}
               />
            </div>
         </div>
      );
   }, [filterValue, onSearchChange, onClear]);

   const columns = useMemo(() => {
      return [
         { key: 'name', label: 'Name' },
         { key: 'lastName', label: 'Last Name' },
         { key: 'actions', label: '' },
      ];
   }, []);
   type S = Pick<Student, 'id' | 'name' | 'lastName' | 'userId'>;
   const renderCell = React.useCallback(
      (student: S, columnKey: React.Key) => {
         const cellValue = student[columnKey as keyof S];

         switch (columnKey) {
            case 'name':
               return (
                  <div>
                     <p className='text-bold text-lg capitalize'>
                        {student.name}
                     </p>
                  </div>
               );
            case 'lastName':
               return (
                  <div className='flex flex-col'>
                     <p className='text-bold text-lg capitalize'>
                        {student.lastName}
                     </p>
                  </div>
               );

            case 'actions':
               return (
                  <div className='relative flex items-center w-full justify-center gap-5'>
                     <div className='hidden md:block'>
                        <Tooltip color='warning' content='Edit Student'>
                           <span className='text-lg text-gray-500 cursor-pointer active:opacity-50'>
                              <Button
                                 onClick={() => {
                                    console.log('Edit');
                                    setStudent(student);
                                    setEdit(true);
                                 }}
                                 isIconOnly
                                 variant='ghost'
                              >
                                 <BiEditAlt size={24} />
                              </Button>
                           </span>
                        </Tooltip>
                     </div>
                     <Tooltip color='danger' content='Delete Student'>
                        <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                           <Button isIconOnly color='danger' variant='ghost'>
                              <MdOutlineDelete
                                 onClick={() => {
                                    setStudent(student);
                                    onOpen();
                                 }}
                                 size={24}
                              />
                           </Button>
                        </span>
                     </Tooltip>
                     <Tooltip content='View Student'>
                        <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                           <Link href={`/students/${student.id}`}>
                              <Button color='default'>View</Button>
                           </Link>
                        </span>
                     </Tooltip>
                  </div>
               );
            default:
               return cellValue;
         }
      },
      [onOpen]
   );

   if (subscription && subscription?.status !== 'active') {
      return (
         <div className='flex flex-col gap-4'>
            <p className='text-lg text-red-500'>
               You are currently in trial mode. Please upgrade your plan to
               continue using this feature.
            </p>
            <Link href='/subscription'>
               <Button color='primary'>Upgrade Plan</Button>
            </Link>
         </div>
      );
   }
   if (loading) return <Loading />;
   return (
      <>
         <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
               <ModalHeader className='flex flex-col gap-1'>
                  Delete Student
               </ModalHeader>
               <ModalBody>
                  <p>Are you sure you want to delete this student?</p>
               </ModalBody>
               <ModalFooter>
                  <Button
                     onPress={() => {
                        setStudent(null);
                        onClose();
                     }}
                  >
                     Cancel
                  </Button>
                  <Button color='danger' onPress={onDeleteStudentPress}>
                     Delete
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
         <Modal
            isOpen={edit}
            onOpenChange={() => setEdit((e) => !e)}
            placement='top-center'
         >
            <ModalContent>
               {(onClose) => (
                  <>
                     <ModalHeader className='flex flex-col gap-1'>
                        Update Student
                     </ModalHeader>
                     <ModalBody className='space-y-4'>
                        <Input
                           isRequired
                           defaultValue={student?.name!}
                           autoFocus
                           label='First Name'
                           placeholder='John'
                           autoCapitalize='words'
                           value={student?.name}
                           className='capitalize'
                           variant='underlined'
                           onChange={(e) =>
                              setStudent({
                                 ...student!,
                                 name: capitalizeString(e.target.value),
                              })
                           }
                        />
                        <Input
                           isRequired
                           defaultValue={student?.lastName}
                           label='Last Name'
                           className='capitalize'
                           placeholder='Smith'
                           value={student?.lastName}
                           autoCapitalize='words'
                           onChange={(e) =>
                              setStudent({
                                 ...student!,
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
                        <Button color='primary' onPress={onEditSave}>
                           Update Student
                        </Button>
                     </ModalFooter>
                  </>
               )}
            </ModalContent>
         </Modal>

         <Table
            color='primary'
            selectionMode='single'
            aria-label='Example table with custom cells'
            topContent={topContent}
            classNames={{
               wrapper: 'min-h-[222px]',
            }}
            bottomContent={
               sortedItems.length > 0 && (
                  <div className='flex justify-evenly w-full items-center'>
                     <Pagination
                        showControls
                        showShadow
                        color='secondary'
                        isCompact
                        page={page}
                        total={pages}
                        onChange={(p) => {
                           setPage(p);
                        }}
                     />
                  </div>
               )
            }
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
         >
            <TableHeader columns={columns}>
               {(column) => (
                  <TableColumn
                     allowsSorting={column.key !== 'actions'}
                     key={column.key}
                     align={column.key === 'actions' ? 'center' : 'end'}
                  >
                     {column.label}
                  </TableColumn>
               )}
            </TableHeader>
            <TableBody items={sortedItems} emptyContent='No Students Added'>
               {(item) => (
                  <TableRow key={item.id}>
                     {(columnKey) => (
                        <TableCell>{renderCell(item, columnKey)}</TableCell>
                     )}
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </>
   );
};

export default StudentsTable;
