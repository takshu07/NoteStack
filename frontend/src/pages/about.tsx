import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Shield, Zap, Users } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 px-4 sm:px-6 glass-panel border-b-0 flex items-center justify-between backdrop-blur-md bg-white/70 dark:bg-gray-950/70 border-b border-gray-200/50 dark:border-gray-800/50">
         <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
            <button 
                onClick={() => navigate("/")}
                className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
            </button>
            <span className="text-sm sm:text-base font-bold tracking-tight">NoteStack</span>
         </div>
      </nav>

      {/* ===== HEADER ===== */}
      <main className="pt-20 sm:pt-24 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-4 sm:mb-6">
                About The Project
             </div>
             <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6">
                Designed for Focus.<br/>
                Built for <span className="text-teal-600 dark:text-teal-400">Teams.</span>
             </h1>
             <p className="text-sm sm:text-base lg:text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                 NoteStack is an open-source collaboration platform that blends the simplicity of a notepad with the power of real-time teamwork. No distractions, just flow.
             </p>
        </div>

        {/* ===== FEATURE GRID ===== */}
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

        {/* ===== TEAM / CREDITS ===== */}
        <div className="max-w-3xl mx-auto border-t border-gray-200 dark:border-gray-800 pt-8 sm:pt-12 text-center">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Why NoteStack?</h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                Created to solve the problem of bloated note-taking apps. 
                We wanted something that starts instantly and just works.
            </p>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="py-6 sm:py-8 text-center text-xs sm:text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800/50">
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

export default About;
