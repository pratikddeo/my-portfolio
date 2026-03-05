import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProjectCard from "./components/ProjectCard.jsx";
import ProjectModal from "./components/ProjectModal.jsx";
// import { ProjectModal } from "./components/ProjectModal.jsx";
import Footer from "./components/Footer.jsx";
import ExperienceCard from "./components/ExperienceCard.jsx";
import ExperienceModal from "./components/ExperienceModal.jsx";

import { projects, experiences, awards } from "./content/portfolio.js";
import AwardCard from "./components/AwardCard.jsx";
import AwardModal from "./components/AwardModal.jsx";


export default function App() {
  const ref = useRef(null);
  const [active, setActive] = useState(null);
  const bgUrl = `${import.meta.env.BASE_URL}media/images/wlp1.jpg`;
  const [expOpen, setExpOpen] = useState(false);
  const [activeAward, setActiveAward] = useState(null);



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
  <div ref={ref} className="min-h-screen glow" style={{ backgroundImage: `url(${bgUrl})` }} >
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 pb-16">
        <Hero />

        <section id="work" className="mt-10">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-xl font-semibold tracking-tight">Consulting and Marketing Projects</h2>
            <p className="text-sm text-zinc-400">Click a project to view PDFs/videos.</p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={() => setActive(p)} />
            ))}
          </div>
        </section>

        <section className="mt-14">
  <div className="flex items-end justify-between gap-6">
    <h2 className="text-xl font-semibold tracking-tight">Work experience</h2>
    <p className="text-sm text-zinc-400">Recent 4 • click to open roadmap</p>
  </div>

  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {experiences.slice(0, 4).map((e) => (
      <ExperienceCard key={e.id} exp={e} onOpen={() => setExpOpen(true)} />
    ))}
  </div>
</section>

<ExperienceModal
  open={expOpen}
  onClose={() => setExpOpen(false)}
  experiences={experiences}
/>

<section className="mt-14">
  <div className="flex items-end justify-between gap-6">
    <h2 className="text-xl font-semibold tracking-tight">Awards and achievements</h2>
    <p className="text-sm text-zinc-400">Certificates, letters and recognitions</p>
  </div>

  <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
    {awards.map((a) => (
      <AwardCard
        key={a.id}
        award={a}
        onOpen={() => setActiveAward(a)}
      />
    ))}
  </div>
</section>

<AwardModal award={activeAward} onClose={() => setActiveAward(null)} />

        <section id="contact" className="mt-14 rounded-2xl hero-glass border border-white/10 p-6">

  <div className="flex items-start justify-between gap-4">
    <h3 className="text-lg font-semibold">Contact</h3>

    <button
      type="button"
      className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-sm text-zinc-100 hover:bg-white/15"
      onClick={async () => {
        const text =
          "Email: pratik1307xy@gmail.com\n" +
          "Mobile: +33 0745755019\n" +
          "WhatsApp: +91 7358359203";
        await navigator.clipboard.writeText(text);
      }}
    >
      Copy all
    </button>
  </div>

  <div className="mt-4 grid gap-3 text-zinc-200/90">
    {[
      { label: "Email", value: "pratik1307xy@gmail.com" },
      { label: "Mobile", value: "+33 0745755019" },
      { label: "WhatsApp", value: "+91 7358359203" },
    ].map((item) => (
      <div
        key={item.label}
        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/10 backdrop-blur px-4 py-3"
      >
        <div className="text-sm">
          <span className="text-zinc-400">{item.label}:</span>{" "}
          <span className="text-zinc-100">{item.value}</span>
        </div>

        <button
          type="button"
          className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-zinc-100 hover:bg-white/15"
          onClick={async () => {
            await navigator.clipboard.writeText(item.value);
          }}
        >
          Copy
        </button>
      </div>
    ))}
  </div>
</section>

      </main>

      <Footer />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}
