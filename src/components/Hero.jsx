import { motion } from "framer-motion";
import { profile } from "../content/portfolio.js";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-10 sm:pt-14">
      <motion.div
        className="glass-card hero-glass rounded-3xl p-6 sm:p-8"
        initial={{ opacity: 0, y: 10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="text-sm text-zinc-300/80">{profile.location}</p>

            <h1 className="mt-2 text-3xl sm:text-5xl font-semibold tracking-tight">
              {profile.title}
            </h1>

            <p className="mt-4 max-w-2xl text-base sm:text-lg text-zinc-200/85">
              {profile.blurb}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {profile.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-btn inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm text-zinc-100"
                >
                  {l.label}
                  <ArrowUpRight size={16} className="opacity-80" />
                </a>
              ))}
            </div>
          </div>

          {profile.schoolLogo ? (
  <div className="flex justify-center lg:justify-end">
    <div className="h-32 w-56 overflow-hidden rounded-3xl sm:h-40 sm:w-72 lg:h-48 lg:w-80">
      <img
        src={profile.schoolLogo}
        alt="Business school logo"
        className="h-full w-full object-contain"
      />
    </div>
  </div>
) : null}


        </div>
      </motion.div>
    </section>
  );
}
