const Navbar = () => {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 z-50
        h-10
        px-6
        flex items-center justify-between
        bg-[#0b0d10]/70
        backdrop-blur-md
        border-b border-[#1f2430]
      "
    >
      {/* LEFT: Icon + Brand */}
      <div
        className="
          flex items-center gap-2
          select-none
          text-[#e6e8ec]
        "
      >
        {/* INLINE SVG ICON (inherits currentColor) */}
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
          aria-hidden="true"
        >
          <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
          <path d="M2 6h4" />
          <path d="M2 10h4" />
          <path d="M2 14h4" />
          <path d="M2 18h4" />
          <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
        </svg>

        {/* Brand name */}
        <span
          className="
            text-[13px]
            font-semibold
            tracking-wide
          "
        >
          NoteStack
        </span>
      </div>

      {/* RIGHT: User + Logout */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="
            w-7 h-7
            rounded-full
            border border-[#2a2f3a]
          "
        />

        {/* Logout */}
        <button
          onClick={handleLogout}
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
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
