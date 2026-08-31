"use client";

import { motion } from "framer-motion";

interface DitherProps {
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  waveColor?: [number, number, number];
  backgroundColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  disableAnimation?: boolean;
  enableMouseInteraction?: boolean;
  mouseRadius?: number;
}

function rgb(color: [number, number, number]) {
  return `rgb(${Math.round(color[0] * 255)}, ${Math.round(color[1] * 255)}, ${Math.round(color[2] * 255)})`;
}

export default function Dither({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  backgroundColor = [0, 0, 0],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
}: DitherProps) {
  const duration = disableAnimation ? 0 : Math.max(12, 7 / Math.max(waveSpeed, 0.01));
  const dotSize = Math.max(1, Math.min(3, pixelSize));
  const spacing = Math.max(10, 8 + waveFrequency * 3);
  const intensity = Math.max(0.12, Math.min(0.38, waveAmplitude * 0.55));
  const dots = rgb(waveColor);
  const background = rgb(backgroundColor);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <motion.div
        aria-hidden
        className="absolute -inset-[20%]"
        style={{
          backgroundColor: background,
          backgroundImage: `radial-gradient(circle, ${dots} ${dotSize}px, transparent ${dotSize + 0.5}px)`,
          backgroundSize: `${spacing}px ${spacing}px`,
          opacity: intensity,
          filter: `contrast(${Math.max(1, colorNum / 2)})`,
        }}
        animate={disableAnimation ? undefined : { backgroundPosition: ["0px 0px", `${spacing * 2}px ${spacing}px`] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        aria-hidden
        className="absolute -inset-[25%]"
        style={{
          background: `radial-gradient(ellipse at 30% 45%, ${dots} 0%, transparent 42%)`,
          opacity: intensity * 0.75,
          mixBlendMode: "screen",
        }}
        animate={disableAnimation ? undefined : { x: ["-8%", "12%", "-8%"], y: ["3%", "-4%", "3%"] }}
        transition={{ duration: duration * 1.45, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.28) 50%, transparent 100%)",
          opacity: 0.8,
        }}
      />
    </div>
  );
}
