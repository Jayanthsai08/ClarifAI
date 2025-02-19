"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { api } from '../../convex/_generated/api';
import { useQuery } from 'convex/react';
import Link from 'next/link';

function Dashboard() {
  const { user } = useUser();

  // Ensure user is fully loaded before calling useQuery
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const fileList = useQuery(api.fileStorage.GetUserFiles, userEmail ? { userEmail } : undefined);

  console.log(fileList);

  return (
    <div className='h-screen' style={{ backgroundImage: "url('/pattern.png')" }}>
      <h2 className='font-semibold text-3xl '>Workspace</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10'>

        {fileList?.length > 0 ? fileList.map((file) => (
          <Link key={file.fileId} href={'/workspace/' + file.fileId}>
            <div className='flex p-5 shadow-md rounded-md bg-white flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all hover:border-gray-400'>
              <img src={'/pdf.png'} alt='file' width={50} height={50} />
              <h2 className='mt-3 font-medium text-lg'>{file.fileName}</h2>
            </div>
          </Link>
        )) : [1, 2, 3, 4, 5].map((item, index) => (
          <div key={index} className='bg-slate-200 rounded-md h-[150px] animate-pulse'></div>
        ))}
      
      
      </div>
    </div>
  );
}

export default Dashboard;
