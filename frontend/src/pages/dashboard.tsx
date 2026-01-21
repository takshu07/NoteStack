import { useNavigate } from "react-router-dom";
import LandingBackground from "../components/effects/landingBackground";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        relative min-h-screen
        bg-[#0b0d10]
        text-[#f5f7fa]
        overflow-hidden
        font-sans
      "
    >
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <LandingBackground />
      </div>

      {/* ===== NAVBAR ===== */}
      <nav
        className="
          relative z-20
          flex items-center justify-between
          h-10 px-6
          bg-[#0b0d10]/70
          backdrop-blur-md
          border-b border-[#1f2430]
        "
      >
        {/* LEFT: SVG Icon + Brand */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer select-none text-[#e6e8ec]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
            <path d="M2 6h4" />
            <path d="M2 10h4" />
            <path d="M2 14h4" />
            <path d="M2 18h4" />
            <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
          </svg>

          <span className="text-[13px] font-semibold tracking-wide">
            NoteStack
          </span>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => navigate("/about")}
          className="
            text-[11px]
            px-3 py-1
            rounded
            border border-[#2a2f3a]
            text-[#b7bcc6]
            hover:text-white
            hover:border-[#3a4150]
            transition
          "
        >
          About
        </button>
      </nav>

      {/* ===== HERO ===== */}
      <main
        className="
          relative z-10
          flex flex-col items-center justify-center
          text-center
          px-6
          min-h-[calc(100vh-40px)]
        "
      >
        <h2 className="text-[42px] md:text-[56px] font-semibold leading-tight tracking-tight max-w-4xl">
          A Smarter Way to
          <br />
          Write & Collaborate on Notes
        </h2>

        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[#9aa0aa]">
          Whether you’re a student, developer, or team,
          NoteStack helps you organize thoughts and collaborate
          in real time with clarity and focus.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={() => navigate("/api/auth/register")}
            className="px-6 py-2.5 rounded-md bg-[#2563eb] text-white text-sm font-medium hover:bg-[#1e4fd8] transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/api/auth/login")}
            className="px-6 py-2.5 rounded-md text-sm font-medium text-[#c7cbd4] border border-[#2a2f3a] hover:text-white hover:border-[#3a4150] transition"
          >
            Login
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
