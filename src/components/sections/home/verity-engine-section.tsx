"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VerityEngineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 25,
    mass: 0.7,
  });

  const ballX = useTransform(progress, [0, 0.7], ["-55vw", "55vw"]);
  const ballRotate = useTransform(progress, [0, 0.7], [-120, 720]);
  const ballScale = useTransform(progress, [0, 0.18, 0.45, 0.7], [0.28, 0.6, 0.95, 1]);
  const ballOpacity = useTransform(progress, [0, 0.08], [0, 1]);

  const studioGlow = useTransform(progress, [0, 0.3, 0.7, 1], [0.06, 0.12, 0.18, 0.08]);
  const titleOpacity = useTransform(progress, [0.7, 0.82], [0, 1]);
  const titleY = useTransform(progress, [0.7, 0.84], [28, 0]);
  const subOpacity = useTransform(progress, [0.82, 0.92], [0, 1]);

  return (
    <section ref={ref} className="relative h-[430vh] w-full bg-black">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-[#030303]">
        {/* Deep studio environment */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.05),transparent_32%),linear-gradient(180deg,#010101_0%,#070707_42%,#020202_100%)]" />
        <div className="pointer-events-none absolute inset-x-[9%] top-[8%] h-[68%] rounded-[50%] border border-white/[0.035] [transform:perspective(1100px)_rotateX(66deg)]" />
        <div className="pointer-events-none absolute left-[10%] top-[17%] h-[58%] w-px bg-white/[0.035] [transform:perspective(900px)_rotateY(-15deg)]" />
        <div className="pointer-events-none absolute right-[10%] top-[17%] h-[58%] w-px bg-white/[0.035] [transform:perspective(900px)_rotateY(15deg)]" />
        <div className="pointer-events-none absolute inset-x-[18%] bottom-[11%] h-px bg-white/[0.035] [transform:perspective(700px)_rotateX(70deg)]" />

        <motion.div
          style={{ opacity: studioGlow }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -left-[12%] top-[18%] h-[62%] w-[24%] rotate-[14deg] bg-white/[0.07] blur-[110px]" />
          <div className="absolute right-[-10%] top-[24%] h-[54%] w-[22%] -rotate-[16deg] bg-white/[0.055] blur-[120px]" />
          <div className="absolute bottom-[4%] left-[36%] h-[20%] w-[28%] rounded-full bg-white/[0.045] blur-[100px]" />
        </motion.div>

        {/* Slow rolling 8-ball */}
        <motion.div
          style={{
            x: ballX,
            rotate: ballRotate,
            scale: ballScale,
            opacity: ballOpacity,
          }}
          className="absolute left-1/2 top-[51%] z-20 size-[clamp(170px,20vw,290px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,#6a6a6a_0%,#262626_18%,#0b0b0b_52%,#000_100%)] shadow-[inset_-34px_-30px_66px_rgba(0,0,0,0.9),inset_20px_18px_34px_rgba(255,255,255,0.1),0_48px_100px_rgba(0,0,0,0.78)]" />
          <div className="absolute inset-[5%] rounded-full border border-white/[0.08]" />
          <div className="absolute inset-[13%] rounded-full border border-white/[0.035]" />

          {/* 8-ball window: stable glow, no flicker */}
          <div className="absolute inset-[24%] flex items-center justify-center rounded-full bg-[#050505] shadow-[inset_0_0_30px_rgba(255,255,255,0.07),0_0_35px_rgba(255,255,255,0.035)]">
            <span className="text-[clamp(46px,6vw,82px)] font-semibold tracking-[-0.12em] text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.42)]">
              V
            </span>
          </div>
        </motion.div>

        {/* Uiverse-inspired identity treatment: static until hover. */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute inset-x-0 top-[67%] z-30 flex justify-center px-6 text-center"
        >
          <div className="group pointer-events-auto relative flex min-h-[92px] min-w-[280px] cursor-default items-center justify-center rounded-[1.5rem] border border-white/[0.13] bg-white/[0.035] px-8 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl transition-all duration-700 hover:-translate-y-1 hover:border-white/[0.28] hover:bg-white/[0.06]">
            <div className="absolute inset-0 rounded-[1.5rem] opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent_68%)]" />

            <div className="relative flex flex-col items-center gap-2">
              <div className="font-mono text-[9px] tracking-[0.45em] text-white/28 uppercase transition-colors duration-500 group-hover:text-white/45">
                Powered by
              </div>
              <div className="text-2xl font-semibold tracking-[-0.06em] text-white sm:text-3xl">
                V
              </div>
              <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 translate-y-1 opacity-0 whitespace-nowrap font-mono text-[9px] tracking-[0.34em] text-white/55 uppercase transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                Verity Engine
              </div>
            </div>
          </div>
        </motion.div>

        <motion.p
          style={{ opacity: subOpacity }}
          className="pointer-events-none absolute bottom-[9%] left-1/2 z-30 w-full max-w-lg -translate-x-1/2 px-6 text-center text-sm leading-relaxed text-white/32 sm:text-base"
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
