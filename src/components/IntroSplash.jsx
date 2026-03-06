import { AnimatePresence, motion } from "framer-motion";

const waves = [
  {
    className: "intro-wave wave-a",
    initial: { x: "-18%", y: "-8%", rotate: -10, opacity: 0 },
    animate: {
      x: ["-18%", "8%", "22%"],
      y: ["-8%", "-2%", "-6%"],
      rotate: [-10, -6, -8],
      opacity: [0, 0.95, 0.85],
    },
    transition: { duration: 3.2, ease: "easeInOut", times: [0, 0.35, 1] },
  },
  {
    className: "intro-wave wave-b",
    initial: { x: "-10%", y: "10%", rotate: 8, opacity: 0 },
    animate: {
      x: ["-10%", "10%", "28%"],
      y: ["10%", "4%", "8%"],
      rotate: [8, 5, 7],
      opacity: [0, 0.8, 0.72],
    },
    transition: { duration: 3.4, delay: 0.12, ease: "easeInOut", times: [0, 0.35, 1] },
  },
  {
    className: "intro-wave wave-c",
    initial: { x: "-22%", y: "26%", rotate: -4, opacity: 0 },
    animate: {
      x: ["-22%", "4%", "24%"],
      y: ["26%", "20%", "24%"],
      rotate: [-4, -1, -3],
      opacity: [0, 0.7, 0.62],
    },
    transition: { duration: 3.1, delay: 0.18, ease: "easeInOut", times: [0, 0.35, 1] },
  },
  {
    className: "intro-wave wave-d",
    initial: { x: "-16%", y: "42%", rotate: 6, opacity: 0 },
    animate: {
      x: ["-16%", "8%", "26%"],
      y: ["42%", "36%", "40%"],
      rotate: [6, 3, 5],
      opacity: [0, 0.55, 0.5],
    },
    transition: { duration: 3.6, delay: 0.24, ease: "easeInOut", times: [0, 0.35, 1] },
  },
];

export default function IntroSplash({ show }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[120] overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <div className="absolute inset-0 intro-darkness" />
          <div className="absolute inset-0 intro-particle-noise" />

          {waves.map((wave, i) => (
            <motion.div
              key={i}
              className={wave.className}
              initial={wave.initial}
              animate={wave.animate}
              transition={wave.transition}
            />
          ))}

          <motion.div
            className="absolute inset-0 intro-center-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.35 }}
          />

          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div>
              <motion.p
                className="text-[11px] uppercase tracking-[0.45em] text-amber-200/55"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.45 }}
              >
                Welcome to
              </motion.p>

              <motion.h1
                className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.92, duration: 0.6, ease: "easeOut" }}
              >
                My Portfolio
              </motion.h1>

              <motion.p
                className="mx-auto mt-4 max-w-2xl text-sm text-zinc-300/75 sm:text-base"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.12, duration: 0.5 }}
              >
                Strategy, storytelling, and research in motion.
              </motion.p>
            </div>
          </div>

          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1, transition: { duration: 0.45, ease: "easeInOut" } }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
