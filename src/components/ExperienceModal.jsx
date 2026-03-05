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
                  className="h-full w-full object-contain"
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
  const W = 1400;
  const xLine = Math.round(W / 2);

  const TOP = 70;
  const BOTTOM = 90;
  const MIN_ROW = 170;
  const ROW_GAP = 44;
  const SIDE_PAD = 110;

  // responsive card width (dynamic)
  const CARD_W = "clamp(320px, 38vw, 560px)";

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
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [experiences.length]);

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

  // We can’t do math on clamp() directly, so place cards using translate + fixed anchors.
  // Anchor left cards to SIDE_PAD, right cards to (W - SIDE_PAD).
  const xLeftAnchor = SIDE_PAD;
  const xRightAnchor = W - SIDE_PAD;

  return (
    <div className="relative mx-auto" style={{ width: W, height: H }}>
      {/* Center line layer (separate, so it stays visible) */}
      <svg
        className="absolute inset-0"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ pointerEvents: "none" }}
      >
        <defs>
          {/* Gold gradient */}
          <linearGradient id="goldLine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 215, 110, .95)" />
            <stop offset="45%" stopColor="rgba(255, 196, 72, .90)" />
            <stop offset="100%" stopColor="rgba(180, 120, 20, .75)" />
          </linearGradient>

          {/* Glow */}
          <filter id="goldGlow" x="-80%" y="-20%" width="260%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0.95
                0 1 0 0 0.72
                0 0 1 0 0.20
                0 0 0 0.9 0"
              result="goldBlur"
            />
            <feMerge>
              <feMergeNode in="goldBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* soft glow stroke behind */}
        <line
          x1={xLine}
          y1={TOP}
          x2={xLine}
          y2={H - BOTTOM}
          stroke="rgba(255, 205, 90, .35)"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.55"
          filter="url(#goldGlow)"
        />
        {/* main shiny line */}
        <line
          x1={xLine}
          y1={TOP}
          x2={xLine}
          y2={H - BOTTOM}
          stroke="url(#goldLine)"
          strokeWidth="5.5"
          strokeLinecap="round"
          opacity="0.95"
        />
      </svg>

      {experiences.map((e, i) => {
        const y = ys[i] ?? TOP + i * (MIN_ROW + ROW_GAP);
        const leftSide = i % 2 === 0;

        const dotX = xLine;

        // Connector goes from dot towards the card, but card can be far (like your example)
        const connectorEndX = leftSide ? dotX - 140 : dotX + 140;

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
                r="7"
                fill="rgba(255, 210, 95, .25)"
                stroke="rgba(255, 215, 120, .80)"
                strokeWidth="1.6"
                filter="url(#goldGlow)"
              />
              <line
                x1={dotX}
                y1={y}
                x2={connectorEndX}
                y2={y}
                stroke="rgba(255, 210, 120, .35)"
                strokeWidth="1.6"
              />
            </svg>

            {/* Card */}
            <div
              ref={(el) => (cardRefs.current[i] = el)}
              className="glass-card rounded-3xl p-5 absolute"
              style={{
                width: CARD_W,
                top: y,
                left: leftSide ? xLeftAnchor : xRightAnchor,
                transform: leftSide
                  ? "translate(0%, -50%)"
                  : "translate(-100%, -50%)",
              }}
            >
              <div className="flex items-center gap-4">
                {/* Bigger logo box, no padding so logo can be fully seen */}
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <img
                    src={e.logo}
                    alt={e.company}
                    className="h-full w-full object-contain"
                    draggable={false}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-base font-semibold leading-tight">
                    {e.role}
                  </p>
                  <p className="text-sm text-zinc-300/80 truncate">
                    {e.company}
                  </p>
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
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 36,
              mass: 0.9,
            }}
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

              <div
                className="overflow-y-auto overflow-x-auto"
                style={{ maxHeight: "84vh" }}
              >
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
