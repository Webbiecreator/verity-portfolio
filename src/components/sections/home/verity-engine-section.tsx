"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VerityEngineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.45 });

  const markScale = useTransform(progress, [0, 0.45, 0.72], [0.7, 1, 1.08]);
  const markRotate = useTransform(progress, [0, 0.72], [-8, 0]);
  const glow = useTransform(progress, [0, 0.35, 0.75], [0, 0.75, 1]);
  const textY = useTransform(progress, [0.2, 0.7], [50, 0]);
  const textOpacity = useTransform(progress, [0.22, 0.52], [0, 1]);
  const lineScale = useTransform(progress, [0.45, 0.72], [0, 1]);

  return (
    <section ref={ref} className="relative h-[360vh] w-full bg-black">
      <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: glow }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.045] blur-[120px]"
        />

        <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center">
          <motion.div
            style={{ scale: markScale, rotate: markRotate }}
            className="relative flex size-28 items-center justify-center rounded-[2rem] border border-white/15 bg-white/[0.035] shadow-[0_0_80px_rgba(255,255,255,0.08)] backdrop-blur-xl sm:size-36"
          >
            <div className="absolute inset-3 rounded-[1.35rem] border border-white/10" />
            <span className="text-4xl font-semibold tracking-[-0.08em] text-white sm:text-5xl">V</span>
            <span className="absolute -bottom-3 rounded-full border border-white/10 bg-black px-3 py-1 font-mono text-[8px] tracking-[0.35em] text-white/35 uppercase">
              engine
            </span>
          </motion.div>

          <motion.div style={{ opacity: textOpacity, y: textY }} className="mt-14">
            <p className="font-mono text-[9px] tracking-[0.5em] text-white/30 uppercase md:text-[10px]">
              Powered by
            </p>
            <h2 className="mt-5 text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-9xl">
              Verity <span className="font-normal italic text-white/35">Engine</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/40 sm:text-base">
              A design and development system built around clarity, interaction, and purposeful motion.
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
