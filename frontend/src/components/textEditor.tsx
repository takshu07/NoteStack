import { EditorContent, Editor } from "@tiptap/react";

/* ================= EDITOR ================= */

export const RichTextEditor = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div 
      className="flex-1 flex flex-col h-full min-h-[50vh] cursor-text" 
      onClick={() => editor.chain().focus().run()}
    >
      <EditorContent
        editor={editor}
        className="
          flex-1
          outline-none
          prose prose-lg prose-teal dark:prose-invert
          max-w-none
          placeholder:text-gray-300 dark:placeholder:text-gray-700
          h-full
        "
      />
    </div>
  );
};

/* ================= TOOLBAR ================= */

export const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const btn =
    "px-2 py-1 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors";

  const active =
    "bg-[#e0f4f1] text-[#0f766e] dark:bg-teal-900/30 dark:text-teal-400";

  return (
    <div className="flex flex-wrap items-center gap-1">
      {/* HEADINGS */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${btn} ${editor.isActive("heading", { level: 1 }) ? active : ""}`}
      >
        H1
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${btn} ${editor.isActive("heading", { level: 2 }) ? active : ""}`}
      >
        H2
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${btn} ${editor.isActive("heading", { level: 3 }) ? active : ""}`}
      >
        H3
      </button>

      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

      {/* TEXT */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${btn} ${editor.isActive("bold") ? active : ""}`}
      >
        B
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${btn} ${editor.isActive("italic") ? active : ""}`}
      >
        I
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`${btn} ${editor.isActive("strike") ? active : ""}`}
      >
        S
      </button>

      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

      {/* LISTS */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${btn} ${editor.isActive("bulletList") ? active : ""}`}
      >
        • List
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${btn} ${editor.isActive("orderedList") ? active : ""}`}
      >
        1. List
      </button>

      <div className="w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

      {/* CODE */}
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${btn} ${editor.isActive("codeBlock") ? active : ""}`}
      >
        {"</>"}
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`${btn} ${editor.isActive("blockquote") ? active : ""}`}
      >
        “ ”
      </button>
    </div>
  );
};
