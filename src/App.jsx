import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
import Footer from "./components/Footer.jsx";
import { projects } from "./content/portfolio.js";

export default function App() {
  const ref = useRef(null);

  const [active, setActive] = useState(null);
  const [phase, setPhase] = useState("closed"); // closed | flip | open

  const openProject = (p) => {
    setActive(p);
    setPhase("flip");
    window.setTimeout(() => setPhase("open"), 260); // must match flip duration in modal
  };

  const closeProject = () => {
    setPhase("closed");
    window.setTimeout(() => setActive(null), 180);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--x", `${x}%`);
      el.style.setProperty("--y", `${y}%`);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className="min-h-screen glow">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 pb-16">
        <Hero />

        <section id="work" className="mt-10">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Consulting and Marketing Projects
            </h2>
            <p className="text-sm text-zinc-400">
              Click a project to view PDFs/videos.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onOpen={() => openProject(p)}
              />
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="mt-2 text-zinc-300">
            If you want the full portfolio pack (all PDFs/videos) as a zip, I
            can add a download page.
          </p>
        </section>
      </main>

      <Footer />

      <ProjectModal project={active} phase={phase} onClose={closeProject} />
    </div>
  );
}
