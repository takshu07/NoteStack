import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import api from "../api/axios";
import { RichTextEditor, Toolbar } from "../components/textEditor";
import type { Note } from "../types/note";

import { useNavbar } from "../context/NavbarContext";
import { useUnsavedChanges } from "../hooks/useUnsavedChanges";

const UpdateNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCenterContent } = useNavbar();

  const location = useLocation(); // Import useLocation
  const [title, setTitle] = useState("");
  const [initialContent, setInitialContent] = useState(""); // Track initial for comparison
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(!location.state?.note); // Skip loading if state exists
  const [isDirty, setIsDirty] = useState(false);

  // ✅ CORRECT editor config
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
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

  useUnsavedChanges(isDirty);

  useEffect(() => {
    // Clear navbar on unmount
    return () => setCenterContent(null);
  }, []);



  useEffect(() => {
    // PRE-FILL from navigation state (Seamless Transition)
    if (location.state?.note && editor && !title) {
       const note = location.state.note;
       setTitle(note.title);
       setInitialContent(note.content || "");
       editor.commands.setContent(note.content || "", { emitUpdate: false });
       
       const dateStr = new Date(note.updatedAt || note.createdAt || Date.now()).toLocaleString();
       setCenterContent(
        <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Last Edited</span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">{dateStr}</span>
        </div>
      );
    }
  }, [location.state, editor]);


  useEffect(() => {
  if (!id || !editor) return;

  const fetchNote = async () => {
    try {
      const res = await api.get<Note>(
        `/api/notes/getNotesById/${id}`,
        { withCredentials: true }
      );

      // Only update if differnt/newer (or if we didn't have state)
      if (!location.state?.note) {
          setTitle(res.data.title);
          setInitialContent(res.data.content || "");
          editor.commands.setContent(res.data.content || "", {
            emitUpdate: false,
          });
          
          // Update Navbar Metadata
          const dateStr = new Date(res.data.updatedAt || res.data.createdAt || Date.now()).toLocaleString();
          setCenterContent(
            <div className="flex flex-col items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Last Edited</span>
                <span className="text-[10px] text-gray-400 dark:text-gray-500">{dateStr}</span>
            </div>
          );
      }
    } catch {
      if (!location.state?.note) setError("Failed to load note");
    } finally {
      setLoading(false);
    }
  };

  fetchNote();
}, [id, editor]);

  const handleUpdate = async () => {
    if (!id || !editor) return;

    try {
      await api.put(
        `/api/notes/${id}`,
        {
          title,
          content: editor.getHTML(),
        },
        { withCredentials: true }
      );

      setSuccess("Note updated successfully");
      setIsDirty(false); // Reset dirty state
      setTimeout(() => setSuccess(""), 4000);
      
      // Update timestamp in Navbar
      const dateStr = new Date().toLocaleString();
      setCenterContent(
        <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">Last Edited</span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">{dateStr}</span>
        </div>
      );

    } catch {
      setError("Failed to update note");
    }
  };

  if (loading) return <p className="text-gray-500">Loading note…</p>;

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow max-w-4xl">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/notes")}
          className="mt-4 text-sm text-teal-600 underline"
        >
          Back to notes
        </button>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* TOOLBAR */}
      <div className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800 transition-all">
        <div className="flex items-center justify-between px-8 py-3">
          <Toolbar editor={editor} />

          <button
            onClick={handleUpdate}
            className="
              px-5 py-2 
              text-sm font-medium 
              rounded-full 
              bg-teal-600 
              text-white 
              hover:bg-teal-700 
              active:bg-teal-800
              transition-all shadow-sm hover:shadow-md
            "
          >
            Update
          </button>
        </div>
      </div>

      {/* TITLE */}
      <div className="px-8 pt-8 pb-4 max-w-4xl mx-auto w-full">
        <input
          value={title}
          onChange={(e) => { setTitle(e.target.value); setIsDirty(true); }}
          placeholder="Untitled note"
          className="
            w-full 
            text-4xl font-bold text-gray-900 dark:text-gray-100
            outline-none 
            bg-transparent
            placeholder-gray-300 dark:placeholder-gray-700
          "
        />
      </div>

      {/* EDITOR */}
      <div className="flex-1 overflow-y-auto px-8 pb-12 w-full max-w-4xl mx-auto">
        <RichTextEditor editor={editor} />
      </div>

      {success && (
        <div className="fixed bottom-6 right-6 px-4 py-2 bg-teal-600 text-white rounded-lg shadow-lg text-sm animate-fade-in">
          {success}
        </div>
      )}
    </div>
  );
};

export default UpdateNote;
