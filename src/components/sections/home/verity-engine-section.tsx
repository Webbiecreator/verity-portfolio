"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VerityEngineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.45 });

  const buttonY = useTransform(progress, [0, 0.42, 0.72], [30, 0, -8]);
  const buttonScale = useTransform(progress, [0, 0.36, 0.72], [0.86, 1, 1.04]);
  const buttonOpacity = useTransform(progress, [0.02, 0.2], [0, 1]);
  const textY = useTransform(progress, [0.18, 0.58], [42, 0]);
  const textOpacity = useTransform(progress, [0.2, 0.5], [0, 1]);
  const lineScale = useTransform(progress, [0.42, 0.68], [0, 1]);
  const glow = useTransform(progress, [0, 0.35, 0.72], [0, 0.5, 0.9]);

  return (
    <section ref={ref} className="relative h-[320vh] w-full bg-black">
      <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: glow }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[45vw] w-[45vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[130px]"
        />

        <div className="relative z-10 flex w-full max-w-6xl flex-col items-center px-6 text-center">
          <motion.button
            type="button"
            aria-label="Verity Engine"
            style={{ y: buttonY, scale: buttonScale, opacity: buttonOpacity }}
            className="group relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-[#e8e8e8] text-black shadow-[0_20px_80px_rgba(255,255,255,0.08)] transition-all duration-500 hover:scale-[1.06] sm:h-40 sm:w-40"
          >
            <span className="absolute inset-2 rounded-full border border-black/10" />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.95),rgba(232,232,232,0.4)_42%,rgba(0,0,0,0.08)_100%)] transition-opacity duration-500 group-hover:opacity-70" />
            <span className="relative z-10 text-5xl font-semibold tracking-[-0.09em] transition-transform duration-500 group-hover:scale-90 sm:text-6xl">
              V
            </span>
            <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-black/0 transition-all duration-500 group-hover:inset-3 group-hover:border-black/15" />
            <span className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] tracking-[0.35em] opacity-0 transition-all duration-500 group-hover:bottom-4 group-hover:opacity-60 uppercase">
              Verity Engine
            </span>
          </motion.button>

          <motion.div style={{ opacity: textOpacity, y: textY }} className="mt-14">
            <p className="font-mono text-[9px] tracking-[0.5em] text-white/30 uppercase md:text-[10px]">
              Powered by
            </p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-9xl">
              Verity <span className="font-normal italic text-white/35">Engine</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/40 sm:text-base">
              Our internal approach to design, development, interaction, and purposeful motion.
            </p>
            <motion.div
              style={{ scaleX: lineScale, transformOrigin: "center" }}
              className="mx-auto mt-10 h-px w-32 bg-white/25"
            />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-white/20 uppercase">
          Chapter 03 / The system
        </div>
      </div>
    </section>
  );
}
