import { UserButton } from '@clerk/nextjs'
import { ArrowLeft, Save } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'



function WorkspaceHeader({ fileName }) {
  return (
    <div className='p-4 flex justify-between shadow-md'>
      <Link href="/dashboard">
          <div className="flex items-center cursor-pointer ">
            <ArrowLeft className='size-8'/>
          </div>
        </Link>

      <div className='flex items-center'>
        <h2 className='font-medium  text-xl'>{fileName}</h2>
      </div>
      <UserButton />
    </div>
  )
}

export default WorkspaceHeader