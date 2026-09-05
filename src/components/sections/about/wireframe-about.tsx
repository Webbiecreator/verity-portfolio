"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const capabilities = [
  "Interface Design",
  "Motion & Interaction",
  "Design Systems",
  "Creative Direction",
  "Frontend Development",
  "React / Next.js",
  "Three.js / WebGL",
  "Typography & Layout",
];

const processSteps = [
  ["01", "Understand", "Immersive research into context, constraints, and the people who will live inside the work."],
  ["02", "Define", "Clear problem framing, success criteria, and a creative brief tight enough to generate real ideas."],
  ["03", "Make", "Rapid generation across fidelities — rough concept sketches to functional prototypes."],
  ["04", "Refine", "Surgical iteration on what works, honest elimination of what doesn't."],
];

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex border border-white/15 bg-[#0d0d0b] px-2 py-1 font-mono text-[9px] tracking-[0.08em] text-[#f0efe9] uppercase">
      {children}
    </span>
  );
}

export default function WireframeAbout() {
  return (
    <section id="about" className="w-full border-t border-[#5a5a54] bg-[#0d0d0b] text-[#f0efe9]">
      <div className="px-6 py-20 sm:px-8 md:px-16 md:py-28">
        <div className="mb-16 flex flex-wrap items-center gap-3">
          <Label>§ 04 — About</Label>
          <Label>Verity — Designer &amp; Developer</Label>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl font-display text-[clamp(42px,6vw,80px)] font-light italic leading-[1.02] tracking-[-0.03em]"
            >
              "I make things on the internet that are hard to look away from."
            </motion.h2>
            <p className="mt-8 max-w-xl border-l border-[#f0efe9]/50 pl-5 font-display text-base font-light italic leading-relaxed text-[#f0efe9]/65">
              Building at the intersection of design and engineering — making work that lives between the two disciplines and is claimed by neither.
            </p>
          </div>

          <div className="lg:col-span-4 lg:self-end">
            <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-[#171714]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_49.7%,rgba(240,239,233,0.18)_50%,transparent_50.3%),linear-gradient(45deg,transparent_49.7%,rgba(240,239,233,0.18)_50%,transparent_50.3%)]" />
              <div className="absolute bottom-3 right-3">
                <Label>Portrait — replace asset</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <p className="mb-6 font-mono text-[10px] tracking-[0.2em] text-[#f0efe9]/50 uppercase">Capabilities</p>
          <div className="grid grid-cols-1 border border-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.035, duration: 0.45 }}
                className="group border-b border-r border-white/15 px-4 py-4 font-mono text-[11px] tracking-[0.1em] text-[#f0efe9]/75 uppercase hover:bg-[#f0efe9] hover:text-[#0d0d0b]"
              >
                {cap}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#5a5a54] pt-16">
          <p className="mb-8 font-mono text-[10px] tracking-[0.2em] text-[#f0efe9]/50 uppercase">Process</p>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map(([step, label, description]) => (
              <div key={step} className="flex flex-col gap-3">
                <div className="font-display text-5xl font-black leading-none text-[#f0efe9]/20">{step}</div>
                <div className="font-mono text-[11px] tracking-[0.12em] uppercase">{label}</div>
                <p className="font-display text-sm font-light italic leading-relaxed text-[#f0efe9]/55">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 border border-white/15 sm:grid-cols-3">
          {[
            ["8+", "Years in practice"],
            ["40+", "Projects shipped"],
            ["3", "Design awards"],
          ].map(([num, label]) => (
            <div key={label} className="border-b border-white/15 px-6 py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
              <div className="font-display text-5xl font-black leading-none">{num}</div>
              <div className="mt-2 font-mono text-[10px] tracking-widest text-[#f0efe9]/40 uppercase">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
