import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { trackEvent } from "../lib/analytics";

function LogoCarousel({ experiences }) {
  return (
    <div className="overflow-x-auto no-scrollbar">
      <div className="flex gap-3 snap-x snap-mandatory">
        {experiences.map((e) => (
          <div
            key={e.id}
            className="snap-start shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            style={{ minWidth: 160 }}
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                <img
                  src={e.logo}
                  alt={e.company}
                  className="h-full w-full object-contain"
                  draggable={false}
                />
              </div>
              <div className="text-sm text-zinc-100/90">{e.company}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceRoadmapCard({ e, logoH = 92 }) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-white/10">
      <div
        className="relative border-b border-white/10 bg-white/5"
        style={{ height: logoH }}
      >
        <img
          src={e.logo}
          alt={e.company}
          className="absolute inset-0 h-full w-full object-contain"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/35" />
      </div>

      <div className="p-5">
        <p className="text-base font-semibold leading-tight">{e.role}</p>
        <p className="text-sm text-zinc-300/80 truncate">{e.company}</p>

        <p className="mt-2 text-sm text-zinc-300/80">
          {e.start} – {e.end} • {e.location}
        </p>

        <p className="mt-3 text-sm text-zinc-200/85 whitespace-pre-wrap leading-relaxed">
          {e.description}
        </p>
      </div>
    </div>
  );
}

function Roadmap({ experiences, scrollRootRef }) {
  const W = 1400;

  const TOP = 70;
  const BOTTOM = 100;

  const MIN_ROW = 220;
  const ROW_GAP = 52;

  const SIDE_PAD = 110;
  const CARD_W = "clamp(340px, 40vw, 620px)";
  const LOGO_H = 92;

  const cardRefs = useRef([]);
  const [heights, setHeights] = useState([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, experiences.length);
  }, [experiences.length]);

  useLayoutEffect(() => {
    const measure = () => {
      const hs = cardRefs.current.map((el) => (el ? el.offsetHeight : 0));
      setHeights(hs);
    };

    measure();
    const t = window.setTimeout(measure, 120);

    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [experiences.length]);

  useEffect(() => {
    const rootEl = scrollRootRef?.current;
    if (!rootEl) return;

    const seen = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-exp-id");
          const company = entry.target.getAttribute("data-exp-company");
          const role = entry.target.getAttribute("data-exp-role");

          if (entry.isIntersecting && id && !seen.has(id)) {
            seen.add(id);
            trackEvent("view_experience_card", {
              experience_id: id,
              company,
              role,
            });
          }
        });
      },
      {
        root: rootEl,
        threshold: 0.45,
      }
    );

    cardRefs.current.forEach((el, i) => {
      const exp = experiences[i];
      if (!el || !exp) return;

      el.setAttribute("data-exp-id", exp.id);
      el.setAttribute("data-exp-company", exp.company);
      el.setAttribute("data-exp-role", exp.role);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [experiences, heights, scrollRootRef]);

  const ys = useMemo(() => {
    const out = [];
    let y = TOP;

    for (let i = 0; i < experiences.length; i++) {
      const h = heights[i] || MIN_ROW;
      const row = Math.max(MIN_ROW, h);
      out.push(y + row / 2);
      y += row + ROW_GAP;
    }
    return out;
  }, [experiences.length, heights]);

  const H = useMemo(() => {
    if (!ys.length) {
      return Math.max(
        760,
        TOP + BOTTOM + experiences.length * (MIN_ROW + ROW_GAP)
      );
    }
    const lastCenter = ys[ys.length - 1];
    const lastH = Math.max(MIN_ROW, heights[heights.length - 1] || MIN_ROW);
    return Math.max(760, lastCenter + lastH / 2 + BOTTOM);
  }, [ys, heights, experiences.length]);

  const xLeftAnchor = SIDE_PAD;
  const xRightAnchor = W - SIDE_PAD;

  return (
    <div className="relative mx-auto" style={{ width: W, height: H }}>
      {experiences.map((e, i) => {
        const y = ys[i] ?? TOP + i * (MIN_ROW + ROW_GAP);
        const leftSide = i % 2 === 0;

        return (
          <motion.div
            key={e.id}
            className="absolute"
            style={{ left: 0, top: 0, width: W, height: H }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.03 * i }}
          >
            <div
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute"
              style={{
                width: CARD_W,
                top: y,
                left: leftSide ? xLeftAnchor : xRightAnchor,
                transform: leftSide
                  ? "translate(0%, -50%)"
                  : "translate(-100%, -50%)",
              }}
            >
              <ExperienceRoadmapCard e={e} logoH={LOGO_H} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ExperienceModal({ open, onClose, experiences }) {
  const hasTrackedOpen = useRef(false);
  const scrollRootRef = useRef(null);

  useEffect(() => {
    if (!open) {
      hasTrackedOpen.current = false;
      return;
    }

    if (!hasTrackedOpen.current) {
      trackEvent("view_experience_modal", {
        total_experiences: experiences?.length || 0,
      });
      hasTrackedOpen.current = true;
    }

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        trackEvent("close_experience_modal", {
          close_method: "escape",
        });
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, experiences]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 p-3 sm:p-5 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => {
            trackEvent("close_experience_modal", {
              close_method: "backdrop",
            });
            onClose();
          }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative w-full max-w-[94vw] lg:max-w-[90vw] rounded-3xl glass-modal flex flex-col"
            style={{ maxHeight: "calc(100dvh - 24px)" }}
            initial={{ y: 18, scale: 0.985, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.985, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.9 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-4 sm:p-5 overflow-hidden rounded-t-3xl shrink-0">
              <div>
                <h3 className="text-lg font-semibold">Work experience roadmap</h3>
                <p className="mt-1 text-sm text-zinc-200/80">
                  These are all the organisations I have ever worked with. No matter what you throw at me; I will always come out on top!
                </p>
              </div>

              <button
                onClick={() => {
                  trackEvent("close_experience_modal", {
                    close_method: "button",
                  });
                  onClose();
                }}
                className="rounded-xl border border-white/10 bg-white/10 backdrop-blur px-3 py-2 hover:bg-white/15"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 sm:p-5 grid gap-5 overflow-hidden flex-1 min-h-0">
              <LogoCarousel experiences={experiences} />

              <div
                ref={scrollRootRef}
                className="overflow-y-auto overflow-x-auto"
                style={{ maxHeight: "100%" }}
              >
                <div className="min-w-max px-6">
                  <Roadmap
                    experiences={experiences}
                    scrollRootRef={scrollRootRef}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
