import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  resetKey?: number; // 🔑 important
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  resetKey,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextStyle,
      Color,
      FontFamily,
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // ✅ Sync editor when value changes (Update Note case)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  // ✅ Explicit reset only when resetKey changes (Create Note case)
  useEffect(() => {
    if (editor && resetKey !== undefined) {
      editor.commands.clearContent();
    }
  }, [resetKey, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-md bg-white">
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px]"
      />
    </div>
  );
};

export default RichTextEditor;
