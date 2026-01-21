import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;

  /**
   * Used to re-initialize editor when route/entity changes
   * (e.g. switching between notes)
   */
  resetKey?: string | number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  resetKey,
}) => {
  const editor = useEditor(
    {
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
    },
    // 🔑 re-create editor ONLY when resetKey changes
    [resetKey]
  );

  // ✅ Sync editor if parent value changes (API fetch, socket, etc.)
 useEffect(() => {
  if (!editor) return;

  const current = editor.getHTML();
  if (value !== current) {
    editor.commands.setContent(value || "", {
      emitUpdate: false,
    });
  }
}, [value, editor]);


  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-md bg-white">
      <EditorContent
        editor={editor}
        className="p-4 min-h-[200px] outline-none"
      />
    </div>
  );
};

export default RichTextEditor;
