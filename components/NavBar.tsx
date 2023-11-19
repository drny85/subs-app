'use client';
import {
   Button,
   Divider,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   User,
} from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';
import { useModalState } from '@/providers/store';

const links: { label: string; path: string }[] = [
   { label: 'Home', path: '/' },
   { label: 'Students', path: '/students' },
];

const NavBar = () => {
   const { data: session } = useSession();
   const path = usePathname();
   const openModal = useModalState((s) => s.setIsOpen);

   if (!session) return null;

   return (
      <>
         <nav className='flex gap-4 justify-between py-3 mb-2 px-4 sm:px-1'>
            <div className='flex gap-6'>
               {links.map((link, index) => {
                  return (
                     <Link
                        key={index}
                        className={
                           path.replace(/\//g, '') ===
                           link.path.replace(/\//g, '')
                              ? 'border-b-2 border-slate-500 font-semibold hover:scale-105 transition-all'
                              : 'hover:scale-105 transition-all'
                        }
                        href={link.path}
                     >
                        {link.label}
                     </Link>
                  );
               })}
            </div>
            <div className='flex gap-4 items-center'>
               <ThemeSwitcher />
               <Dropdown className='text-center'>
                  <DropdownTrigger>
                     <User
                        name={session.user.name}
                        description={session.user.email}
                        avatarProps={{ src: session.user.image || '' }}
                     />
                  </DropdownTrigger>
                  <DropdownMenu aria-label='Static Actions'>
                     <DropdownItem
                        onPress={() => openModal(true)}
                        textValue='Subscriptions'
                     >
                        Subscriptions
                     </DropdownItem>
                     <DropdownItem
                        color='danger'
                        key={'log-out'}
                        textValue='Sign Out'
                        variant='light'
                     >
                        <Button
                           size='sm'
                           onPress={() =>
                              signOut({
                                 callbackUrl: '/',
                              })
                           }
                           variant='ghost'
                        >
                           Log Out
                        </Button>
                     </DropdownItem>
                  </DropdownMenu>
               </Dropdown>
            </div>
         </nav>
         <Divider />
      </>
   );
};

export default NavBar;
