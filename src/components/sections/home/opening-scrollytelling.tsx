"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import AboutMe from "@/components/sections/about/about-me";
import ShowReel from "@/components/sections/showreel";
import GalaxyButton from "@/components/ui/galaxy-button";

/**
 * Opening narrative: Hero → ShowReel → positioning statement.
 * Progress is scoped to this section so the animation doesn't react to the
 * rest of the page's scroll position.
 */
export default function OpeningScrollytelling() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  const heroY = useTransform(progress, [0, 0.16, 0.34], [0, -24, -120]);
  const heroScale = useTransform(progress, [0, 0.34], [1, 0.92]);
  const heroOpacity = useTransform(progress, [0, 0.28, 0.4], [1, 1, 0]);

  const reelY = useTransform(progress, [0.18, 0.42], [90, 0]);
  const reelScale = useTransform(progress, [0.18, 0.42, 0.76], [0.94, 1, 0.97]);
  const reelOpacity = useTransform(progress, [0.2, 0.38, 0.8], [0, 1, 0]);

  const chapterOpacity = useTransform(progress, [0.7, 0.82, 0.98], [0, 1, 1]);
  const chapterY = useTransform(progress, [0.7, 0.98], [45, 0]);
  const chapterScale = useTransform(progress, [0.7, 0.98], [0.96, 1]);
  const hintOpacity = useTransform(progress, [0.02, 0.14, 0.22], [0, 1, 0]);
  const hintY = useTransform(progress, [0.02, 0.14], [18, 0]);

  const advanceOpening = () => {
    const section = sectionRef.current;
    if (!section) return;

    const currentTop = section.getBoundingClientRect().top + window.scrollY;
    const next = Math.min(
      currentTop + window.innerHeight * 0.95,
      document.documentElement.scrollHeight - window.innerHeight,
    );

    window.scrollTo({ top: next, behavior: "smooth" });
  };

  return (
    <div ref={sectionRef} className="relative h-[260vh] w-full bg-black">
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-black">
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-20 origin-center"
        >
          <section id="hero" className="h-full w-full">
            <AboutMe />
          </section>
        </motion.div>

        <motion.div
          style={{ y: reelY, scale: reelScale, opacity: reelOpacity }}
          className="absolute inset-0 z-10 origin-center"
        >
          <ShowReel />
        </motion.div>

        <motion.div
          style={{ opacity: chapterOpacity, y: chapterY, scale: chapterScale }}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6"
        >
          <div className="pointer-events-auto text-center">
            <p className="mb-5 font-mono text-[9px] tracking-[0.45em] text-white/35 uppercase md:text-[10px]">
              Chapter 01 / What we make
            </p>
            <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
              We build websites
              <br />
              <span className="font-normal italic text-white/35">
                that don&apos;t feel like websites.
              </span>
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-white/40 sm:text-base">
              Designed to look sharp, built to move, and made to give people a
              reason to remember you.
            </p>

            <div className="mt-8 flex justify-center">
              <GalaxyButton onClick={advanceOpening}>Continue</GalaxyButton>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity, y: hintY }}
          className="pointer-events-none absolute left-5 top-1/2 z-40 -translate-y-1/2 sm:left-7 md:left-10"
        >
          <div className="pointer-events-auto">
            <GalaxyButton onClick={advanceOpening} className="rotate-[-90deg] origin-center">
              Scroll to enter
            </GalaxyButton>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
