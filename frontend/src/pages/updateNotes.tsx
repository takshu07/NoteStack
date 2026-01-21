import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import RichTextEditor from "../components/textEditor";
import type { Note } from "../types/note";

const UpdateNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= FETCH NOTE =================
  useEffect(() => {
    if (!id) {
      setError("Invalid note ID");
      setLoading(false);
      return;
    }

    const fetchNote = async () => {
      try {
        const res = await api.get<Note>(
          `/api/notes/getNotesById/${id}`,
          { withCredentials: true }
        );

        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        setError("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // ================= UPDATE NOTE =================
  const handleUpdate = async () => {
    if (!id) return;
  
    try {
      await api.put(
        `/api/notes/${id}`,
        { title, content },
        { withCredentials: true }
      );
  
      setSuccess("Note updated successfully");
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError("Failed to update note");
    }
  };
  

  // ================= UI STATES =================
  if (loading) {
    return <p className="text-gray-500">Loading note…</p>;
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded shadow max-w-4xl">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/notes")}
          className="mt-4 text-sm text-blue-600 underline"
        >
          Back to notes
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">
        Update Note
      </h2>

      {success && (
        <p className="text-green-600 mb-2">
          {success}
        </p>
      )}

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* resetKey guarantees editor refresh when ID changes */}
      <RichTextEditor
        value={content}
        onChange={setContent}
        resetKey={id}
      />

      <button
        onClick={handleUpdate}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Update Note
      </button>
    </div>
  );
};

export default UpdateNote;
