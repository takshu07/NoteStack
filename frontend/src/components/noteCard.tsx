import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import type { Note } from "../types/note";

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white p-4 rounded shadow cursor-pointer"
      onClick={() => navigate(`/notes/${note._id}`)} // ✅ FIX
    >
      <h3 className="text-lg font-semibold mb-2">
        {note.title}
      </h3>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(note.content),
        }}
      />
    </div>
  );
};

export default NoteCard;
