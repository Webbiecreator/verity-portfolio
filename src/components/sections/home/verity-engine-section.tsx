"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";

export default function VerityEngineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 23,
    mass: 0.5,
  });

  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        index,
        angle: (index / 28) * Math.PI * 2,
        distance: 90 + ((index * 37) % 120),
        delay: (index % 7) * 0.02,
      })),
    [],
  );

  const ambient = useTransform(progress, [0, 0.3, 0.68, 1], [0, 0.12, 0.55, 0.2]);
  const coreScale = useTransform(progress, [0, 0.2, 0.5, 0.72], [0.15, 0.42, 0.92, 1]);
  const coreRotate = useTransform(progress, [0.08, 0.62], [-35, 0]);
  const ringScale = useTransform(progress, [0.18, 0.65], [0.35, 1]);
  const ringRotate = useTransform(progress, [0, 1], [-18, 28]);
  const titleOpacity = useTransform(progress, [0.58, 0.78], [0, 1]);
  const titleY = useTransform(progress, [0.58, 0.82], [36, 0]);
  const subOpacity = useTransform(progress, [0.72, 0.92], [0, 1]);
  const bloomScale = useTransform(progress, [0.25, 0.7, 1], [0.6, 1.1, 1.3]);
  const exitOpacity = useTransform(progress, [0.84, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[420vh] w-full bg-black">
      <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden bg-black">
        <motion.div
          style={{ opacity: ambient, scale: bloomScale }}
          className="pointer-events-none absolute left-1/2 top-1/2 size-[55vw] max-size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.08] blur-[110px]"
        />

        <motion.div
          style={{ opacity: exitOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_30%,rgba(0,0,0,0.95)_82%)]"
        />

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {particles.map((particle) => {
            const x = Math.cos(particle.angle) * particle.distance;
            const y = Math.sin(particle.angle) * particle.distance;
            const particleScale = useTransform(
              progress,
              [0.05 + particle.delay, 0.34 + particle.delay],
              [0, 1],
            );
            const particleOpacity = useTransform(
              progress,
              [0.05 + particle.delay, 0.2 + particle.delay, 0.42 + particle.delay],
              [0, 1, 0.18],
            );

            return (
              <motion.span
                key={particle.index}
                style={{
                  x,
                  y,
                  scale: particleScale,
                  opacity: particleOpacity,
                }}
                className="absolute size-1 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.85)]"
              />
            );
          })}

          <motion.div
            style={{ scale: ringScale, rotate: ringRotate }}
            className="absolute size-44 rounded-full border border-white/10 sm:size-60"
          >
            <div className="absolute inset-3 rounded-full border border-white/[0.05]" />
            <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)]" />
          </motion.div>

          <motion.div
            style={{ scale: coreScale, rotate: coreRotate }}
            className="relative flex size-32 items-center justify-center rounded-full border border-white/20 bg-white/[0.045] shadow-[0_0_90px_rgba(255,255,255,0.12)] backdrop-blur-2xl sm:size-44"
          >
            <div className="absolute inset-2 rounded-full border border-white/10" />
            <div className="absolute inset-5 rounded-full border border-white/[0.06]" />
            <span className="relative text-4xl font-semibold tracking-[-0.1em] text-white sm:text-6xl">V</span>
          </motion.div>

          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="pointer-events-none absolute top-[60%] flex flex-col items-center text-center px-6"
          >
            <p className="font-mono text-[9px] tracking-[0.55em] text-white/30 uppercase md:text-[10px]">
              Powered by
            </p>
            <h2 className="mt-4 text-6xl font-semibold tracking-[-0.07em] text-white sm:text-8xl lg:text-[10rem]">
              VERITY
            </h2>
            <p className="-mt-2 text-xl font-normal italic tracking-[-0.03em] text-white/35 sm:text-3xl">
              Engine
            </p>
          </motion.div>

          <motion.p
            style={{ opacity: subOpacity }}
            className="pointer-events-none absolute bottom-[10%] max-w-xl px-6 text-center text-sm leading-relaxed text-white/35 sm:text-base"
          >
            Design, development, interaction — brought together into one system built to make digital experiences feel considered.
          </motion.p>
        </div>

        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-white/18 uppercase">
          Chapter 03 / Boot sequence
        </div>
      </div>
    </section>
  );
}
