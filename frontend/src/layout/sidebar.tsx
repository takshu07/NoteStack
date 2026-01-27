import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { 
  FileText, 
  Search, 
  Users,
  Plus
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "User";
  const firstLetter = userName.charAt(0).toUpperCase();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchParams(val ? { q: val } : {});
  };

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="w-64 h-full flex flex-col bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 transition-colors duration-300">
      
      {/* Search Bar */}
      <div className="px-4 pt-6 pb-2">
         <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search notes..."
              value={query}
              onChange={handleSearch}
              className="
                w-full pl-9 pr-4 py-2 
                bg-white/50 dark:bg-gray-800/50 
                border border-gray-200/80 dark:border-gray-700/80
                rounded-lg 
                text-sm text-gray-700 dark:text-gray-200
                focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 
                focus:bg-white dark:focus:bg-gray-800
                transition-all duration-200
              "
            />
         </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        
        {/* GROUP 1: WORKSPACE */}
        <div>
           <div className="px-3 mb-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Workspace
           </div>
           <ul className="space-y-1">
             <li>
               <div
                 className={`
                   group w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer select-none
                   ${(isActive("/notes") && !location.pathname.includes("/notes/collab")) 
                      ? "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"}
                 `}
                 onClick={() => navigate("/notes")}
               >
                 <div className="flex items-center gap-3">
                    <FileText size={18} />
                    <span>My Notes</span>
                 </div>
                 <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate("/notes/create");
                    }} 
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-white/50 dark:hover:bg-gray-700/50 text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
                    title="New Note"
                 >
                    <Plus size={14} />
                 </button>
               </div>
             </li>
             <li>
               <div
                 className={`
                   group w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer select-none
                   ${isActive("/notes/collab") 
                      ? "bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"}
                 `}
                 onClick={() => navigate("/notes/collab")}
               >
                 <div className="flex items-center gap-3">
                    <Users size={18} />
                    <span>Collaboration</span>
                 </div>
                 <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate("/notes/collab/new");
                    }} 
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md hover:bg-white/50 dark:hover:bg-gray-700/50 text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-all"
                    title="New Collab"
                 >
                    <Plus size={14} />
                 </button>
               </div>
             </li>
           </ul>
        </div>
        
      </nav>

      {/* FOOTER AREA (Optional: User Profile or Settings link) */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
         <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 shadow-sm flex items-center justify-center text-white font-bold text-xs select-none">
              {firstLetter}
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">My Workspace</p>
               <p className="text-[10px] text-gray-500 truncate">Pro Plan</p>
            </div>
         </div>
      </div>

    </div>
  );
};
export default Sidebar;
