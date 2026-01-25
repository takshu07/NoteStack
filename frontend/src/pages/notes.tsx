import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Notes = () => {
  const location = useLocation();
  const isNewCollab = location.pathname === "/notes/collab/new";

  return (
    <div className="h-screen bg-white dark:bg-gray-950 overflow-hidden transition-colors duration-300">
      <Navbar />

      <div className="flex pt-16 h-screen">
        <Sidebar />

        <main
          className={`flex-1 ${
            isNewCollab
              ? "p-0 overflow-hidden"
              : "px-8 py-8 overflow-auto"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Notes;
