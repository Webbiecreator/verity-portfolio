"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const COLS = 12;
const ROWS = 8;
const TILES = Array.from({ length: COLS * ROWS }, (_, index) => ({
  index,
  row: Math.floor(index / COLS),
  col: index % COLS,
}));

// Temporary visual reference for the prototype. Replace this single URL with
// our final licensed/local hero image once we choose the exact artwork.
const REVEAL_IMAGE =
  "https://images.unsplash.com/photo-1715678907084-6245f67e8124?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=60&w=2400";

function Fragment({
  row,
  col,
  index,
  progress,
}: {
  row: number;
  col: number;
  index: number;
  progress: MotionValue<number>;
}) {
  // Reveal in a loose diagonal / skyline wave rather than simple row order.
  const order = (row * 1.7 + col * 0.95 + ((row + col) % 3) * 0.35) / (ROWS * 1.7 + COLS);
  const start = 0.03 + order * 0.72;
  const end = Math.min(start + 0.08, 0.94);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const scale = useTransform(progress, [start, end], [0.76, 1]);
  const y = useTransform(progress, [start, end], [18, 0]);
  const blur = useTransform(progress, [start, end], [10, 0]);

  const positionX = COLS === 1 ? 50 : (col / (COLS - 1)) * 100;
  const positionY = ROWS === 1 ? 50 : (row / (ROWS - 1)) * 100;

  return (
    <motion.div
      style={{ opacity, scale, y, filter: blur.get() ? undefined : undefined }}
      className="relative overflow-hidden bg-[#101010]"
      aria-hidden
    >
      <motion.div
        style={{
          backgroundImage: `url(${REVEAL_IMAGE})`,
          backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
          backgroundPosition: `${positionX}% ${positionY}%`,
          filter: blur,
        }}
        className="absolute inset-0"
      />
      <motion.div
        style={{
          opacity: useTransform(progress, [start, Math.min(start + 0.14, 1)], [0.2, 0]),
        }}
        className="absolute inset-0 bg-white"
      />
      <div className="pointer-events-none absolute inset-0 border border-white/[0.055]" />
      <span className="sr-only">Fragment {index + 1}</span>
    </motion.div>
  );
}

export default function BuildingLightsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    mass: 0.38,
  });

  const imageScale = useTransform(progress, [0, 0.76, 1], [1.04, 1, 1.01]);
  const titleOpacity = useTransform(progress, [0.78, 0.93], [0, 1]);
  const titleY = useTransform(progress, [0.78, 0.96], [28, 0]);
  const overlayOpacity = useTransform(progress, [0, 0.82, 1], [0.85, 0.28, 0.5]);
  const hintOpacity = useTransform(progress, [0, 0.18, 0.24], [1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[520vh] w-full bg-black">
      <div className="sticky top-0 flex h-dvh w-full items-center justify-center overflow-hidden bg-[#020304]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(83,126,186,0.11),transparent_46%)]" />

        <motion.div
          style={{ scale: imageScale }}
          className="relative h-[82vh] w-[min(92vw,1280px)] overflow-hidden border border-white/[0.06] bg-[#090b0d] shadow-[0_50px_140px_rgba(0,0,0,0.72)]"
        >
          <div className="absolute inset-0 bg-[#07090b]" />

          <div className="relative grid h-full grid-cols-6 gap-[2px] p-[2px] sm:grid-cols-8 lg:grid-cols-12">
            {TILES.map((tile) => (
              <Fragment
                key={tile.index}
                row={tile.row}
                col={tile.col}
                index={tile.index}
                progress={progress}
              />
            ))}
          </div>

          <motion.div
            style={{ opacity: overlayOpacity }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_26%,rgba(0,0,0,0.9)_100%)]"
          />

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,7,0.18),transparent_25%,transparent_72%,rgba(3,5,7,0.3))]" />
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.4em] text-white/35 uppercase"
        >
          Keep scrolling
        </motion.div>

        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="pointer-events-none absolute inset-x-0 bottom-[8%] flex justify-center px-6 text-center"
        >
          <div>
            <p className="mb-4 font-mono text-[9px] tracking-[0.45em] text-white/35 uppercase md:text-[10px]">
              Chapter 02 / Inside the build
            </p>
            <h2 className="max-w-5xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
              Every detail
              <br />
              <span className="font-normal italic text-white/35">reveals the bigger picture.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/40 sm:text-base">
              A single experience, built from hundreds of small decisions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
