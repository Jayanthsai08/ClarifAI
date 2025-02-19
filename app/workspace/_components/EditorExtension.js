import { useAction, useMutation } from 'convex/react';
import { Bold, Italic, Code, Underline, ArrowUp, ArrowDown, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Highlighter, Sparkles, Save, CodeSquareIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { chatSession } from '../../../configs/AIModel';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { IoMdCloudDownload } from "react-icons/io";

function EditorExtension({ editor }) {
  const { fileId } = useParams();
  const { user } = useUser();

  const SearchAI = useAction(api.myAction.search);
  const saveNotes = useMutation(api.notes.AddNotes);

  useEffect(() => {
    const interval = setInterval(() => {
      if (editor) {
        saveNotes({
          notes: editor.getHTML(),
          fileId: fileId,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        });
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [editor, saveNotes, fileId, user]);

  const onAiClick = async () => {
    toast("AI is Cooking 🕑...");
    const selectedText = editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to, ' ');
    console.log('Selected Text:', selectedText);

    const result = await SearchAI({
      query: selectedText,
      fileId: fileId,
    });

    const UnformattedAns = JSON.parse(result);
    let AllUnformattedAns = '';

    UnformattedAns &&
      UnformattedAns.forEach((item) => {
        AllUnformattedAns = AllUnformattedAns + item.pageContent;
      });

    console.log(AllUnformattedAns);
    const PROMPT =
      "For question :" +
      selectedText +
      " and with the given content as answer," +
      "please complete the unformatted answer and fix any sentence fragments and give an appropriate adequately detailed answer by consolidating all the ideas in HTML format. The answer content is:" +
      AllUnformattedAns +
      " Please note: just give the requested response and no other explanation.";

    const AiModelResult = await chatSession.sendMessage(PROMPT);
    console.log(AiModelResult.response.text());
    const FinalAns = AiModelResult.response.text().replace('```', '').replace('html', '').replace('```', '');

    const AllText = editor.getHTML();
    editor.commands.setContent(AllText + '<p> <strong> Answer: </strong> ' + FinalAns + '</p>');

    saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
  };

  const onSaveClick = async () => {
    toast("Saving notes...");
    await saveNotes({
      notes: editor.getHTML(),
      fileId: fileId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    toast.success("Notes saved successfully!");
  };

  return (
    editor && (
      <div >
        <div className="control-group">
          <div className="button-group flex gap-3 relative">
            <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'text-blue-500' : ''}>
              <Bold />
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'text-blue-500' : ''}>
              <Italic />
            </button>

            <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={editor.isActive('underline') ? 'text-blue-500' : ''}>
              <Underline />
            </button>

            {/* ✅ Font Size Increase & Decrease */}
            <button onClick={() => editor.chain().focus().setMark('textStyle', { fontSize: `${parseInt(editor.getAttributes('textStyle').fontSize || '16', 10) + 2}px` }).run()}>
              <ArrowUp />
            </button>
            <button onClick={() => editor.chain().focus().setMark('textStyle', { fontSize: `${Math.max(10, parseInt(editor.getAttributes('textStyle').fontSize || '16', 10) - 2)}px` }).run()}>
              <ArrowDown />
            </button>

            {/* ✅ Highlighter */}
            <button
              onClick={() => {
                if (editor.isActive('highlight')) {
                  editor.chain().focus().unsetMark('highlight').run();
                } else {
                  editor.chain().focus().setMark('highlight', { color: '#ffff00' }).run();
                }
              }}
              className={editor.isActive('highlight') ? 'text-blue-500' : ''}
            >
              <Highlighter />
            </button>

            {/* ✅ Ordered & Unordered Lists */}
            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'text-blue-500' : ''}>
              <List />
            </button>
            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'text-blue-500' : ''}>
              <ListOrdered />
            </button>

            {/* ✅ Text Alignment Options */}
            <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'text-blue-500' : ''}>
              <AlignLeft />
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'text-blue-500' : ''}>
              <AlignCenter />
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'text-blue-500' : ''}>
              <AlignRight />
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'text-blue-500' : ''}>
              <AlignJustify />
            </button>

            {/* ✅ Code Block Button */}
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`px-2 py-1 rounded ${editor.isActive('codeBlock') ? 'text-blue-500' : ''}`}
            >
              <CodeSquareIcon />
            </button>


            {/* AI Button */}
            <button onClick={onAiClick} className=" text-blue-500 hover:text-green-500">
              <Sparkles />
            </button>

            {/* Save Button */}
            <button onClick={onSaveClick} className="hover:text-green-500">
              <IoMdCloudDownload className='size-7 ml-1' />
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditorExtension;
