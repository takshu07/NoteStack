import { useEffect, useRef, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { socket } from "../../socket/socket";
import { RichTextEditor, Toolbar } from "../textEditor";

import { useNavbar } from "../../context/NavbarContext";
import { useUnsavedChanges } from "../../hooks/useUnsavedChanges";

interface Props {
  collabId: string;
}

interface CollabPayload {
  title: string;
  content: string;
}

const CollabEditor = ({ collabId }: Props) => {
  const [title, setTitle] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]); // Track typing users
  
  const { setCenterContent } = useNavbar();
  const debounceRef = useRef<number | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  
  // Use hook for unsaved changes (basic dirty check on title/content)
  // Note: Collab is real-time, but user might want to manually "Save" to ensure database persistence
  useUnsavedChanges(isDirty);

  useEffect(() => {
    // Navbar Metadata (Collab doesn't have createdAt/updatedAt easily available in payload yet, showing static for now or can fetch)
    setCenterContent(
        <div className="flex flex-col items-center">
            <span className="text-xs text-teal-600 dark:text-teal-400 font-bold uppercase tracking-wider">Collab Mode</span>
        </div>
    );
     return () => setCenterContent(null);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextStyle,
      Color,
      FontFamily,
    ],
    content: "",
    onUpdate({ editor }) {
      setIsDirty(true);
      emitUpdate(title, editor.getHTML());
      
      // Emit typing event
      socket.emit("collab-typing", { collabId, userId: localStorage.getItem("userId") || "Anonymous" });
    },
  });

  useEffect(() => {
    if (!collabId || !editor) return;

    socket.emit("join-collab", { collabId });

    const handleInit = ({ title, content }: CollabPayload) => {
      setTitle(title);
      editor.commands.setContent(content || "", {
        emitUpdate: false,
      });
    };

    const handleUpdate = ({ title, content }: CollabPayload) => {
      setTitle(title);
      editor.commands.setContent(content || "", {
        emitUpdate: false,
      });
    };

    const handleTyping = ({ userId }: { userId: string }) => {
        // Simple typing indicator logic
        // If userId is me, ignore? (server should broadcast to others usually, but let's handle)
        const myId = localStorage.getItem("userId");
        if (userId === myId) return;
        
        setTypingUsers((prev) => {
            if (!prev.includes(userId)) return [...prev, userId];
            return prev;
        });

        // Clear after 3 seconds
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = window.setTimeout(() => {
             setTypingUsers([]);
        }, 2000);
    };

    socket.on("init-collab", handleInit);
    socket.on("collab-updated", handleUpdate);
    socket.on("collab-typing", handleTyping);

    return () => {
      socket.emit("leave-collab", { collabId });
      socket.off("init-collab", handleInit);
      socket.off("collab-updated", handleUpdate);
      socket.off("collab-typing", handleTyping);
    };
  }, [collabId, editor]);

  const emitUpdate = (nextTitle: string, nextContent: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      socket.emit("collab-update", {
        collabId,
        title: nextTitle,
        content: nextContent,
      });
    }, 300);
  };

  const handleSave = () => {
    socket.emit("collab-save", {
      collabId,
      title,
      content: editor?.getHTML() || "",
    });

    setIsDirty(false); 
    const time = new Date().toLocaleTimeString();
    setSaveMessage(`Saved at ${time}`);
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <div className="h-full w-full flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* TOOLBAR */}
      <div className="sticky top-0 z-20 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="flex items-center justify-between px-8 py-2">
          
           {/* Left side with Typing Indicator */}
          <div className="flex items-center gap-4">
               <Toolbar editor={editor} />
               {typingUsers.length > 0 && (
                   <span className="text-xs text-teal-600 dark:text-teal-400 animate-pulse font-medium">
                       User is typing...
                   </span>
               )}
          </div>

          <div className="flex items-center gap-4">
            {saveMessage && (
              <span className="text-xs text-teal-600 dark:text-teal-400">
                {saveMessage}
              </span>
            )}

            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-sm font-medium rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* TITLE */}
      <div className="px-8 pt-6 pb-2">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIsDirty(true);
            emitUpdate(e.target.value, editor?.getHTML() || "");
            socket.emit("collab-typing", { collabId, userId: localStorage.getItem("userId") });
          }}
          placeholder="Untitled note"
          className="w-full text-3xl font-semibold outline-none bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600 transition-colors"
        />
      </div>

      {/* EDITOR */}
      <div className="flex-1 overflow-y-auto px-8 pb-8 pt-2">
        <RichTextEditor editor={editor} />
      </div>
    </div>
  );
};

export default CollabEditor;
