"use client"
import { Progress } from '../../../components/ui/progress'
import { Button } from '../../../components/ui/button'
import { CrownIcon, Layout, Shield } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import UploadPdfDialog from './UploadPdfDialog'
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


function SideBar() {

  const { user } = useUser();

  const path = usePathname();

  const GetUserInfo = useQuery(api.user.GetUserInfo, {
    userEmail: user?.primaryEmailAddress?.emailAddress
  })
  console.log(GetUserInfo);
  // Ensure user is fully loaded before calling useQuery
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const fileList = useQuery(api.fileStorage.GetUserFiles, userEmail ? { userEmail } : undefined);


  return (
    <div className='shadow-lg h-screen p-5'>
      <div className='flex items-center'>
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="ClarifAI Logo" width={120} height={150} />
        </Link>
      </div>

      <div className='mt-10'>

        <UploadPdfDialog isMaxFile={fileList?.length >= 5 && !GetUserInfo?.upgrade ? true : false}>

          <Button className='w-full'> + Upload PDF</Button>
        </UploadPdfDialog>
        <Link href={'/dashboard'}>
          <div className={`flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer
              ${path == '/dashboard' && 'bg-slate-200'}
              `}>
            <Layout />
            <h2>WorkSpace</h2>
          </div>
        </Link>
        <Link href={'/dashboard/upgrade'}>
          <div className={`flex gap-2 items-center p-3 mt-1 hover:bg-slate-100 rounded-lg cursor-pointer
               ${path == '/dashboard/upgrade' && 'bg-slate-200'}
              `}>

            <CrownIcon />
            <h2>Upgrade</h2>
          </div>
        </Link>
      </div>

      {!GetUserInfo?.upgrade &&
        <div className='absolute bottom-24 w-[80%]'>
          <Progress value={(fileList?.length / 5) * 100} />
          <p className='text-sm mt-1'>{fileList?.length} out of 5 PDFs Uploaded</p>

          <p className='text-sm text-gray-500 mt-2'>Upgrade to upload more PDF's</p>
        </div>
      }

      {GetUserInfo?.upgrade &&
        <p className='text-sm text-gray-500 lg:mt-[380px] md:mt-[290px]'>You now have Unlimited Uploads</p>
      }

    </div>
  )
}

export default SideBar