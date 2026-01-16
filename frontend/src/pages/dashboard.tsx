import Navbar from "../layout/navbar";
import Sidebar from "../layout/sidebar";
import { Outlet } from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-slate-100 relative z-10">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
