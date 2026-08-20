"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

export default function VerityEngineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 24, mass: 0.5 });

  const particles = useMemo(
    () => Array.from({ length: 34 }, (_, index) => ({
      index,
      angle: (index / 34) * Math.PI * 2,
      distance: 110 + ((index * 29) % 170),
    })),
    [],
  );

  const roomGlow = useTransform(progress, [0, 0.35, 0.7, 1], [0.08, 0.16, 0.28, 0.12]);
  const diskScale = useTransform(progress, [0, 0.18, 0.44, 0.68], [0.2, 0.45, 0.86, 1]);
  const diskY = useTransform(progress, [0, 0.5, 0.7], [90, 30, 0]);
  const diskRotateY = useTransform(progress, [0, 0.42, 0.72], [70, 24, 0]);
  const diskRotateX = useTransform(progress, [0, 0.7], [18, -2]);
  const ringScale = useTransform(progress, [0.12, 0.62], [0.35, 1]);
  const ringRotate = useTransform(progress, [0, 1], [-28, 30]);
  const wordmarkOpacity = useTransform(progress, [0.58, 0.72], [0, 1]);
  const wordmarkY = useTransform(progress, [0.58, 0.78], [34, 0]);
  const copyOpacity = useTransform(progress, [0.72, 0.88], [0, 1]);
  const copyY = useTransform(progress, [0.72, 0.9], [24, 0]);
  const exitOpacity = useTransform(progress, [0.9, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[440vh] w-full bg-black">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[#030303] text-white [perspective:1400px]">
        {/* Deep studio / asylum-like environment */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(80,80,80,0.10),transparent_42%),linear-gradient(180deg,#010101_0%,#070707_52%,#020202_100%)]" />
        <div className="pointer-events-none absolute inset-x-[9%] top-[13%] h-px bg-white/[0.035]" />
        <div className="pointer-events-none absolute inset-x-[13%] bottom-[16%] h-px bg-white/[0.025]" />

        {/* Architectural columns / depth cues */}
        <div className="pointer-events-none absolute inset-y-0 left-[8%] w-px bg-white/[0.025]" />
        <div className="pointer-events-none absolute inset-y-0 right-[8%] w-px bg-white/[0.025]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[72vh] w-[72vw] -translate-x-1/2 -translate-y-1/2 border border-white/[0.02]" />

        <motion.div
          style={{ opacity: roomGlow }}
          className="pointer-events-none absolute left-1/2 top-1/2 size-[58vw] max-size-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] blur-[160px]"
        />

        <motion.div
          style={{ opacity: exitOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_23%,rgba(0,0,0,0.94)_84%)]"
        />

        {/* Dust / boot particles */}
        {particles.map((particle) => {
          const x = Math.cos(particle.angle) * particle.distance;
          const y = Math.sin(particle.angle) * particle.distance * 0.62;
          const opacity = useTransform(progress, [0.06, 0.28, 0.5], [0, 0.8, 0.16]);
          const scale = useTransform(progress, [0.08, 0.34], [0, 1]);
          return (
            <motion.span
              key={particle.index}
              style={{ x, y, opacity, scale }}
              className="pointer-events-none absolute left-1/2 top-1/2 size-1 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.8)]"
            />
          );
        })}

        <div className="absolute inset-0 flex items-center justify-center">
          {/* 3D disk / sphere hybrid */}
          <motion.div
            style={{
              scale: diskScale,
              y: diskY,
              rotateY: diskRotateY,
              rotateX: diskRotateX,
              transformStyle: "preserve-3d",
            }}
            className="relative size-[210px] sm:size-[280px] lg:size-[350px]"
          >
            {/* Back halo */}
            <div className="absolute inset-[-12%] rounded-full border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.08)] [transform:translateZ(-40px)]" />

            {/* Orb body */}
            <div className="absolute inset-0 rounded-full border border-white/20 bg-[radial-gradient(circle_at_34%_28%,rgba(255,255,255,0.18),rgba(255,255,255,0.035)_24%,rgba(5,5,5,0.96)_70%)] shadow-[inset_-24px_-30px_60px_rgba(0,0,0,0.9),inset_20px_18px_55px_rgba(255,255,255,0.06),0_0_100px_rgba(255,255,255,0.08)]" />

            {/* Disc rings */}
            <div
              className="absolute inset-[8%] rounded-full border border-white/[0.08] [transform:translateZ(26px)]"
              style={{ boxShadow: "inset 0 0 30px rgba(255,255,255,0.035)" }}
            />
            <div className="absolute left-1/2 top-1/2 h-[76%] w-[12%] -translate-x-1/2 -translate-y-1/2 rounded-full border-x border-white/[0.08] [transform:translateZ(32px)]" />
            <div className="absolute inset-[22%] rounded-full border border-white/[0.07] [transform:translateZ(38px)]" />

            {/* Verity V mark */}
            <div className="absolute inset-0 flex items-center justify-center [transform:translateZ(52px)]">
              <span className="text-6xl font-medium tracking-[-0.12em] text-white/90 sm:text-7xl lg:text-8xl">V</span>
            </div>

            {/* Orbit */}
            <motion.div
              style={{ scale: ringScale, rotate: ringRotate, transformStyle: "preserve-3d" }}
              className="absolute inset-[-12%] rounded-full border border-white/15 [transform:rotateX(68deg) translateZ(80px)]"
            />
          </motion.div>
        </div>

        {/* Text enters only after the object is fully formed, preventing overlap */}
        <motion.div
          style={{ opacity: wordmarkOpacity, y: wordmarkY }}
          className="pointer-events-none absolute inset-x-0 top-[68%] z-20 flex justify-center px-6 text-center"
        >
          <div className="max-w-5xl">
            <p className="font-mono text-[9px] tracking-[0.58em] text-white/28 uppercase md:text-[10px]">Powered by</p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.08em] text-white sm:text-7xl lg:text-[8rem]">VERITY</h2>
            <p className="mt-1 text-xl font-normal italic tracking-[-0.03em] text-white/32 sm:text-2xl">Engine</p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="pointer-events-none absolute inset-x-0 bottom-[9%] z-20 flex justify-center px-6 text-center"
        >
          <p className="max-w-xl text-sm leading-relaxed text-white/32 sm:text-base">Design, development, and interaction brought together into one system — built to make digital experiences feel considered.</p>
        </motion.div>

        <div className="pointer-events-none absolute bottom-7 left-1/2 z-30 -translate-x-1/2 font-mono text-[9px] tracking-[0.42em] text-white/16 uppercase">Chapter 03 / The system</div>
      </div>
    </section>
  );
}
