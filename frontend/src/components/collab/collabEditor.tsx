import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import RichTextEditor from "../textEditor";

interface Props {
  collabId: string;
}

const CollabEditor = ({ collabId }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    socket.emit("join-collab", { collabId });

    const handleInit = ({ title, content }: any) => {
      setTitle(title);
      setContent(content);
    };

    const handleUpdate = ({ title, content }: any) => {
      setTitle(title);
      setContent(content);
    };

    const handleSaved = () => {
      const time = new Date().toLocaleTimeString();
      setSaveMessage(`Saved at ${time}`);

      setTimeout(() => {
        setSaveMessage("");
      }, 4000);
    };

    socket.on("init-collab", handleInit);
    socket.on("collab-updated", handleUpdate);
    socket.on("collab-saved", handleSaved);

    return () => {
      socket.off("init-collab", handleInit);
      socket.off("collab-updated", handleUpdate);
      socket.off("collab-saved", handleSaved);
    };
  }, [collabId]);

  const emitUpdate = (t: string, c: string) => {
    socket.emit("collab-update", {
      collabId,
      title: t,
      content: c,
    });
  };

  const handleSave = () => {
    console.log("SAVE CLICKED", { collabId, title, content });
    socket.emit("collab-save", {
      collabId,
      title,
      content,
    });
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-semibold">Collab Note</h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save
        </button>
      </div>

      {saveMessage && (
        <p className="text-green-600 text-sm mb-4">
          {saveMessage}
        </p>
      )}

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          emitUpdate(e.target.value, content);
        }}
      />

      <RichTextEditor
        value={content}
        onChange={(html) => {
          setContent(html);
          emitUpdate(title, html);
        }}
      />
    </div>
  );
};

export default CollabEditor;
