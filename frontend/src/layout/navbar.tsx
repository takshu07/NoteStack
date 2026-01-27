import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import api from "../api/axios";

import { useNavbar } from "../context/NavbarContext";
import { useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../features/auth/authSlics";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { centerContent } = useNavbar();

  const handleLogout = async () => {
    try {
      await api.post(
        "/api/auth/logout",
        {},
        { withCredentials: true }
      );
    } catch {
      // ignore
    } finally {
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      dispatch(logout());
      navigate("/", { replace: true });
    }
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        h-16 px-6
        flex items-center justify-between
        glass-panel
        border-b-0
        transition-all duration-300
      "
    >
      {/* LEFT — ICON + BRAND */}
      <div className="flex items-center gap-3 select-none w-1/4">
        <div className="p-2 bg-teal-50 dark:bg-teal-900/20 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-teal-600 dark:text-teal-400"
          >
            <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
            <path d="M2 6h4" />
            <path d="M2 10h4" />
            <path d="M2 14h4" />
            <path d="M2 18h4" />
            <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
          </svg>
        </div>

        <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
          NoteStack
        </span>
      </div>

      {/* CENTER — DYNAMIC CONTENT */}
      <div className="flex-1 flex justify-center">
        {centerContent}
      </div>

      {/* RIGHT — THEME + AVATAR + LOGOUT */}
      <div className="flex items-center gap-4 w-1/4 justify-end">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="
            p-2.5 rounded-full
            text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-all duration-200
          "
          title="Toggle Theme"
        >
          {theme === "light" ? <Moon size={20} className="stroke-[1.5]" /> : <Sun size={20} className="stroke-[1.5]" />}
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 dark:bg-gray-800 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="User"
            className="
              w-9 h-9 rounded-full
              border-2 border-white dark:border-gray-800 shadow-sm
              hover:scale-105 transition-transform duration-200 cursor-pointer
            "
          />

          <button
            onClick={handleLogout}
            className="
              hidden md:block
              text-xs font-semibold
              px-4 py-2
              rounded-full
              text-gray-600 dark:text-gray-300
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-all duration-200
            "
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
