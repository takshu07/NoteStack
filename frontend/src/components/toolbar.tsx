import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
} from "lucide-react";

interface Props {
  editor: Editor | null;
}

const Toolbar = ({ editor }: Props) => {
  if (!editor) return null;

  const btn =
    "p-2 rounded-md hover:bg-teal-50 dark:hover:bg-teal-900/20 active:bg-teal-100 dark:active:bg-teal-900/40 transition text-gray-600 dark:text-gray-300 hover:text-teal-700 dark:hover:text-teal-400 flex items-center justify-center";

  const active = "bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400";

  return (
    <div className="flex flex-wrap items-center gap-2">
      
      {/* SIZE DROPDOWN */}
      <div className="relative">
         <select
            className="appearance-none bg-transparent hover:bg-teal-50 dark:hover:bg-teal-900/20 text-sm font-medium text-gray-700 dark:text-gray-300 py-1.5 pl-3 pr-8 rounded-md outline-none cursor-pointer transition border border-transparent hover:border-teal-100 dark:hover:border-teal-800"
            onChange={(e) => {
               const val = e.target.value;
               if (val === 'p') editor.chain().focus().setParagraph().run();
               else if (val === 'h1') editor.chain().focus().toggleHeading({ level: 1 }).run();
               else if (val === 'h2') editor.chain().focus().toggleHeading({ level: 2 }).run();
               else if (val === 'h3') editor.chain().focus().toggleHeading({ level: 3 }).run();
            }}
            value={
               editor.isActive('heading', { level: 1 }) ? 'h1' :
               editor.isActive('heading', { level: 2 }) ? 'h2' :
               editor.isActive('heading', { level: 3 }) ? 'h3' :
               'p'
            }
         >
            <option value="p">Normal</option>
            <option value="h1">Large Heading</option>
            <option value="h2">Medium Heading</option>
            <option value="h3">Small Heading</option>
         </select>
         {/* Chevron Icon overlay could go here, relying on browser default for now or add custom icon */}
      </div>

       <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

       {/* COLOR PICKER */}
       <div className="relative flex items-center">
          <input
             type="color"
             title="Text Color"
             className="w-8 h-8 p-1 rounded cursor-pointer bg-transparent border-none appearance-none"
             onInput={(e) => editor.chain().focus().setColor((e.target as HTMLInputElement).value).run()}
             value={editor.getAttributes('textStyle').color || '#000000'}
          />
       </div>

      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

      {/* TEXT FORMATTING */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btn} ${editor.isActive("bold") ? active : ""}`}
        title="Bold"
      >
        <Bold size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btn} ${editor.isActive("italic") ? active : ""}`}
        title="Italic"
      >
        <Italic size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${btn} ${editor.isActive("strike") ? active : ""}`}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </button>

      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

      {/* LISTS */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btn} ${editor.isActive("bulletList") ? active : ""}`}
        title="Bullet List"
      >
        <List size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${btn} ${editor.isActive("orderedList") ? active : ""}`}
        title="Ordered List"
      >
        <ListOrdered size={18} />
      </button>

      {/* BLOCKS */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${btn} ${editor.isActive("blockquote") ? active : ""}`}
        title="Blockquote"
      >
        <Quote size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${btn} ${editor.isActive("codeBlock") ? active : ""}`}
        title="Code Block"
      >
        <Code size={18} />
      </button>

      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1 ml-auto" />

      {/* HISTORY */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className={btn}
        title="Undo"
      >
        <Undo size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className={btn}
        title="Redo"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export default Toolbar;
