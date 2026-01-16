const Navbar = () => {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <nav className="h-16 w-full bg-slate-900 text-white flex items-center justify-between px-6">
      {/* Left */}
      <h1 className="text-xl font-semibold tracking-wide">
        NoteStack
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-9 h-9 rounded-full border border-slate-600"
        />
        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-md bg-red-500 hover:bg-red-600 transition text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
