"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import AboutMe from "@/components/sections/about/about-me";
import ShowReel from "@/components/sections/showreel";

/**
 * The opening narrative pins the viewport while the Hero hands off to the
 * ShowReel. Scroll controls the transition instead of requiring a separate
 * navigation action.
 */
export default function OpeningScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
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
  const reelScale = useTransform(progress, [0.18, 0.42], [0.94, 1]);
  const reelOpacity = useTransform(progress, [0.2, 0.38], [0, 1]);
  const hintOpacity = useTransform(progress, [0.05, 0.28], [0, 0.7]);

  return (
    <div ref={containerRef} className="relative h-[220vh] w-full">
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
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-40 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-white/50 uppercase"
        >
          Scroll to enter
        </motion.div>
      </div>
    </div>
  );
}
