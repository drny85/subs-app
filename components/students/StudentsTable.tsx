'use client';
import React, { useCallback, useMemo, useState } from 'react';
import {
   Table,
   TableHeader,
   TableColumn,
   TableBody,
   TableRow,
   TableCell,
   getKeyValue,
   Pagination,
   Tooltip,
   Button,
   Input,
   SortDescriptor,
} from '@nextui-org/react';
import { useStudents } from '@/hooks/useStudents';
import { Student } from '@/types';
import { AiFillDelete } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';

const StudentsTable = () => {
   const { students } = useStudents();
   const [page, setPage] = useState(1);
   const [filterValue, setFilterValue] = useState('');
   const hasSearchFilter = Boolean(filterValue);
   const [rowsPerPage, setRowsPerPage] = useState(10);

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
      column: 'name',
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
                  className='w-full sm:max-w-[60%]'
                  placeholder='Search by name...'
                  startContent={<BiSearch />}
                  value={filterValue}
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
         { key: 'actions', label: 'Actions' },
      ];
   }, []);
   const renderCell = React.useCallback(
      (student: Student, columnKey: React.Key) => {
         const cellValue = student[columnKey as keyof Student];

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
                  <div className='relative flex items-center justify-center gap-4'>
                     <Tooltip color='danger' content='Delete Student'>
                        <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                           <AiFillDelete size={30} />
                        </span>
                     </Tooltip>
                     <Tooltip content='View Student'>
                        <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                           <Button color='secondary'>View</Button>
                        </span>
                     </Tooltip>
                  </div>
               );
            default:
               return cellValue;
         }
      },
      []
   );

   return (
      <Table
         color='primary'
         selectionMode='single'
         aria-label='Example table with custom cells'
         topContent={topContent}
         bottomContent={
            <div className='flex justify-center w-full'>
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
         }
         sortDescriptor={sortDescriptor}
         onSortChange={setSortDescriptor}
      >
         <TableHeader columns={columns}>
            {(column) => (
               <TableColumn
                  allowsSorting={column.key !== 'actions'}
                  key={column.key}
                  align={'end'}
               >
                  {column.label}
               </TableColumn>
            )}
         </TableHeader>
         <TableBody items={sortedItems}>
            {(item) => (
               <TableRow key={item.id}>
                  {(columnKey) => (
                     <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
               </TableRow>
            )}
         </TableBody>
      </Table>
   );
};

export default StudentsTable;
