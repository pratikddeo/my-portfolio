import { motion } from "framer-motion";

export default function ExperienceCard({ exp, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className="glass-card group w-full text-left overflow-hidden rounded-3xl p-5"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <img src={exp.logo} alt={exp.company} className="h-full w-full object-contain p-2" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight">{exp.role}</p>
          <p className="text-xs text-zinc-300/80 truncate">{exp.company}</p>
        </div>
      </div>

      <div className="mt-4 text-xs text-zinc-300/80">
        <span>{exp.start} – {exp.end}</span>
        <span className="mx-2 opacity-50">•</span>
        <span>{exp.location}</span>
      </div>

      <p className="mt-3 text-sm text-zinc-200/85 line-clamp-3">
        {exp.description}
      </p>
    </motion.button>
  );
}


