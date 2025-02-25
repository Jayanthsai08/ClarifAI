"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import TextEditor from '../_components/TextEditor';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

function Workspace() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, { fileId });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // `md` breakpoint (768px)
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("File Info Object:", fileInfo);
  }, [fileInfo]);

  console.log(fileInfo?.fileUrl);

  return (
    <div className="h-screen flex flex-col">
      <WorkspaceHeader fileName={fileInfo?.fileName} />

      {/* Panel Group - Responsive stacking */}
      <PanelGroup 
        direction={isMobile ? "vertical" : "horizontal"} 
        className="flex-1"
      >
        {/* Left Panel on Desktop (Text Editor) | Bottom Panel on Mobile */}
        <Panel defaultSize={50} minSize={20} className="bg-gray-100">
          <TextEditor fileId={fileId} />
        </Panel>

        {/* Resizable Handle */}
        <PanelResizeHandle 
          className={`${
            isMobile ? "h-2 cursor-row-resize" : "w-2 h-auto cursor-col-resize"
          } bg-gray-300 hover:bg-gray-500`}
        />

        {/* Right Panel on Desktop (PDF Viewer) | Top Panel on Mobile */}
        <Panel defaultSize={50} minSize={20} className="bg-white">
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default Workspace;
