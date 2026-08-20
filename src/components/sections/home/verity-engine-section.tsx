"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VerityEngineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 55, damping: 24, mass: 0.6 });

  const ballX = useTransform(progress, [0, 0.36, 0.62], ["-48vw", "0vw", "30vw"]);
  const ballY = useTransform(progress, [0, 0.28, 0.6], [120, 35, 0]);
  const ballScale = useTransform(progress, [0, 0.22, 0.55, 0.72], [0.22, 0.48, 1, 1.06]);
  const ballRotate = useTransform(progress, [0.08, 0.62], [-160, 120]);
  const ballOpacity = useTransform(progress, [0, 0.08, 0.76], [0, 1, 1]);

  const lightX = useTransform(progress, [0, 0.6], [-60, 40]);
  const roomGlow = useTransform(progress, [0, 0.38, 0.7, 1], [0, 0.08, 0.24, 0.1]);
  const haloScale = useTransform(progress, [0.3, 0.64, 0.86], [0.35, 1, 1.18]);

  const flickerOpacity = useTransform(
    progress,
    [0.58, 0.62, 0.64, 0.67, 0.69],
    [0, 1, 0.25, 1, 1],
  );
  const titleOpacity = useTransform(progress, [0.67, 0.8], [0, 1]);
  const titleY = useTransform(progress, [0.67, 0.84], [32, 0]);
  const subOpacity = useTransform(progress, [0.78, 0.92], [0, 1]);

  return (
    <section ref={ref} className="relative h-[430vh] w-full bg-black">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[#050505]">
        {/* Deep studio / room */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(255,255,255,0.045),transparent_28%),linear-gradient(180deg,#020202_0%,#080808_52%,#020202_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.018))]" />

        <motion.div
          style={{ opacity: roomGlow }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-[12%] top-[16%] h-[70%] w-[32%] rotate-[12deg] bg-white/[0.05] blur-[100px]" />
          <div className="absolute right-[-10%] top-[22%] h-[58%] w-[28%] -rotate-[10deg] bg-white/[0.035] blur-[110px]" />
          <div className="absolute bottom-[8%] left-[38%] h-[22%] w-[24%] rounded-full bg-white/[0.035] blur-[90px]" />
        </motion.div>

        {/* Subtle floor / perspective */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[34%] w-[130%] -translate-x-1/2 [transform:perspective(900px)_rotateX(62deg)] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.02)_1%,transparent_2%,transparent_12%,rgba(255,255,255,0.018)_13%,transparent_14%,transparent_25%,rgba(255,255,255,0.015)_26%,transparent_27%,transparent_40%,rgba(255,255,255,0.012)_41%,transparent_42%,transparent_58%,rgba(255,255,255,0.012)_59%,transparent_60%,transparent_73%,rgba(255,255,255,0.015)_74%,transparent_75%,transparent_86%,rgba(255,255,255,0.018)_87%,transparent_88%,transparent_98%,rgba(255,255,255,0.02)_99%,transparent)] opacity-60" />

        <motion.div
          style={{ x: lightX }}
          className="pointer-events-none absolute left-[26%] top-[8%] h-[55%] w-[22%] rotate-[14deg] bg-gradient-to-b from-white/[0.06] via-white/[0.015] to-transparent blur-[70px]"
        />

        {/* Rolling 8-ball-like object */}
        <motion.div
          style={{ x: ballX, y: ballY, scale: ballScale, rotate: ballRotate, opacity: ballOpacity }}
          className="absolute left-1/2 top-[48%] z-20 size-[clamp(170px,22vw,300px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,#4b4b4b_0%,#181818_22%,#050505_58%,#000_100%)] shadow-[inset_-30px_-30px_65px_rgba(0,0,0,0.85),inset_18px_15px_28px_rgba(255,255,255,0.08),0_35px_80px_rgba(0,0,0,0.7)]" />
          <div className="absolute inset-[11%] rounded-full border border-white/[0.06]" />
          <div className="absolute inset-[18%] rounded-full bg-black/30 blur-[2px]" />

          <motion.div style={{ opacity: flickerOpacity }} className="absolute inset-[23%] flex items-center justify-center rounded-full bg-black shadow-[inset_0_0_24px_rgba(255,255,255,0.08)]">
            <span className="text-[clamp(48px,7vw,88px)] font-semibold tracking-[-0.12em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.55)]">
              V
            </span>
          </motion.div>

          <motion.div
            style={{ scale: haloScale, opacity: flickerOpacity }}
            className="pointer-events-none absolute inset-[-8%] rounded-full border border-white/10 blur-[1px] shadow-[0_0_60px_rgba(255,255,255,0.1)]"
          />
        </motion.div>

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute inset-x-0 top-[66%] z-30 flex justify-center px-6 text-center"
        >
          <div>
            <p className="font-mono text-[9px] tracking-[0.55em] text-white/28 uppercase md:text-[10px]">
              Powered by
            </p>
            <h2 className="mt-4 text-5xl font-semibold tracking-[-0.075em] text-white sm:text-7xl lg:text-[9rem]">
              VERITY
            </h2>
            <p className="-mt-2 text-xl font-normal italic tracking-[-0.03em] text-white/35 sm:text-3xl">
              Engine
            </p>
          </div>
        </motion.div>

        <motion.p
          style={{ opacity: subOpacity }}
          className="pointer-events-none absolute bottom-[9%] left-1/2 z-30 w-full max-w-xl -translate-x-1/2 px-6 text-center text-sm leading-relaxed text-white/32 sm:text-base"
        >
          Design, development, interaction — brought together into one system built to make digital experiences feel considered.
        </motion.p>

        <div className="pointer-events-none absolute bottom-7 left-1/2 z-40 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-white/16 uppercase">
          Chapter 03 / Engine
        </div>
      </div>
    </section>
  );
}
