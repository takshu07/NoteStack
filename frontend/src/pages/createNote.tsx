import { useEffect, useState } from "react";
import api from "../api/axios";
import RichTextEditor from "../components/textEditor";
const CreateNote: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [resetKey, setResetKey] = useState(0); // 🔑

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(""), 5000);
      return () => clearTimeout(t);
    }
  }, [success]);

  const handleCreate = async () => {
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
      });

      setSuccess("Note created successfully");

      // ✅ RESET FORM
      setTitle("");
      setContent("");
      setResetKey((k) => k + 1); // 🔥 clears TipTap editor
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to create note"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-4xl">
      <h2 className="text-xl font-semibold mb-4">
        Create New Note
      </h2>

      {success && (
        <p className="text-green-600 mb-2">{success}</p>
      )}
      {error && (
        <p className="text-red-500 mb-2">{error}</p>
      )}

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <RichTextEditor
        value={content}
        onChange={setContent}
        resetKey={resetKey} // 🔑 only here
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        {loading ? "Creating..." : "Create +"}
      </button>
    </div>
  );
};

export default CreateNote;
