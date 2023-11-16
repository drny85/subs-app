'use client';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Divider } from '@nextui-org/react';

const links: { label: string; path: string }[] = [
   { label: 'Home', path: '/' },
   { label: 'Students', path: '/students' },
   { label: 'Subscription', path: '/subscription' },
];

const NavBar = () => {
   const { user, isLoaded } = useUser();
   const path = usePathname();
   console.log(path.replace(/\//g, ''));

   if (!user && isLoaded) return null;

   return (
      <>
         <nav className='flex gap-4 justify-between py-3 mb-2'>
            <div className='flex gap-6'>
               {links.map((link, index) => (
                  <Link
                     key={index}
                     className={
                        path.replace(/\//g, '') === link.path.replace(/\//g, '')
                           ? 'border-b-2 border-slate-500 font-semibold hover:scale-105 transition-all'
                           : 'hover:scale-105 transition-all'
                     }
                     href={link.path}
                  >
                     {link.label}
                  </Link>
               ))}
            </div>
            <UserButton afterSignOutUrl='/' />
         </nav>
         <Divider />
      </>
   );
};

export default NavBar;
