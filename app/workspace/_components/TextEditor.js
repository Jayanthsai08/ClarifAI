import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import EditorExtension from './EditorExtension';
import { jsPDF } from 'jspdf';
import { MdOutlineFileDownload } from "react-icons/md";
import { Button } from '../../../components/ui/button';

function TextEditor({ fileId }) {
    const FontSize = TextStyle.extend({
        addAttributes() {
            return {
                fontSize: {
                    default: '16px',
                    parseHTML: (element) => element.style.fontSize || '16px',
                    renderHTML: (attributes) => ({
                        style: `font-size: ${attributes.fontSize}`,
                    }),
                },
            };
        },
    });

    // Get notes stored in DB
    const notes = useQuery(api.notes.GetNotes, { fileId });

    console.log(notes);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            FontSize,
            Highlight.configure({ multicolor: true }),
            Placeholder.configure({
                placeholder: 'Start taking your Notes here...',
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        editorProps: {
            attributes: {
                class: 'focus:outline-none w-full p-5',
            },
        },
    });

    useEffect(() => {
        if (editor && notes) {
            editor.commands.setContent(notes);
        }
    }, [notes, editor]);

    // Function to download notes as PDF
    const downloadPDF = () => {
        if (!editor) return;

        const doc = new jsPDF();
        const text = editor.getText(); // Extract text from editor
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10;
        const maxWidth = pageWidth - margin * 2;

        doc.setFontSize(14);
        doc.text(text, margin, 20, { maxWidth });

        doc.save('notes.pdf');
    };

    return (
        <div className="relative w-full h-screen flex flex-col bg-white">
            {/* Fixed Toolbar */}



            {/* Scrollable Editor */}
            <div className="flex-1 overflow-y-auto max-h-[97vh] border  shadow-sm p-4 bg-white hide-scrollbar">
                <div className="sticky top-0 bg-white z-10 shadow-md flex justify-between items-center p-2 mx-2 rounded-md mt-3">
                    <EditorExtension editor={editor} cla />
                    <button
                        className="ml-2 rounded-lg shadow-md p-2 flex bg-gray-100 hover:scale-105 transition-all outline-2 items-center border border-gray-300 hover:border-gray-500"
                        onClick={downloadPDF}  // Ensure downloadPDF is passed correctly
                    >
                        <MdOutlineFileDownload className="text-xl mr-2" />  {/* Adjust size here */}
                        <h2 className="font-medium text-sm">PDF</h2>
                    </button>

                </div>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default TextEditor;
