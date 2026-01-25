import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import type { Note } from "../types/note";

const NotesList: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  useEffect(() => {
    api
      .get<Note[]>("/api/notes/getAllNotes", {
        withCredentials: true,
      })
      .then((res) => setNotes(res.data));
  }, []);

  const handleDelete = async (
    e: React.MouseEvent,
    id: string
  ) => {
    e.stopPropagation();
    if (!window.confirm("Delete this note?")) return;

    await api.delete(`/api/notes/deleteNoteById/${id}`, {
      withCredentials: true,
    });

    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(query)
  );


  return (
    // ✅ FULL HEIGHT CONTAINER — REQUIRED
    <div className={`h-full w-full flex flex-col overflow-hidden ${compact ? "bg-transparent" : "bg-white dark:bg-gray-950"}`}>
      
      {/* ✅ STATIC HEADER — COMPACT, NO GAP */}
      {!compact && (
        <div className="shrink-0 px-8 py-6 mb-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
            My Notes
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium">
             {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'} found
          </p>
        </div>
      )}

      {/* ✅ LIST SCROLLS */}
      <div className={`flex-1 overflow-y-auto ${compact ? "px-2 pt-2 scrollbar-thin" : "px-8 pb-8" }`}>
        {compact ? (
             // COMPACT SIDEBAR LIST
             <ul className="space-y-1">
             {filteredNotes.length === 0 && (
                <li className="px-3 py-4 text-xs text-gray-400 italic text-center">No notes found</li>
             )}
              {filteredNotes.map((note) => (
                <li
                  key={note._id}
                  onClick={() => navigate(`/notes/${note._id}`)}
                  className="
                    group flex items-center justify-between
                    px-3 py-2.5
                    rounded-lg
                    cursor-pointer
                    text-sm text-gray-700 dark:text-gray-300
                    hover:bg-white dark:hover:bg-gray-800
                    hover:text-gray-900 dark:hover:text-gray-100
                    hover:shadow-sm hover:border-gray-200/50 dark:hover:border-gray-700/50
                    border border-transparent
                    transition-all duration-200
                  "
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                     <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-teal-500 transition-colors" />
                     <span className="font-medium truncate text-xs opacity-90 group-hover:opacity-100">
                      {note.title || "Untitled"}
                    </span>
                  </div>
                  
                  {/* Delete Icon (Hover only) */}
                  <button
                    onClick={(e) => handleDelete(e, note._id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                    title="Delete"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </li>
              ))}
            </ul>
        ) : (
            // MAIN PAGE GRID/LIST
            <div className="grid grid-cols-1 gap-4 max-w-5xl mx-auto">
              {filteredNotes.length === 0 && (
                 <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
                    </div>
                    <p className="text-lg font-medium text-gray-500">No notes found</p>
                    {query && <p className="text-sm">matching "{query}"</p>}
                    <button onClick={() => navigate('/notes/create')} className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-full text-sm font-medium hover:bg-teal-700 transition-colors shadow-sm cursor-pointer">Start a new note</button>
                 </div>
              )}
              {filteredNotes.map((note) => (
                <div
                  key={note._id}
                  onClick={() => navigate(`/notes/${note._id}`)}
                  className="
                    group relative
                    bg-white dark:bg-gray-900
                    border border-gray-100 dark:border-gray-800
                    rounded-2xl p-6
                    cursor-pointer
                    hover:border-teal-500/20 dark:hover:border-teal-900/50
                    hover:shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] dark:hover:shadow-none
                    hover:-translate-y-[2px]
                    transition-all duration-300 ease-out
                  "
                >
                  <div className="flex justify-between items-start gap-4">
                      {/* Left Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate mb-1.5 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                            {note.title || "Untitled Note"}
                        </h3>
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-2 h-10 mb-4 font-normal">
                             {note.content.replace(/<[^>]+>/g, '') || "No additional text"}
                        </p>
                         
                         <div className="flex items-center gap-3">
                             <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                                {new Date(note.updatedAt || note.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                             </span>
                             {/* Optional Divider or extra meta info could go here */}
                         </div>
                      </div>

                      {/* Right Action */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                            onClick={(e) => handleDelete(e, note._id)}
                            className="
                                opacity-0 group-hover:opacity-100
                                p-2 rounded-lg
                                text-gray-300 hover:text-red-500
                                hover:bg-red-50 dark:hover:bg-red-900/10
                                transform translate-x-2 group-hover:translate-x-0
                                transition-all duration-200
                            "
                            title="Delete note"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      </div>
                  </div>
                </div>
              ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default NotesList;
