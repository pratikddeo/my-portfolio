import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function AwardModal({ award, onClose }) {
  useEffect(() => {
    if (!award) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [award, onClose]);

  return (
    <AnimatePresence>
      {award ? (
        <motion.div
          className="fixed inset-0 z-50 p-3 sm:p-5 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-[96vw] lg:max-w-[88vw] rounded-3xl glass-modal flex flex-col overflow-hidden"
            style={{ maxHeight: "calc(100dvh - 24px)" }}
            initial={{ y: 18, scale: 0.985, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.985, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.9 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-4 sm:p-5 shrink-0">
              <div>
                <h3 className="text-lg font-semibold">{award.title}</h3>
                <p className="mt-1 text-sm text-zinc-200/80">
                  {award.issuer} • {award.year}
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/15"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-5 grid gap-4 overflow-hidden flex-1 min-h-0">
              <p className="text-sm text-zinc-200/85">{award.description}</p>

              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/20 flex-1 min-h-[60vh]">
                <iframe
  src={`${award.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
  title={award.title}
  className="h-full w-full"
/>

              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
