"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import DeepButton from "@/components/ui/deep-button";
import CRTWarp from "@/components/ui/crt-warp";
import Dither from "@/components/ui/dither";

const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#10061a] text-white"
    >
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Dither texture — kept behind CRT so it adds texture without affecting scroll */}
        <div className="absolute inset-0 opacity-[0.28] mix-blend-screen">
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

        {/* Perspective grid */}
        <motion.div
          style={{ y: gridY }}
          className="hero-grid absolute -inset-x-1/2 bottom-[-28%] h-[82%] origin-bottom [transform:perspective(900px)_rotateX(58deg)_scale(1.45)] opacity-25"
        />

        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#10061a]/75 via-[#10061a]/15 to-transparent" />

        {/* Ambient violet glow */}
        <motion.div
          animate={{
            x: [0, 100, -40, 0],
            y: [0, -35, 45, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[4%] top-[10%] h-[34rem] w-[34rem] rounded-full bg-fuchsia-300/[0.09] blur-[130px]"
        />

        {/* Ambient blue glow */}
        <motion.div
          animate={{
            x: [0, -80, 50, 0],
            y: [0, 60, -25, 0],
            scale: [1, 0.9, 1.12, 1],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute right-[-8%] top-[26%] h-[30rem] w-[30rem] rounded-full bg-sky-300/[0.07] blur-[140px]"
        />

        <div className="absolute left-1/2 top-[48%] h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045] bg-white/[0.015] blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(16,6,26,0.42)_78%)]" />
      </div>

      {/* Grain */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.025]" />

      {/* Hero */}
      <motion.div
        style={{
          y: heroY,
          scale: heroScale,
          opacity: heroOpacity,
        }}
        className="relative z-20 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col justify-between px-6 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32"
      >
        {/* Top metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/60 md:text-xs">
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1.25, 0.9],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="h-1.5 w-1.5 rounded-full bg-violet-200 shadow-[0_0_18px_rgba(196,181,253,0.8)]"
            />
            Independent digital studio
          </div>

          <div className="hidden text-[10px] uppercase tracking-[0.28em] text-white/45 sm:block md:text-xs">
            India · Worldwide
          </div>
        </div>

        {/* Centered hero content */}
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              filter: "blur(12px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex w-full max-w-7xl flex-col items-center text-center"
          >
            {/* Brand */}
            <motion.p
              initial={{
                opacity: 0,
                letterSpacing: "0.8em",
              }}
              animate={{
                opacity: 1,
                letterSpacing: "0.38em",
              }}
              transition={{
                delay: 0.25,
                duration: 1.2,
              }}
              className="font-ledlight mb-7 text-xs uppercase text-violet-100/75 md:text-sm"
            >
              VERITY
            </motion.p>

            {/* Main statement */}
            <h1 className="font-roadster text-[15vw] font-medium uppercase leading-[0.78] tracking-[-0.055em] drop-shadow-[0_12px_50px_rgba(0,0,0,0.3)] sm:text-[12vw] md:text-[9vw] lg:text-[8.5rem]">
              <span className="block">We build</span>

              <span className="block bg-gradient-to-r from-white via-white to-white/45 bg-clip-text text-transparent">
                websites
              </span>

              <span className="mt-2 block text-white/55">
                that don't feel like
              </span>

              <span className="block bg-gradient-to-r from-violet-100 via-white to-white/40 bg-clip-text text-transparent">
                websites.
              </span>
            </h1>

            {/* Description + CTAs */}
            <div className="mt-9 flex w-full max-w-2xl flex-col items-center gap-7">
              <p className="max-w-xl text-sm leading-7 text-white/60 md:text-base">
                High-quality digital experiences built with sharp design,
                smooth interactions, and attention to every detail.
              </p>

              <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <DeepButton href="#projects">View work</DeepButton>

                <DeepButton href="#contact" secondary>
                  Start a project
                </DeepButton>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom metadata */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex items-end justify-between border-t border-white/[0.1] pt-5"
        >
          <div className="text-[10px] uppercase tracking-[0.24em] text-white/40 md:text-xs">
            Design · Development · Digital
          </div>

          <div className="text-right text-[10px] uppercase tracking-[0.24em] text-white/35 md:text-xs">
            Scroll to explore
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
