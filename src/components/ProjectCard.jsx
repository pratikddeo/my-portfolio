import { motion } from "framer-motion";

export default function ProjectCard({ project, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className="glass-card group w-full text-left overflow-hidden rounded-3xl"
    >
      {/* Card thumbnail area (still looks landscape in the card) */}
<div className="h-44 w-full bg-white/5 sm:h-48">
  <motion.div layoutId={`thumb-${project.id}`} className="h-full w-full">
    {project.thumbnail ? (
      <img
        src={project.thumbnail}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
    ) : null}
  </motion.div>
</div>


      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug">{project.title}</h3>
          {project.year ? <span className="text-xs text-zinc-300/80">{project.year}</span> : null}
        </div>
        {project.summary ? (
          <p className="mt-2 text-sm text-zinc-200/85 line-clamp-3">{project.summary}</p>
        ) : null}
      </div>
    </motion.button>
  );
}
