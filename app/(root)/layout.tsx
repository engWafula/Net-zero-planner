

"use client"
import { Main } from "next/document";
import Image from "next/image";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useSession } from "next-auth/react";

export default   function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const session = useSession();
    const notLoggedIn = (session.status=="unauthenticated")

    if(notLoggedIn) redirect('/signin')

    return (
      <div className='h-full'>
        <div className='h-[80px] fixed insert-y-0 w-full z-50'>
          <Header userName={session.data?.user?.name}/>
        </div>
        <div className='hidden md:flex h-[100%] flex-col fixed insert-y-0 z-50'>
         <Sidebar/>
        </div>
        <main className='bg-gray-100 pt-[80px] h-full'>
        {children}
        </main>
      </div>

    );
  }
  