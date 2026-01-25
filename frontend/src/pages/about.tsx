import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Shield, Zap, Users } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-6 glass-panel border-b-0 flex items-center justify-between backdrop-blur-md bg-white/70 dark:bg-gray-950/70 border-b border-gray-200/50 dark:border-gray-800/50">
         <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
            <button 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
                <ArrowLeft size={16} />
                Back to Home
            </button>
            <span className="font-bold tracking-tight">NoteStack</span>
         </div>
      </nav>

      {/* ===== HEADER ===== */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-6">
                About The Project
             </div>
             <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Designed for Focus.<br/>
                Built for <span className="text-teal-600 dark:text-teal-400">Teams.</span>
             </h1>
             <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                 NoteStack is an open-source collaboration platform that blends the simplicity of a notepad with the power of real-time teamwork. No distractions, just flow.
             </p>
        </div>

        {/* ===== FEATURE GRID ===== */}
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

        {/* ===== TEAM / CREDITS ===== */}
        <div className="max-w-3xl mx-auto border-t border-gray-200 dark:border-gray-800 pt-12 text-center">
            <h2 className="text-xl font-bold mb-4">Why NoteStack?</h2>
            <p className="text-gray-500 dark:text-gray-400">
                Created to solve the problem of bloated note-taking apps. 
                We wanted something that starts instantly and just works.
            </p>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800/50">
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

export default About;
