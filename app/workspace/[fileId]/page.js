"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import TextEditor from '../_components/TextEditor';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

function Workspace() {
const {fileId} = useParams();
const fileInfo=useQuery(api.fileStorage.GetFileRecord,{
fileId:fileId
})

useEffect(() => {
    console.log("File Info Object:", fileInfo); // Check full response
}, [fileInfo]);



console.log(fileInfo?.fileUrl);
  return (
    <div>
        <WorkspaceHeader fileName={fileInfo?.fileName}/>
        <PanelGroup direction="horizontal" className="h-screen">
            {/* Left Panel - Text Editor */}
            <Panel defaultSize={50} minSize={20} className=" bg-gray-100">
                <TextEditor fileId={fileId} />
            </Panel>

            {/* Resizable Handle */}
            <PanelResizeHandle className="w-2 bg-gray-300 hover:bg-gray-500 cursor-col-resize" />

            {/* Right Panel - PDF Viewer */}
            <Panel defaultSize={50} minSize={20} className=" bg-white">
                <PdfViewer fileUrl={fileInfo?.fileUrl} />
            </Panel>
        </PanelGroup>
    </div>
  )
}

export default Workspace
