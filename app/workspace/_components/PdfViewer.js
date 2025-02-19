import React from 'react'

function PdfViewer({ fileUrl }) {
  console.log(fileUrl);
  return (
    <div>
      <iframe src={fileUrl + "#toolbar=0"} height="97vh" width='100%' className='h-[97vh]' />
    </div>
  )
}

export default PdfViewer