import { useState } from "react";

const Sidebar = () => {
  const [privateOpen, setPrivateOpen] = useState(false);
  const [collabOpen, setCollabOpen] = useState(false);

  return (
    <aside className="w-64 bg-slate-800 text-white h-[calc(100vh-4rem)] p-4">
      {/* PRIVATE NOTES */}
      <div className="mb-4">
        <button
          onClick={() => setPrivateOpen(!privateOpen)}
          className="w-full flex justify-between items-center px-3 py-2 rounded-md hover:bg-slate-700 transition"
        >
          <span className="font-medium">Private Notes</span>
          <span>{privateOpen ? "▼" : "▶"}</span>
        </button>

        {privateOpen && (
          <div className="ml-6 mt-2 flex flex-col gap-2 text-sm text-slate-300">
            <button className="hover:text-white">Daily Logs</button>
            <button className="hover:text-white">Ideas Vault</button>
            <button className="hover:text-white">Quick Drafts</button>
          </div>
        )}
      </div>

      {/* COLLAB */}
      <div>
        <button
          onClick={() => setCollabOpen(!collabOpen)}
          className="w-full flex justify-between items-center px-3 py-2 rounded-md hover:bg-slate-700 transition"
        >
          <span className="font-medium">Collab</span>
          <span>{collabOpen ? "▼" : "▶"}</span>
        </button>

        {collabOpen && (
          <div className="ml-6 mt-2 flex flex-col gap-2 text-sm text-slate-300">
            <button className="hover:text-white">Team Notes</button>
            <button className="hover:text-white">Shared Tasks</button>
            <button className="hover:text-white">Brainstorm</button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
