"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const WINDOWS = Array.from({ length: 84 }, (_, index) => ({ index }));

const warmLights = [
  "rgba(255, 236, 184, 0.95)",
  "rgba(255, 221, 144, 0.9)",
  "rgba(255, 244, 208, 0.92)",
  "rgba(255, 206, 112, 0.88)",
];

function WindowLight({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const start = (index / WINDOWS.length) * 0.76;
  const end = start + 0.028;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.78, 1]);
  const glow = useTransform(progress, [start, end], [0, 1]);
  const light = warmLights[index % warmLights.length];

  return (
    <motion.div
      style={{ opacity, scale }}
      className="relative rounded-[2px] bg-neutral-950 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.025)]"
    >
      <motion.div
        style={{
          opacity: glow,
          background: `linear-gradient(145deg, rgba(255,255,255,0.24), ${light} 36%, rgba(255,180,60,0.3) 100%)`,
          boxShadow: `0 0 26px ${light}, 0 0 70px rgba(255,183,77,0.12)`,
        }}
        className="absolute inset-[3px] rounded-[1px]"
      />
      <div className="absolute inset-0 bg-linear-to-b from-white/[0.025] to-black/40" />
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/25" />
    </motion.div>
  );
}

export default function BuildingLightsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  const buildingY = useTransform(progress, [0, 1], [40, -40]);
  const titleOpacity = useTransform(progress, [0.73, 0.88], [0, 1]);
  const titleY = useTransform(progress, [0.73, 0.9], [30, 0]);
  const vignetteOpacity = useTransform(progress, [0, 0.72, 1], [0.7, 0.35, 0.72]);

  return (
    <section ref={sectionRef} className="relative h-[520vh] w-full bg-black">
      <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden bg-[#050505]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,190,82,0.06),transparent_45%)]" />

        <motion.div
          style={{ y: buildingY }}
          className="relative h-[78vh] w-[min(88vw,1200px)] overflow-hidden rounded-[2px] border border-white/[0.06] bg-[#0c0c0c] shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(100deg,#0a0a0a_0%,#111_18%,#080808_50%,#121212_82%,#090909_100%)]" />

          <div className="relative grid h-full grid-cols-6 gap-[clamp(4px,0.65vw,10px)] p-[clamp(10px,1.4vw,24px)] sm:grid-cols-8 lg:grid-cols-12">
            {WINDOWS.map((item) => (
              <WindowLight key={item.index} index={item.index} progress={progress} />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/[0.025]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.035),transparent_12%,transparent_88%,rgba(255,255,255,0.025))]" />
        </motion.div>

        <motion.div
          style={{ opacity: vignetteOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.92)_100%)]"
        />

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute inset-x-0 bottom-[10%] flex justify-center px-6 text-center"
        >
          <div>
            <p className="mb-4 font-mono text-[9px] tracking-[0.45em] text-white/30 uppercase md:text-[10px]">
              Chapter 02 / Inside the build
            </p>
            <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
              Every detail
              <br />
              <span className="font-normal italic text-white/35">turns the light on.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/35 sm:text-base">
              One interaction at a time. One decision at a time. Until the whole
              experience is alive.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
