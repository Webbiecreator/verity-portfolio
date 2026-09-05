"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import DeepButton from "@/components/ui/deep-button";
import CRTWarp from "@/components/ui/crt-warp";
import Dither from "@/components/ui/dither";

const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    const interval = window.setInterval(() => setTick((value) => value + 1), 1200);
    return () => window.clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#10061a] text-white"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 opacity-[0.23] mix-blend-screen">
          <Dither
            waveSpeed={0.025}
            waveFrequency={3}
            waveAmplitude={0.3}
            waveColor={[0.55, 0.22, 0.72]}
            backgroundColor={[0.06, 0.02, 0.10]}
            colorNum={4}
            pixelSize={1.5}
          />
        </div>

        <CRTWarp
          color="#c755f7"
          backgroundColor="#10061a"
          speed={0.28}
          curvature={0.18}
          scanlineStrength={0.08}
          scanlineFrequency={180}
          waveAmplitude={0.22}
          waveFrequency={2.1}
          bloom={1.35}
          bloomRadius={0.8}
          noise={0.06}
          vignette={0.18}
          brightness={1.12}
          pixelation={1}
          rgbShift={0.008}
          mouseReact
          mouseStrength={0.35}
          dpr={1}
          fps={45}
          className="absolute inset-0"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(199,85,247,0.18),transparent_34%),linear-gradient(to_bottom,rgba(16,6,26,0.04),rgba(16,6,26,0.24))]" />

        <motion.div
          style={{ y: gridY }}
          className="hero-grid absolute -inset-x-1/2 bottom-[-28%] h-[82%] origin-bottom [transform:perspective(900px)_rotateX(58deg)_scale(1.45)] opacity-25"
        />

        <motion.div
          animate={{ x: [0, 100, -40, 0], y: [0, -35, 45, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[4%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-300/[0.09] blur-[130px]"
        />

        <motion.div
          animate={{ x: [0, -80, 50, 0], y: [0, 60, -25, 0], scale: [1, 0.9, 1.12, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-8%] top-[26%] h-[30rem] w-[30rem] rounded-full bg-sky-300/[0.07] blur-[140px]"
        />

        <div className="absolute left-1/2 top-1/2 h-[min(72vw,680px)] w-[min(72vw,680px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.055]" />
        <div className="absolute left-1/2 top-1/2 h-[min(51vw,480px)] w-[min(51vw,480px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]" />
        <div className="absolute left-1/2 top-1/2 h-[min(30vw,280px)] w-[min(30vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

        <span
          className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-violet-200/45 shadow-[0_0_18px_rgba(196,181,253,0.55)]"
          style={{ transform: `rotate(${tick * 30}deg) translateX(min(25vw,240px))` }}
        />
        <span
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-sky-100/30"
          style={{ transform: `rotate(${-tick * 18}deg) translateX(min(35vw,340px))` }}
        />

        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#10061a]/75 via-[#10061a]/15 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(16,6,26,0.42)_78%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.025]" />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[1500px] flex-col px-6 pb-7 pt-24 sm:px-8 sm:pb-8 sm:pt-28 md:px-10"
      >
        <div className="flex min-h-0 flex-1 items-center py-8 sm:py-10 md:py-12">
          <div className="w-full max-w-[1180px]">
            <div className="mb-5 flex flex-wrap items-center gap-3 sm:mb-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45 sm:text-[10px]">Available for work</span>
              <span className="h-1.5 w-1.5 rounded-full bg-violet-200/65 shadow-[0_0_12px_rgba(196,181,253,0.65)]" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 sm:text-[10px]">India / Worldwide</span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-roadster w-full text-[clamp(4rem,10.4vw,10.5rem)] font-medium uppercase leading-[0.76] tracking-[-0.06em]"
            >
              <span className="block">We build</span>
              <span className="block bg-gradient-to-r from-white via-white to-white/45 bg-clip-text text-transparent">websites.</span>
              <span className="mt-3 block pl-[0.08em] text-[0.42em] font-normal lowercase leading-[1.05] tracking-[-0.02em] text-white/45 sm:mt-4">that don&apos;t feel like</span>
              <span className="block bg-gradient-to-r from-violet-100 via-white to-white/40 bg-clip-text text-transparent">websites.</span>
            </motion.h1>

            <div className="mt-7 flex flex-col gap-6 sm:mt-8 md:flex-row md:items-start md:gap-12">
              <div className="max-w-xl">
                <span className="mb-2 inline-flex border border-white/15 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-white/35">↗ typewriter — animated</span>
                <p className="font-mono text-[10px] leading-5 tracking-wide text-white/50 sm:text-[11px] sm:leading-6">Creative web design &amp; development building digital experiences at the intersection of craft and technology.<span className="ml-0.5 inline-block h-3 w-px translate-y-0.5 animate-pulse bg-violet-200/65" aria-hidden /></p>
              </div>

              <div className="hidden shrink-0 flex-col gap-1 pt-1 md:flex">
                <span className="font-mono text-[8px] uppercase tracking-[0.17em] text-white/25">Discipline</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">— Interface Design</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">— Frontend Dev</span>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">— Motion</span>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <DeepButton href="#projects">View work</DeepButton>
              <DeepButton href="#contact" secondary>Start a project</DeepButton>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-end justify-between border-t border-white/[0.1] pt-4 sm:pt-5">
          <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 sm:text-[9px] sm:tracking-[0.24em]">Design · Development · Digital</div>
          <button type="button" onClick={() => scrollTo("projects")} className="group flex items-center gap-3 text-right" aria-label="Scroll to explore">
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 transition-colors group-hover:text-white/65 sm:text-[9px] sm:tracking-[0.24em]">Scroll to explore</span>
            <span className="relative h-8 w-px overflow-hidden bg-white/15 sm:h-10">
              <span className="absolute left-0 top-0 w-full bg-violet-200/70" style={{ height: `${((tick % 4) + 1) * 25}%`, transition: "height 1.1s ease-in-out" }} />
            </span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
