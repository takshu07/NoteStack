import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";

const Sidebar: React.FC = () => {
  const [privateOpen, setPrivateOpen] = useState(false);
  const [collabOpen, setCollabOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <aside
      className="
        fixed top-16 left-0 z-40
        w-64 h-[calc(100vh-4rem)]
        bg-white border-r border-gray-200
        p-4 overflow-y-auto
      "
    >
      {/* ================= PRIVATE NOTES ================= */}
      <div className="mb-6">
        <button
          onClick={() => setPrivateOpen((p) => !p)}
          className="
            w-full flex justify-between items-center
            px-3 py-2 rounded-md
            text-sm font-medium text-gray-900
            hover:bg-gray-100 transition
          "
        >
          <span>Private Notes</span>
          {privateOpen ? (
            <ChevronDown size={16} className="text-gray-500" />
          ) : (
            <ChevronRight size={16} className="text-gray-500" />
          )}
        </button>

        {privateOpen && (
          <div className="ml-4 mt-2 flex flex-col gap-1 text-sm">
            <button
              className="
                px-3 py-1.5 rounded-md text-left
                text-gray-700 hover:bg-gray-100 transition
              "
              onClick={() => navigate("/notes/create")}
            >
              New
            </button>

            <button
              className="
                px-3 py-1.5 rounded-md text-left
                text-gray-700 hover:bg-gray-100 transition
              "
              onClick={() => navigate("/notes")}
            >
              All Notes
            </button>
          </div>
        )}
      </div>

      {/* ================= COLLAB NOTES ================= */}
      <div>
        <button
          onClick={() => setCollabOpen((c) => !c)}
          className="
            w-full flex justify-between items-center
            px-3 py-2 rounded-md
            text-sm font-medium text-gray-900
            hover:bg-gray-100 transition
          "
        >
          <span>Collaboration</span>
          {collabOpen ? (
            <ChevronDown size={16} className="text-gray-500" />
          ) : (
            <ChevronRight size={16} className="text-gray-500" />
          )}
        </button>

        {collabOpen && (
          <div className="ml-4 mt-2 flex flex-col gap-1 text-sm">
            <button
              className="
                px-3 py-1.5 rounded-md text-left
                text-gray-700 hover:bg-gray-100 transition
              "
              onClick={() => navigate("/notes/collab/new")}
            >
              New Collab
            </button>

            <button
              className="
                px-3 py-1.5 rounded-md text-left
                text-gray-700 hover:bg-gray-100 transition
              "
              onClick={() => navigate("/notes/collab")}
            >
              All Collabs
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
