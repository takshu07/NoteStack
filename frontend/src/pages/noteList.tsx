import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import type { Note } from "../types/note";

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await api.get<Note[]>("/api/notes/getAllNotes");
        setNotes(res.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Failed to load notes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = async (
    e: React.MouseEvent,
    id: string
  ) => {
    e.stopPropagation(); // 🔑 prevent navigation

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`api/notes/deleteNoteById/${id}`);

      // ✅ Remove from UI immediately
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err: any) {
      alert(
        err?.response?.data?.message || "Failed to delete note"
      );
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <h2 className="text-xl font-semibold mb-4">
        Your Notes
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && notes.length === 0 && (
        <p className="text-gray-500">No notes found.</p>
      )}

      <ol className="list-decimal list-inside space-y-2">
        {notes.map((note) => (
          <li
            key={note._id}
            className="flex justify-between items-center cursor-pointer"
            onClick={() =>
              navigate(`/dashboard/notes/${note._id}`)
            }
          >
            <span className="text-blue-600 hover:underline">
              {note.title}
            </span>

            {/* DELETE BUTTON */}
            <button
              onClick={(e) => handleDelete(e, note._id)}
              className="ml-3 text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default NotesList;
