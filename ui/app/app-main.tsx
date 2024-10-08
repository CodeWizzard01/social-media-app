"use client";

import Footer from '@/components/footer';
import Header from '@/components/header';
import { UserContext, UserDetails } from '@/types/types';
import React, {  useEffect, useState } from 'react'
import { getUserDetails } from './signin/actions';

function AppMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  useEffect(() => {
        (async () => {
          const userDetails = await getUserDetails();
          setUserDetails(userDetails);
        })();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ userDetails, setUserDetails }}>
        <Header />
        <main className="grow py-3">{children}</main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default AppMain
