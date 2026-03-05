import { profile } from "../content/portfolio.js";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#" className="font-semibold tracking-tight">
          {profile.name}
        </a>
        <nav className="flex items-center gap-4 text-sm text-zinc-300">
          <a className="hover:text-white" href="#work">Work</a>
          <a className="hover:text-white" href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
