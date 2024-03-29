'use client';
import {
   Avatar,
   Button,
   Dropdown,
   DropdownItem,
   DropdownMenu,
   DropdownTrigger,
   Tooltip,
   User,
} from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';
import { useModalState, useSubscription } from '@/providers/store';
import { FaStarOfDavid } from 'react-icons/fa';

const links: { label: string; path: string }[] = [
   { label: 'Home', path: '/' },
   { label: 'Students', path: '/students' },
];

const NavBar = () => {
   const { data: session } = useSession();
   const path = usePathname();
   const openModal = useModalState((s) => s.setIsOpen);
   const subs = useSubscription((s) => s.subscription);

   if (!session) return null;

   return (
      <nav className='flex w-full fixed top-0 justify-between z-20 items-center max-w-2xl shadow-sm py-3 mb-2 px-4 sm:px-1'>
         <div className='flex gap-6'>
            {links.map((link, index) => {
               return (
                  <Link
                     key={index}
                     className={
                        path.replace(/\//g, '') === link.path.replace(/\//g, '')
                           ? 'border-b-2 border-slate-500 px-6 font-semibold hover:scale-105 transition-all'
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
            {subs && subs.role === 'premium' && subs.status === 'active' && (
               <div>
                  <Tooltip
                     content='PRO Member'
                     placement='bottom'
                     color='secondary'
                  >
                     <Button isIconOnly>
                        <FaStarOfDavid size={24} />
                     </Button>
                  </Tooltip>
               </div>
            )}
            <ThemeSwitcher />
            <Dropdown>
               <DropdownTrigger>
                  <Avatar
                     src={session.user.image ? session.user.image : ''}
                     alt='Image'
                  />
               </DropdownTrigger>
               <DropdownMenu aria-label='Static Actions'>
                  <DropdownItem textValue='name'>
                     {session.user.name}
                  </DropdownItem>
                  <DropdownItem textValue='email'>
                     {session.user.email}
                  </DropdownItem>
                  <DropdownItem
                     onPress={() => openModal(true)}
                     textValue='Subscriptions'
                  >
                     Subscriptions
                  </DropdownItem>
                  <DropdownItem textValue='Contact Us'>
                     <Link href={'/contact'}>Contact Us</Link>
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
   );
};

export default NavBar;
