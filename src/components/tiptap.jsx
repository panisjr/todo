// src/Tiptap.tsx
import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { useCallback } from "react";
import {
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify,
  FaRegImages,
} from "react-icons/fa";
import { useState } from "react";
const extensions = [
  StarterKit,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Image.configure({
    allowBase64: true,
  }),
];

const content = `<p>Hello World!</p>`;

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  const handleClick = useCallback(
    (action) => {
      if (!editor) return;
      action();
    },
    [editor]
  );

  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await fetch('http://localhost:3001/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResult(data.result);
    } catch (error) {
        console.error('Error:', error);
        setResult('An error occurred.');
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <div className="toolbar border-2 border-slate-50 gap-5 flex flex-row p-5 rounded-md">
        <div>
          <button
            onClick={() =>
              handleClick(() => editor.chain().focus().toggleBold().run())
            }
          >
            <strong>B</strong>
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleClick(() => editor.chain().focus().toggleItalic().run())
            }
          >
            <i>I</i>
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleClick(() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              )
            }
          >
            H1
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleClick(() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              )
            }
          >
            H2
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleClick(() =>
                editor.chain().focus().setTextAlign("left").run()
              )
            }
          >
            <FaAlignLeft />
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleClick(() =>
                editor.chain().focus().setTextAlign("center").run()
              )
            }
          >
            <FaAlignCenter />
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleClick(() =>
                editor.chain().focus().setTextAlign("right").run()
              )
            }
          >
            <FaAlignRight />
          </button>
        </div>
        <div>
          <button
            onClick={() =>
              handleClick(() =>
                editor.chain().focus().setTextAlign("justify").run()
              )
            }
          >
            <FaAlignJustify />
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              const url = prompt("Enter url ...");
              handleClick(() => {
                editor.chain().focus().setImage({ src: url }).run();
              });
            }}
          >
            <FaRegImages />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} />
      {editor && (
        <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      )}
      {editor && (
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
      )}
    </div>
  );
};

export default Tiptap;
