import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GhostCursor from "../components/effects/ghostCursor";
import { Users, CheckCircle2, Shield, Zap, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";



const Dashboard = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden font-sans transition-colors duration-300">
      
      {/* ===== BACKGROUND EFFECT ===== */}
      <div className="fixed inset-0 z-0 opacity-40 dark:opacity-30 pointer-events-none">
        <GhostCursor
          trailLength={120}
          color="#2a9d8f"
          brightness={1.5}
          bloomStrength={0.3}
        />
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="relative z-50 flex items-center justify-between h-16 sm:h-20 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 sm:gap-3 select-none">
           <div className="p-1.5 sm:p-2 bg-white/50 dark:bg-white/10 backdrop-blur rounded-lg sm:rounded-xl border border-gray-200/50 dark:border-white/10 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="sm:w-5 sm:h-5 text-teal-600 dark:text-teal-400"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /></svg>
           </div>
           <span className="text-base sm:text-lg font-bold tracking-tight">NoteStack</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
             <button 
                onClick={toggleTheme}
                className="p-1.5 sm:p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                title="Toggle Theme"
             >
                {theme === "light" ? <Moon size={18} className="sm:w-5 sm:h-5" /> : <Sun size={18} className="sm:w-5 sm:h-5" />}
             </button>
             
             <div className="hidden sm:block h-4 w-[1px] bg-gray-300 dark:bg-gray-700"></div>

             <button onClick={() => navigate("/api/auth/login")} className="text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
                Sign In
             </button>
             <button onClick={() => navigate("/api/auth/register")} className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-teal-600 text-white text-xs sm:text-sm font-semibold hover:bg-teal-700 shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5">
                Register
             </button>
        </div>
      </nav>

      {/* ===== HERO MAIN ===== */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-12 sm:pb-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start">
         
         {/* LEFT TEXT */}
         <div className="flex-1 text-center md:text-left w-full">
            <div className="inline-block px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 animate-fade-in-up">
                {greeting}, Creator
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] mb-4 sm:mb-6 animate-fade-in-up">
               Capture ideas.<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">Collaborate</span> instantly.
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed mb-6 sm:mb-10 animate-fade-in-up delay-100">
                The minimal workspace for your thoughts, docs, and team.
                Free from distraction, full of focus.
            </p>


         </div>

         {/* RIGHT PREVIEW VISUAL */}
         <div className="flex-1 w-full max-w-xl animate-float hidden md:block">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                 {/* Fake Window Header */}
                 <div className="h-6 sm:h-8 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-3 sm:px-4 gap-1.5 sm:gap-2">
                     <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400" />
                     <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400" />
                     <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400" />
                 </div>
                 {/* Fake Canvas */}
                 <div className="p-4 sm:p-6 lg:p-8 space-y-3 sm:space-y-4 bg-white dark:bg-gray-950 min-h-[300px] sm:min-h-[400px]">
                      <div className="h-6 sm:h-8 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                      <div className="space-y-2">
                          <div className="h-3 sm:h-4 w-full bg-gray-50 dark:bg-gray-900 rounded animate-pulse delay-75" />
                          <div className="h-3 sm:h-4 w-5/6 bg-gray-50 dark:bg-gray-900 rounded animate-pulse delay-100" />
                          <div className="h-3 sm:h-4 w-1/2 bg-gray-50 dark:bg-gray-900 rounded animate-pulse delay-150" />
                      </div>
                      
                      <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl border border-teal-500/20 bg-teal-50/50 dark:bg-teal-900/10">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px] sm:text-xs font-bold">JD</div>
                              <div className="text-[10px] sm:text-xs text-teal-700 dark:text-teal-400 font-medium">John Doe is typing...</div>
                          </div>
                          <div className="h-3 sm:h-4 w-2/3 bg-teal-100/50 dark:bg-teal-500/10 rounded" />
                      </div>
                 </div>
             </div>
         </div>
      </main>

      {/* ===== EX-ABOUT CONTENT ===== */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-800/50">
           <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">
                    About The Project
                 </div>
                 <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6">
                    Designed for Focus.<br/>
                    Built for <span className="text-teal-600 dark:text-teal-400">Teams.</span>
                 </h2>
                 <p className="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                     NoteStack is an open-source collaboration platform that blends the simplicity of a notepad with the power of real-time teamwork. No distractions, just flow.
                 </p>
           </div>

           {/* FEATURE GRID */}
           <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
                 <FeatureCard 
                    icon={<Zap className="text-amber-500" />}
                    title="Lightning Fast"
                    desc="Built with React & Vite for instant interactions. No loading spinners, no lag."
                 />
                 <FeatureCard 
                    icon={<Users className="text-teal-500" />}
                    title="Real-Time Collaboration"
                    desc="See who's typing, edit together, and never face synchronization conflicts."
                 />
                 <FeatureCard 
                    icon={<Shield className="text-indigo-500" />}
                    title="Secure & Private"
                    desc="Your notes are yours. We use JWT authentication and secure MongoDB storage."
                 />
                 <FeatureCard 
                    icon={<CheckCircle2 className="text-emerald-500" />}
                    title="Focus Mode"
                    desc="A minimal interface that disappears when you write, helping you stay in the zone."
                 />
           </div>

           {/* WHY QUOTE */}
           <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Why NoteStack?</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base lg:text-lg">
                    Created to solve the problem of bloated note-taking apps. 
                    We wanted something that starts instantly and just works.
                </p>
           </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-6 sm:py-8 text-center text-xs sm:text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-950/50">
          © {new Date().getFullYear()} NoteStack. All rights reserved.
      </footer>

    </div>
  );
};

// Helper
const FeatureCard = ({ icon, title, desc }: any) => (
    <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 hover:border-teal-500/20 dark:hover:border-teal-500/20 shadow-sm hover:shadow-md transition-all">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-3 sm:mb-4">
            {icon}
        </div>
        <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            {desc}
        </p>
    </div>
);

export default Dashboard;
