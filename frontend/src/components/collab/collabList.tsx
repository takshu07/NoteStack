import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMyCollabs, deleteCollab } from "../../api/collabApi";

interface User {
  _id: string;
  name: string;
}

interface Collab {
  _id: string;
  title: string;
  users: User[];
}

const CollabList: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [collabs, setCollabs] = useState<Collab[]>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const myUserId = localStorage.getItem("userId");

  useEffect(() => {
    getMyCollabs().then((res) => setCollabs(res.data));
  }, []);

  const filtered = collabs.filter((c) =>
    c.title?.toLowerCase().includes(query)
  );

  return (
    <div className={`h-full w-full flex flex-col overflow-hidden ${compact ? "bg-transparent" : "bg-white dark:bg-gray-950"}`}>
      {!compact && (
        <div className="shrink-0 px-8 py-6 mb-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
            Collaboration
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium">
             {filtered.length} shared {filtered.length === 1 ? 'note' : 'notes'}
          </p>
        </div>
      )}

      <div className={`flex-1 overflow-y-auto ${compact ? "px-2 pt-2 scrollbar-thin" : "px-8 py-4"}`}>
         {compact ? (
             // COMPACT SIDEBAR LIST
             <ul className="space-y-1">
             {filtered.length === 0 && (
                <li className="px-3 py-4 text-xs text-gray-400 italic text-center">No collabs found</li>
             )}
              {filtered.map((collab) => (
                <li
                  key={collab._id}
                  onClick={() => navigate(`/notes/collab/${collab._id}`)}
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
                  <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 overflow-hidden">
                         <div className="w-1.5 h-1.5 rounded-full bg-teal-200 group-hover:bg-teal-500 transition-colors" />
                         <span className="font-medium truncate text-xs opacity-90 group-hover:opacity-100">
                          {collab.title || "Untitled"}
                        </span>
                      </div>
                      <p className="pl-4.5 text-[10px] text-gray-400 truncate">
                        {collab.users.length} members
                      </p>
                  </div>
                  
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteCollab(collab._id); setCollabs(p => p.filter(c => c._id !== collab._id)); }}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                    title="Delete"
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </li>
              ))}
            </ul>
         ) : (
            // MAIN GRID
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {filtered.map((collab) => {
                 const otherUsers = collab.users.filter(u => u._id !== myUserId);
                 
                 return (
                <div
                  key={collab._id}
                  onClick={() => navigate(`/notes/collab/${collab._id}`)}
                  className="
                    group relative flex flex-col justify-between
                    bg-white dark:bg-gray-900
                    border border-gray-200 dark:border-gray-800
                    rounded-xl p-5
                    cursor-pointer
                    hover:border-teal-500/30 hover:shadow-lg hover:-translate-y-1
                    transition-all duration-300
                    min-h-[180px]
                  "
                >
                  <div>
                      <div className="flex justify-between items-start mb-2">
                         <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate pr-8 leading-tight">
                            {collab.title || "Untitled Collab"}
                        </h3>
                         <span className="shrink-0 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-[10px] uppercase font-bold px-2 py-1 rounded">
                             Active
                         </span>
                      </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5em]">
                        Collaborating with {otherUsers.length > 0 ? `${otherUsers.length} others` : "yourself"}
                    </p>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Shared with:</span>
                        <div className="flex -space-x-2 overflow-hidden">
                            {otherUsers.length === 0 ? (
                                <span className="text-xs text-gray-400 italic ml-1">Just you</span>
                            ) : (
                                otherUsers.slice(0, 5).map((u, i) => (
                                    <div 
                                        key={u._id || i} 
                                        className="h-7 w-7 rounded-full ring-2 ring-white dark:ring-gray-900 bg-gradient-to-br from-teal-400 to-emerald-400 flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                                        title={u.name}
                                    >
                                        {u.name?.charAt(0).toUpperCase() || "?"}
                                    </div>
                                ))
                            )}
                            {otherUsers.length > 5 && (
                                <div className="h-7 w-7 rounded-full ring-2 ring-white dark:ring-gray-900 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                    +{otherUsers.length - 5}
                                </div>
                            )}
                        </div>
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-gray-100 dark:border-gray-800 pt-3 mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if(window.confirm("Are you sure you want to delete this collaboration?")) {
                              deleteCollab(collab._id);
                              setCollabs((p) => p.filter((c) => c._id !== collab._id));
                          }
                        }}
                        className="
                           flex items-center gap-1.5
                           text-xs font-medium text-red-400 hover:text-red-500
                           transition-colors
                           px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/10
                        "
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                         Delete
                      </button>
                  </div>
                </div>
               );
               })}
            </div>
         )}
      </div>
    </div>
  );
};

export default CollabList;
