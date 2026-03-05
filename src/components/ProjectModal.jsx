import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

function getYouTubeId(url) {
  if (!url) return null;
  const watch = url.match(/[?&]v=([^&]+)/);
  if (watch?.[1]) return watch[1];
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short?.[1]) return short[1];
  const embed = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embed?.[1]) return embed[1];
  return null;
}

function YouTubeEmbed({ url }) {
  const id = getYouTubeId(url);
  if (!id) return null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  const isPdf = project?.type === "pdf";
  const isVideo = project?.type === "video";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 p-4 sm:p-6 flex items-end sm:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-6xl rounded-3xl glass-modal overflow-hidden"
            initial={{ y: 18, scale: 0.985, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.985, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.9 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Wavy gradient layer */}
            <div className="pointer-events-none absolute inset-0">
              <motion.div
                className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl"
                animate={{ x: [0, 40, -10, 0], y: [0, 20, 55, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl"
                animate={{ x: [0, -30, 20, 0], y: [0, -20, -40, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-black/20" />
            </div>

            <div className="relative flex items-start justify-between gap-4 border-b border-white/10 p-4 sm:p-5">
              <div>
                <h3 className="text-lg font-semibold">{project.title}</h3>
                {project.summary ? <p className="mt-1 text-sm text-zinc-200/80">{project.summary}</p> : null}
              </div>
              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/15"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Two-column layout */}
<div className="relative grid lg:grid-cols-[340px_1fr]">
  {/* LEFT: full-height portrait panel */}
  <div className="relative border-r border-white/10 p-4 sm:p-5">
    <div className="h-[72vh] sm:h-[74vh] lg:h-[78vh]">
      <motion.div
        layoutId={`thumb-${project.id}`}
        className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5"
        initial={{ rotateY: 18, rotateZ: -2, x: -10 }}
        animate={{ rotateY: 0, rotateZ: 0, x: 0 }}
        exit={{ rotateY: 18, rotateZ: -2, x: -10 }}
        transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.9 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </motion.div>
    </div>
  </div>

  {/* RIGHT: media viewer + description */}
  <div className="p-4 sm:p-5 grid gap-4">
    {isPdf && project.pdf ? (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <iframe title="PDF viewer" src={project.pdf} className="h-[70vh] w-full" />
      </div>
    ) : null}

    {isVideo && project.video?.src ? (
      <video className="w-full rounded-2xl border border-white/10 bg-black" controls preload="metadata">
        <source src={project.video.src} />
      </video>
    ) : null}

    {isVideo && project.video?.youtube ? <YouTubeEmbed url={project.video.youtube} /> : null}

    {project.description ? (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm leading-relaxed text-zinc-100/90 whitespace-pre-wrap">
          {project.description}
        </p>
      </div>
    ) : null}
  </div>
</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
