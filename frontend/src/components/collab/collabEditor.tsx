import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket/socket";
import RichTextEditor from "../textEditor";

interface Props {
  collabId: string;
}

interface CollabPayload {
  title: string;
  content: string;
}

const CollabEditor = ({ collabId }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  // ✅ Browser-safe timeout type
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!collabId) return;

    socket.emit("join-collab", { collabId });

    const handleInit = ({ title, content }: CollabPayload) => {
      setTitle(title);
      setContent(content);
    };

    const handleUpdate = ({ title, content }: CollabPayload) => {
      setTitle(title);
      setContent(content);
    };

    const handleSaved = () => {
      const time = new Date().toLocaleTimeString();
      setSaveMessage(`Saved at ${time}`);
      setTimeout(() => setSaveMessage(""), 4000);
    };

    socket.on("init-collab", handleInit);
    socket.on("collab-updated", handleUpdate);
    socket.on("collab-saved", handleSaved);

    return () => {
      socket.emit("leave-collab", { collabId });
      socket.off("init-collab", handleInit);
      socket.off("collab-updated", handleUpdate);
      socket.off("collab-saved", handleSaved);
    };
  }, [collabId]);

  const emitUpdate = (nextTitle: string, nextContent: string) => {
    if (!collabId) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

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
      content,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Collaborative Note
        </h2>

        <button
          onClick={handleSave}
          className="px-4 py-1.5 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Save
        </button>
      </div>

      {saveMessage && (
        <p className="text-green-600 text-sm mb-3">
          {saveMessage}
        </p>
      )}

      <input
        className="w-full border border-gray-300 p-2 rounded mb-4 outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          const value = e.target.value;
          setTitle(value);
          emitUpdate(value, content);
        }}
      />

      <div className="min-h-105">
  <RichTextEditor
    value={content}
    onChange={(html) => {
      setContent(html);
      emitUpdate(title, html);
    }}
  />
</div>

    </div>
  );
};

export default CollabEditor;
