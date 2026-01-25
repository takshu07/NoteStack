import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import api from "../api/axios";
import { RichTextEditor, Toolbar } from "../components/textEditor";

import { useNavbar } from "../context/NavbarContext";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";

const CreateNote: React.FC = () => {
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();

  const { setCenterContent } = useNavbar();

  // ✅ SINGLE editor instance
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontFamily,
      Placeholder.configure({
        placeholder: "Write your note content here...",
      }),
    ],
    content: "",
    onUpdate: () => setIsDirty(true),
  });

  useUnsavedChanges(isDirty && !success);

  useEffect(() => {
    // Set static title or date for new note
    const dateStr = new Date().toLocaleString();
    setCenterContent(
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">New Note</span>
        <span className="text-[10px] text-gray-400 dark:text-gray-500">{dateStr}</span>
      </div>
    );
    return () => setCenterContent(null);
  }, []);

  useEffect(() => {
    if (success) {
      // Allow navigation after success message
    }
  }, [success]);

  const handleCreate = async () => {
    const content = editor?.getHTML() || "";

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.post("/api/notes/createNotes", {
        title,
        content,
      }).then((res) => {
         setSuccess("Note created successfully");
         setIsDirty(false); 
         setTimeout(() => {
            navigate(`/notes/${res.data._id}`, { state: { note: res.data } });
         }, 2000);
      });
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to create note"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* 🧰 TOOLBAR (STICKY) */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800 transition-all">
        <div className="flex items-center justify-between px-8 py-3">
          <Toolbar editor={editor} />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="
              px-5 py-2
              text-sm font-medium
              rounded-full
              bg-teal-600
              text-white
              hover:bg-teal-700
              active:bg-teal-800
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all shadow-sm hover:shadow-md
            "
          >
            {loading ? "Creating…" : "Create"}
          </button>
        </div>
      </div>

      {/* 📝 TITLE */}
      <div className="px-8 pt-8 pb-4 max-w-4xl mx-auto w-full">
        <input
          value={title}
          onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }}
          placeholder="Untitled note"
          className="
            w-full
            text-4xl font-bold text-gray-900 dark:text-gray-100
            outline-none
            placeholder-gray-300 dark:placeholder-gray-700
            bg-transparent
          "
        />
      </div>

      {/* ✍️ EDITOR */}
      <div className="flex-1 overflow-y-auto px-8 pb-12 w-full max-w-4xl mx-auto">
        <RichTextEditor editor={editor} />
      </div>

      {/* STATUS */}
      {success && (
        <div className="fixed bottom-6 right-6 px-4 py-2 bg-teal-600 text-white rounded-lg shadow-lg text-sm animate-fade-in">
          {success}
        </div>
      )}
      {error && (
        <div className="fixed bottom-6 right-6 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg text-sm animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
};

export default CreateNote;
