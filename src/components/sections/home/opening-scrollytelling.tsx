"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import AboutMe from "@/components/sections/about/about-me";
import ShowReel from "@/components/sections/showreel";
import GalaxyButton from "@/components/ui/galaxy-button";

/**
 * Opening narrative: Hero → ShowReel → positioning statement.
 * The three chapters now each occupy roughly one viewport of scroll distance.
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

  const heroY = useTransform(progress, [0, 0.17, 0.31], [0, -24, -120]);
  const heroScale = useTransform(progress, [0, 0.31], [1, 0.92]);
  const heroOpacity = useTransform(progress, [0, 0.27, 0.36], [1, 1, 0]);

  const reelY = useTransform(progress, [0.30, 0.38, 0.67], [90, 30, 0]);
  const reelScale = useTransform(progress, [0.30, 0.38, 0.67], [0.94, 1, 1]);
  const reelOpacity = useTransform(progress, [0.31, 0.36, 0.69], [0, 1, 0]);

  const chapterOpacity = useTransform(progress, [0.64, 0.72, 0.99], [0, 1, 1]);
  const chapterY = useTransform(progress, [0.64, 0.99], [45, 0]);
  const chapterScale = useTransform(progress, [0.64, 0.99], [0.96, 1]);

  const advanceToStory = () => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    aboutSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div ref={sectionRef} className="relative h-[300vh] w-full bg-black">
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
              <GalaxyButton onClick={advanceToStory}>Continue</GalaxyButton>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
