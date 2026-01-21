const About: React.FC = () => {
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
      {/* CONTENT */}
      <main
        className="
          relative z-10
          max-w-5xl
          mx-auto
          px-6
          pt-24
          pb-20
        "
      >
        
        
        {/* Title */}
        <h1
          className="
            text-[36px] md:text-[44px]
            font-semibold
            tracking-tight
            text-[#f5f7fa]
          "
        >
          About NoteStack
        </h1>

        {/* Intro */}
        <p
          className="
            mt-6
            max-w-3xl
            text-[17px]
            leading-relaxed
            text-[#9aa0aa]
          "
        >
          NoteStack is a modern note-taking and collaboration platform designed
          for people who value clarity, focus, and real-time teamwork.
          It removes distractions and brings structure to the way ideas are
          captured, shared, and refined.
        </p>

        {/* Section: What is NoteStack */}
        <section className="mt-14">
          <h2
            className="
              text-[22px]
              font-semibold
              text-[#e6e8ec]
            "
          >
            What is NoteStack?
          </h2>

          <p
            className="
              mt-4
              max-w-3xl
              text-[16px]
              leading-relaxed
              text-[#9aa0aa]
            "
          >
            NoteStack is a clean, distraction-free workspace where you can write
            private notes, organize information, and collaborate with others in
            real time. It is built for students, developers, and teams who want
            speed, simplicity, and reliability without unnecessary complexity.
          </p>
        </section>

        {/* Section: Why it is useful */}
        <section className="mt-14">
          <h2
            className="
              text-[22px]
              font-semibold
              text-[#e6e8ec]
            "
          >
            Why is it useful?
          </h2>

          <ul
            className="
              mt-6
              space-y-4
              max-w-3xl
              text-[16px]
              text-[#9aa0aa]
            "
          >
            <li>• Write and manage notes in a focused, clutter-free interface</li>
            <li>• Collaborate with others in real time without friction</li>
            <li>• Keep personal and shared notes clearly separated</li>
            <li>• Access your work from anywhere, securely</li>
            <li>• Stay productive without being overwhelmed by features</li>
          </ul>
        </section>

        {/* Section: Why choose NoteStack */}
        <section className="mt-14">
          <h2
            className="
              text-[22px]
              font-semibold
              text-[#e6e8ec]
            "
          >
            Why choose NoteStack over other platforms?
          </h2>

          <p
            className="
              mt-4
              max-w-3xl
              text-[16px]
              leading-relaxed
              text-[#9aa0aa]
            "
          >
            Many note-taking tools try to do everything, which often results in
            cluttered interfaces and unnecessary complexity. NoteStack focuses
            on what truly matters — writing, organizing, and collaborating —
            while staying fast, minimal, and intuitive.
          </p>

          <p
            className="
              mt-4
              max-w-3xl
              text-[16px]
              leading-relaxed
              text-[#9aa0aa]
            "
          >
            Our platform is designed with a calm visual language, modern
            technology, and real-world workflows in mind. This makes NoteStack
            easier to adopt, easier to use long-term, and better suited for
            focused work compared to bloated alternatives.
          </p>
        </section>

        {/* Closing */}
        <section className="mt-16">
          <p
            className="
              max-w-3xl
              text-[16px]
              leading-relaxed
              text-[#9aa0aa]
            "
          >
            NoteStack is not just another notes app — it is a thoughtfully
            designed workspace for people who want to think clearly, collaborate
            efficiently, and stay in control of their ideas.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
