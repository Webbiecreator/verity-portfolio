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
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[18%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[140px]" />
        <div className="absolute right-[-10%] top-[30%] h-[300px] w-[300px] rounded-full bg-white/[0.025] blur-[120px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.035]" />

      <motion.div
        style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col justify-between px-6 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/45 md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
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
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-white/35 md:text-sm">
              VERITY
            </p>

            <h1 className="text-[16vw] font-medium leading-[0.82] tracking-[-0.075em] sm:text-[14vw] md:text-[11vw]">
              Build
              <br />
              <span className="text-white/35">better.</span>
            </h1>

            <div className="mt-8 flex max-w-2xl flex-col gap-6 md:ml-[11vw] md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-sm leading-7 text-white/50 md:text-base">
                High-quality websites built with sharp design, smooth
                interactions, and attention to every detail.
              </p>

              <div className="flex flex-wrap gap-3">
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
