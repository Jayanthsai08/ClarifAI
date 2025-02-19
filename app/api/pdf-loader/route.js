import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter, SupportedTextSplitterLanguages } from "@langchain/textsplitters";

//const pdfUrl = "https://clean-goldfinch-147.convex.cloud/api/storage/dbc2e564-7066-4ed1-904b-40ec2fbecb93"
export async function GET(req) {
    
    //Load the PDF File
    const reqUrl=req.url;
    const {searchParams} = new URL(reqUrl);
    const pdfUrl = searchParams.get('pdfUrl');
    console.log(pdfUrl);
    const response = await fetch(pdfUrl);
    const data =  await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    let pdfTextContent = '';
    docs.forEach(doc=>{
        pdfTextContent=pdfTextContent+doc.pageContent;
    })

    //Splitting the Text into smaller chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
      });
      
    const output = await splitter.createDocuments([pdfTextContent]);

    let spitterList=[];
    output.forEach(doc=>{
        spitterList.push(doc.pageContent);
    })

    return NextResponse.json({result:spitterList})
    
}


