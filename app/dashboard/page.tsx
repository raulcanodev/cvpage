"use client";
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Page: React.FC = () => {
  const { data: session } = useSession();

  console.log({session});

  // if( !session?.user ) {
  //   redirect('/login');
  // }
  
  
  return (
    <div>
      <h1>Page for dashboard</h1>
      <p>Welcome test</p>
    </div>
  );
};

export default Page;