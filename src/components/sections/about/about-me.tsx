"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import DeepButton from "@/components/ui/deep-button";

const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#050506] text-white"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-grid absolute inset-0 opacity-40" />
        <motion.div
          animate={{ x: [0, 100, -40, 0], y: [0, -35, 45, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[12%] h-[36rem] w-[36rem] rounded-full bg-violet-400/[0.055] blur-[150px]"
        />
        <motion.div
          animate={{ x: [0, -80, 50, 0], y: [0, 60, -25, 0], scale: [1, 0.9, 1.12, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-10%] top-[28%] h-[32rem] w-[32rem] rounded-full bg-sky-300/[0.045] blur-[150px]"
        />
        <div className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035] bg-white/[0.01] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050506_72%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.035]" />

      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col justify-between px-6 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/45 md:text-xs">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.25, 0.9] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-violet-200 shadow-[0_0_18px_rgba(196,181,253,0.8)]"
            />
            Independent digital studio
          </div>
          <div className="hidden text-[10px] uppercase tracking-[0.28em] text-white/30 sm:block md:text-xs">
            India · Worldwide
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.8em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.25, duration: 1.2 }}
              className="font-ledlight mb-5 text-sm uppercase text-violet-100/60 md:text-base"
            >
              VERITY
            </motion.p>

            <h1 className="font-roadster text-[17vw] font-medium leading-[0.8] tracking-[-0.065em] sm:text-[14vw] md:text-[11vw]">
              <span className="inline-block">Build</span>
              <br />
              <span className="bg-gradient-to-r from-white via-white to-white/30 bg-clip-text text-transparent">
                better.
              </span>
            </h1>

            <div className="mt-9 flex max-w-3xl flex-col gap-7 md:ml-[11vw] md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-sm leading-7 text-white/50 md:text-base">
                High-quality websites built with sharp design, smooth
                interactions, and attention to every detail.
              </p>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
                <DeepButton href="#projects">View work</DeepButton>
                <DeepButton href="#contact" secondary>
                  Start a project
                </DeepButton>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between border-t border-white/[0.08] pt-5"
        >
          <div className="text-[10px] uppercase tracking-[0.24em] text-white/30 md:text-xs">
            Design · Development · Digital
          </div>
          <div className="text-right text-[10px] uppercase tracking-[0.24em] text-white/25 md:text-xs">
            Scroll to explore
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
