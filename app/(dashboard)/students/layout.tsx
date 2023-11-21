import React, { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
   return <div className='h-full pt-20'>{children}</div>;
};

export default layout;
