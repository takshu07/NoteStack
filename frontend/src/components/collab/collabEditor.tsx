import { useEffect, useState } from "react";
import { socket } from "../../socket/socket";
import RichTextEditor from "../textEditor";

interface Props {
  collabId: string;
}

const CollabEditor = ({ collabId }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.emit("join-collab", { collabId });

    socket.on("init-collab", ({ title, content }) => {
      setTitle(title);
      setContent(content);
    });

    socket.on("collab-updated", ({ title, content }) => {
      setTitle(title);
      setContent(content);
    });

    return () => {
      socket.off("init-collab");
      socket.off("collab-updated");
    };
  }, [collabId]);

  const emitUpdate = (newTitle: string, newContent: string) => {
    socket.emit("collab-update", {
      collabId,
      title: newTitle,
      content: newContent,
    });
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    emitUpdate(newTitle, content);
  };

  const handleContentChange = (html: string) => {
    setContent(html);
    emitUpdate(title, html);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto h-full">
      <h2 className="text-xl font-semibold mb-4">
        Collaborative Note
      </h2>

      {/* TITLE */}
      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />

      {/* CONTENT */}
      <RichTextEditor
        value={content}
        onChange={handleContentChange}
      />
    </div>
  );
};

export default CollabEditor;
