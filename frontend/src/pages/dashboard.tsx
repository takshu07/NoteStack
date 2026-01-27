import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GhostCursor from "../components/effects/ghostCursor";
import { Notebook, Users, CheckCircle2, Shield, Zap, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// Mock stats - in real app, fetch these
const STATS = [
  { label: "Total Notes", value: "12", icon: <Notebook size={20} className="text-teal-500" /> },
  { label: "Collaborations", value: "4", icon: <Users size={20} className="text-indigo-500" /> },
];

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
      <nav className="relative z-50 flex items-center justify-between h-20 px-8">
        <div className="flex items-center gap-3 select-none">
           <div className="p-2 bg-white/50 dark:bg-white/10 backdrop-blur rounded-xl border border-gray-200/50 dark:border-white/10 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-600 dark:text-teal-400"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" /></svg>
           </div>
           <span className="text-lg font-bold tracking-tight">NoteStack</span>
        </div>

        <div className="flex items-center gap-4">
             <button 
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                title="Toggle Theme"
             >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
             </button>
             
             <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-700"></div>

             <button onClick={() => navigate("/api/auth/login")} className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
                Sign In
             </button>
             <button onClick={() => navigate("/api/auth/register")} className="px-5 py-2 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5">
                Register
             </button>
        </div>
      </nav>

      {/* ===== HERO MAIN ===== */}
      <main className="relative z-10 px-6 pt-8 pb-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start">
         
         {/* LEFT TEXT */}
         <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-sm font-semibold mb-6 animate-fade-in-up">
                {greeting}, Creator
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 animate-fade-in-up">
               Capture ideas.<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-400">Collaborate</span> instantly.
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed mb-10 animate-fade-in-up delay-100">
                The minimal workspace for your thoughts, docs, and team.
                Free from distraction, full of focus.
            </p>

            {/* QUICK STATS */}
            <div className="mt-12 grid grid-cols-2 gap-4 max-w-md mx-auto md:mx-0 animate-fade-in-up delay-300">
               {STATS.map((stat, i) => (
                   <div key={i} className="p-4 rounded-2xl bg-white/60 dark:bg-gray-900/40 backdrop-blur-md border border-gray-100 dark:border-gray-800/50 hover:border-teal-500/30 transition-colors cursor-default text-left">
                      <div className="mb-2">{stat.icon}</div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-0.5">{stat.value}</div>
                      <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</div>
                   </div>
               ))}
            </div>
         </div>

         {/* RIGHT PREVIEW VISUAL */}
         <div className="flex-1 w-full max-w-xl animate-float">
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                 {/* Fake Window Header */}
                 <div className="h-8 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-400" />
                     <div className="w-3 h-3 rounded-full bg-amber-400" />
                     <div className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
                 {/* Fake Canvas */}
                 <div className="p-8 space-y-4 bg-white dark:bg-gray-950 min-h-[400px]">
                      <div className="h-8 w-3/4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
                      <div className="space-y-2">
                          <div className="h-4 w-full bg-gray-50 dark:bg-gray-900 rounded animate-pulse delay-75" />
                          <div className="h-4 w-5/6 bg-gray-50 dark:bg-gray-900 rounded animate-pulse delay-100" />
                          <div className="h-4 w-1/2 bg-gray-50 dark:bg-gray-900 rounded animate-pulse delay-150" />
                      </div>
                      
                      <div className="mt-8 p-4 rounded-xl border border-teal-500/20 bg-teal-50/50 dark:bg-teal-900/10">
                          <div className="flex items-center gap-3 mb-3">
                              <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold">JD</div>
                              <div className="text-xs text-teal-700 dark:text-teal-400 font-medium">John Doe is typing...</div>
                          </div>
                          <div className="h-4 w-2/3 bg-teal-100/50 dark:bg-teal-500/10 rounded" />
                      </div>
                 </div>
             </div>
         </div>
      </main>

      {/* ===== EX-ABOUT CONTENT ===== */}
      <section className="relative z-10 px-6 py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-800/50">
           <div className="max-w-3xl mx-auto text-center mb-16">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-6">
                    About The Project
                 </div>
                 <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                    Designed for Focus.<br/>
                    Built for <span className="text-teal-600 dark:text-teal-400">Teams.</span>
                 </h2>
                 <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                     NoteStack is an open-source collaboration platform that blends the simplicity of a notepad with the power of real-time teamwork. No distractions, just flow.
                 </p>
           </div>

           {/* FEATURE GRID */}
           <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
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
                <h3 className="text-2xl font-bold mb-4">Why NoteStack?</h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                    Created to solve the problem of bloated note-taking apps. 
                    We wanted something that starts instantly and just works.
                </p>
           </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 text-center text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-950/50">
          © {new Date().getFullYear()} NoteStack. All rights reserved.
      </footer>

    </div>
  );
};

// Helper
const FeatureCard = ({ icon, title, desc }: any) => (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-800 hover:border-teal-500/20 dark:hover:border-teal-500/20 shadow-sm hover:shadow-md transition-all">
        <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            {desc}
        </p>
    </div>
);

export default Dashboard;
