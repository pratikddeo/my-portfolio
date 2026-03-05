import { motion } from "framer-motion";
import { profile } from "../content/portfolio.js";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/10 bg-white/5 p-7"
      >
        <p className="text-sm text-zinc-400">{profile.location}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          {profile.title}
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-200">{profile.blurb}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          {profile.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-950/40 px-4 py-2 text-sm text-zinc-100 hover:bg-zinc-950"
            >
              {l.label} <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
