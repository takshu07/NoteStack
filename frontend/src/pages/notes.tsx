import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import { Outlet } from "react-router-dom";

const Notes = () => {
  return (
    <div className="min-h-screen bg-[#0b0d10]">
      {/* NAVBAR */}
      <Navbar />

      <div className="flex">
        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN CONTENT */}
        <main className="flex-1 ml-64 pt-16 px-8 pb-10">
          {/* LIGHT CONTENT SURFACE */}
          <div
            className="
              mx-auto
              max-w-5xl
              bg-white
              text-gray-900
              rounded-2xl
              shadow-xl
              p-8
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notes;
