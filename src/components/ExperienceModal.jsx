import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

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
                  className="h-full w-full object-contain p-2"
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

function Roadmap({ experiences }) {
  // Wide canvas; modal wrapper provides horizontal scroll if needed
  const W = 1400;
  const xLine = Math.round(W / 2);

  // Layout constants (tweak freely)
  const TOP = 70;
  const BOTTOM = 90;
  const MIN_ROW = 170; // minimum vertical spacing per item
  const ROW_GAP = 44; // extra gap between items
  const SIDE_PAD = 120; // distance from edge to card
  const CARD_W = 520; // fixed width like your example (more stable than clamp)

  // Measure cards to avoid overlap
  const cardRefs = useRef([]);
  const [heights, setHeights] = useState([]);

  // Reset refs length when experiences change
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, experiences.length);
  }, [experiences.length]);

  useLayoutEffect(() => {
    const measure = () => {
      const hs = cardRefs.current.map((el) => (el ? el.offsetHeight : 0));
      setHeights(hs);
    };

    measure();

    // Re-measure on resize (responsive fonts / wrapping)
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [experiences.length]);

  // Compute y positions based on measured heights
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
    if (!ys.length) return Math.max(760, TOP + BOTTOM + experiences.length * (MIN_ROW + ROW_GAP));
    const lastCenter = ys[ys.length - 1];
    const lastH = Math.max(MIN_ROW, heights[heights.length - 1] || MIN_ROW);
    return Math.max(760, lastCenter + lastH / 2 + BOTTOM);
  }, [ys, heights, experiences.length]);

  const xLeft = SIDE_PAD + CARD_W / 2;
  const xRight = W - SIDE_PAD - CARD_W / 2;

  return (
    <div className="relative mx-auto" style={{ width: W, height: H }}>
      {/* Center vertical line */}
      <svg className="absolute inset-0" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,.30)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.10)" />
          </linearGradient>
        </defs>

        <line
          x1={xLine}
          y1={TOP}
          x2={xLine}
          y2={H - BOTTOM}
          stroke="url(#road)"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>

      {experiences.map((e, i) => {
        const y = ys[i] ?? TOP + i * (MIN_ROW + ROW_GAP);
        const leftSide = i % 2 === 0;

        // Put cards far from the center line (like your example)
        const cardX = leftSide ? xLeft : xRight;

        // Connector dot is on the center line
        const dotX = xLine;

        // Horizontal connector length from dot to near the card
        const connectorEndX = leftSide ? cardX + CARD_W / 2 + 18 : cardX - CARD_W / 2 - 18;

        return (
          <motion.div
            key={e.id}
            className="absolute"
            style={{ left: 0, top: 0, width: W, height: H }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.03 * i }}
          >
            {/* Dot + connector */}
            <svg
              className="absolute left-0 top-0"
              width={W}
              height={H}
              viewBox={`0 0 ${W} ${H}`}
              style={{ pointerEvents: "none" }}
            >
              <circle
                cx={dotX}
                cy={y}
                r="6"
                fill="rgba(255,255,255,.25)"
                stroke="rgba(255,255,255,.35)"
                strokeWidth="1.5"
              />
              <line
                x1={dotX}
                y1={y}
                x2={connectorEndX}
                y2={y}
                stroke="rgba(255,255,255,.22)"
                strokeWidth="1.5"
              />
            </svg>

            {/* Card */}
            <div
              ref={(el) => (cardRefs.current[i] = el)}
              className="glass-card rounded-3xl p-5 absolute"
              style={{
                width: CARD_W,
                left: cardX,
                top: y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img
                    src={e.logo}
                    alt={e.company}
                    className="h-full w-full object-contain p-2"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold leading-tight">{e.role}</p>
                  <p className="text-sm text-zinc-300/80 truncate">{e.company}</p>
                </div>
              </div>

              <p className="mt-2 text-sm text-zinc-300/80">
                {e.start} – {e.end} • {e.location}
              </p>

              <p className="mt-3 text-sm text-zinc-200/85 whitespace-pre-wrap leading-relaxed">
                {e.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ExperienceModal({ open, onClose, experiences }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
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
            className="relative w-full max-w-[94vw] lg:max-w-[90vw] rounded-3xl glass-modal"
            initial={{ y: 18, scale: 0.985, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 18, scale: 0.985, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.9 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-4 sm:p-5 overflow-hidden rounded-t-3xl">
              <div>
                <h3 className="text-lg font-semibold">Work experience roadmap</h3>
                <p className="mt-1 text-sm text-zinc-200/80">
                  Logos + full timeline (scroll down)
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

            <div className="p-4 sm:p-5 grid gap-5">
              <LogoCarousel experiences={experiences} />

              <div className="overflow-y-auto overflow-x-auto" style={{ maxHeight: "84vh" }}>
                <div className="min-w-max px-6">
                  <Roadmap experiences={experiences} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
