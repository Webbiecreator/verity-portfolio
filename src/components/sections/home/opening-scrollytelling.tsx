"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import AboutMe from "@/components/sections/about/about-me";
import ShowReel from "@/components/sections/showreel";

/**
 * Opening narrative: Hero → ShowReel → chapter title.
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
  const hintOpacity = useTransform(progress, [0.05, 0.28], [0, 0.7]);

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
          <div className="text-center">
            <p className="mb-5 font-mono text-[9px] tracking-[0.45em] text-white/35 uppercase md:text-[10px]">
              Chapter 01 / The Story
            </p>
            <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
              Behind every piece of work
              <br />
              <span className="font-normal italic text-white/35">there&apos;s a story.</span>
            </h2>
            <div className="mx-auto mt-8 h-px w-20 bg-white/20" />
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-40 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-white/50 uppercase"
        >
          Scroll to enter
        </motion.div>
      </div>
    </div>
  );
}
