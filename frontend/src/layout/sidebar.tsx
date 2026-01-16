import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const [privateOpen, setPrivateOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-slate-800 text-white h-[calc(100vh-4rem)] p-4 relative z-20">
      <div className="mb-4">
        <button
          onClick={() => setPrivateOpen(!privateOpen)}
          className="w-full flex justify-between items-center px-3 py-2 rounded hover:bg-slate-700"
        >
          <span>Private Notes</span>
          <span>{privateOpen ? "▼" : "▶"}</span>
        </button>

        {privateOpen && (
          <div className="ml-6 mt-2 flex flex-col gap-2 text-sm">
            <button
              className="text-left hover:text-white"
              onClick={() => navigate("/dashboard/create")}
            >
              New +
            </button>

            <button
              className="text-left hover:text-white"
              onClick={() => navigate("/dashboard/notes")}
            >
              Get All Notes
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
