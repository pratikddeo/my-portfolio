import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let animationId;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const PARTICLE_COUNT = prefersReducedMotion ? 90 : 180;
    let particles = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(true));
    };

    const random = (min, max) => Math.random() * (max - min) + min;

    const createParticle = (initial = false) => {
      const band = Math.floor(Math.random() * 5);
      const bandY = (height / 6) * (band + 1);

      return {
        x: initial ? random(0, width) : random(-120, -20),
        y: bandY + random(-70, 70),
        r: random(0.8, 2.4),
        vx: random(0.7, 2.2),
        alpha: random(0.2, 0.9),
        drift: random(0.2, 1.1),
        phase: random(0, Math.PI * 2),
        warm: Math.random() > 0.5,
      };
    };

    const drawParticle = (p, t) => {
      const waveY = Math.sin(t * 0.5 + p.phase + p.x * 0.003) * (10 + p.drift * 14);
      const y = p.y + waveY;

      const color = p.warm
        ? `rgba(255, ${150 + Math.floor(Math.random() * 50)}, ${55 + Math.floor(Math.random() * 20)}, ${p.alpha})`
        : `rgba(255, 225, 170, ${p.alpha * 0.8})`;

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.shadowColor = "rgba(255,170,70,0.35)";
      ctx.shadowBlur = 12;
      ctx.arc(p.x, y, p.r, 0, Math.PI * 2);
      ctx.fill();
    };

    const render = (t) => {
      ctx.clearRect(0, 0, width, height);

      const bg = ctx.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, "rgba(0,0,0,0.96)");
      bg.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.phase += 0.01;

        if (p.x > width + 40) {
          particles[i] = createParticle(false);
          continue;
        }

        drawParticle(p, t);
      }

      animationId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

export default function IntroSplash({ show }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[120] overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <ParticleCanvas />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,80,0.10),transparent_28%)]" />

          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div>
              <motion.p
                className="text-[11px] uppercase tracking-[0.45em] text-amber-200/60"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.45 }}
              >
                Welcome to
              </motion.p>

              <motion.h1
                className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.55 }}
              >
                My Portfolio
              </motion.h1>

              <motion.p
                className="mx-auto mt-4 max-w-2xl text-sm text-zinc-300/75 sm:text-base"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.02, duration: 0.5 }}
              >
                Strategy, storytelling, and research in motion.
              </motion.p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
