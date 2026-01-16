import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import RichTextEditor from "../components/textEditor";
import type { Note } from "../types/note";

const UpdateNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      const res = await api.get<Note>(
        `/api/notes/getNotesById/${id}`
      );

      setTitle(res.data.title);
      setContent(res.data.content);
    };

    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    await api.put(`/api/notes/updateNoteById/${id}`, {
      title,
      content,
    });

    setSuccess("Note updated successfully");
    setTimeout(() => setSuccess(""), 4000);
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">
        Update Note
      </h2>

      {success && (
        <p className="text-green-600 mb-2">{success}</p>
      )}

      <input
        className="w-full border p-2 rounded mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <RichTextEditor
        value={content}
        onChange={setContent}
        // ❌ NO resetKey here
      />

      <button
        onClick={handleUpdate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Update Note
      </button>
    </div>
  );
};

export default UpdateNote;
