import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/userApi";
import { startCollab } from "../../api/collabApi";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
}

import { Search } from "lucide-react";  // Import Search Icon

const NewCollab = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search State
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then((res) => {
      const sorted = [...res.data].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
      );
      setUsers(sorted);
    });
  }, []);

  const handleUserClick = async (userId: string) => {
    const res = await startCollab(userId);
    navigate(`/notes/collab/${res.data._id}`);
  };

  const filteredUsers = users.filter((u) => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full w-full flex flex-col bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* HEADER */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800 px-8 py-6 transition-all">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Select Collaborator
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 mb-4">
          Start a new shared note with...
        </p>

        {/* SEARCH BAR */}
        <div className="relative max-w-md">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
           <input 
             type="text"
             placeholder="Search users..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="
               w-full pl-10 pr-4 py-2.5
               bg-gray-50 dark:bg-gray-900
               border border-gray-200 dark:border-gray-800
               rounded-lg
               text-sm text-gray-900 dark:text-gray-100
               focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500
               transition-all
             "
           />
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <li key={user._id}>
              <button
                onClick={() => handleUserClick(user._id)}
                className="
                  w-full flex items-center
                  p-4
                  rounded-2xl
                  border border-gray-100 dark:border-gray-800
                  hover:border-teal-200 dark:hover:border-teal-700
                  bg-white dark:bg-gray-900
                  hover:bg-teal-50/50 dark:hover:bg-teal-900/20
                  active:bg-teal-100 dark:active:bg-teal-900/30
                  transition-all duration-200
                  group
                "
              >
                {/* AVATAR */}
                <div
                  className="
                    mr-4 w-12 h-12
                    rounded-full
                    bg-teal-100 dark:bg-teal-900/50
                    text-teal-700 dark:text-teal-300
                    flex items-center justify-center
                    font-bold text-lg
                    group-hover:bg-teal-200 dark:group-hover:bg-teal-800
                    transition-colors
                  "
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>

                {/* NAME */}
                <div className="text-left">
                  <span className="block text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-teal-900 dark:group-hover:text-teal-100 transition-colors">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 group-hover:text-teal-600/70 dark:group-hover:text-teal-400/70">
                     Click to collaborate
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewCollab;
