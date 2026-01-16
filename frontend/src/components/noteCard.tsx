import DOMPurify from "dompurify";

interface NoteCardProps {
  note: {
    _id: string;
    title: string;
    content: string;
  };
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
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
