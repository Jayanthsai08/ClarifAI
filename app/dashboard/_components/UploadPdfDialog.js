"use client"
import React, { useState } from 'react'
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle,
    DialogTrigger,
} from "../../../components/ui/dialog"
import { Loader2Icon } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { toast } from 'sonner'

function UploadPdfDialog({ children, isMaxFile }) {

    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
    const {user}=useUser();
    const getFileUrl=useMutation(api.fileStorage.getFileUrl)
    const [file, setFile] = useState();
    const [fileName,setFileName]=useState();
    const embeddDocument = useAction(api.myAction.ingest)
    const [loading, setLoading] = useState(false)
    const [open,setOpen]=useState(false)

    const OnFileSelect = (event) => {
        setFile(event.target.files[0]);
    }

    const OnUpload = async() =>{
        setLoading(true);

        // Getting a short-lived upload URL
         const postUrl = await generateUploadUrl();

        // POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type},
            body: file,
          });
          const { storageId } = await result.json();
          console.log('StorageId',storageId);
          const fileId=uuid4();
          const fileUrl= await getFileUrl({storageId:storageId})

          const resp=await addFileEntry({
            fileId:fileId,
            storageId:storageId,
            fileName:fileName??'Untitled File',
            fileUrl:fileUrl,
            createdBy:user?.primaryEmailAddress?.emailAddress
          })

        //console.log(resp) 

        //Api call to l to fectch PDF processed data
        const ApiResp = await axios.get('/api/pdf-loader?pdfUrl='+fileUrl)
        console.log(ApiResp.data.result);
        await embeddDocument({
            splitText:ApiResp.data.result,
            fileId:fileId
        });
        //console.log(embeddedResult); 
        setLoading(false);
        setOpen(false);

        toast("File is Ready!");
    }

    return (
        <Dialog open={open}>
            <DialogTrigger asChild>
                <Button onClick={()=>setOpen(true)} disabled={isMaxFile} className='w-full'>+ Upload PDF File</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload PDF File</DialogTitle>
                    <DialogDescription asChild>
                        <div className='p-3 '>
                            <h2 className='text-black mb-1'>Select a file to Upload:</h2>
                            <div className="flex flex-col gap-3 rounded-md border border-slate-250 p-4 ">

                                <input type='file' accept='application/pdf'
                                    onChange={(event) => OnFileSelect(event)}
                                />
                            </div>
                            <div className='mt-3'>
                                <label className='text-black'>File Name :</label>
                                <Input placeholder="ex. My Notes" className='mt-1' onChange={(e)=>setFileName(e.target.value)}/>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <div className='flex gap-3 ml-4 justify-end'>
                    <Button onClick={OnUpload} disabled={loading    }>
                        {loading ?
                            <Loader2Icon className='animate-spin' /> :
                            'Upload'
                        }</Button>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary " onClick={() => setOpen(false)}>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default UploadPdfDialog