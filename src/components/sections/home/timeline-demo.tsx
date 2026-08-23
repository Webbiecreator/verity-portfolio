"use client";

import { motion } from "framer-motion";

const projects = [
  {
    number: "01",
    type: "E-COMMERCE / BRAND",
    title: "NOVA",
    description:
      "A conversion-first storefront built around product focus, fast navigation and a visual system that lets the brand breathe.",
    tags: ["Web Design", "Development", "E-commerce"],
    visual: "nova",
  },
  {
    number: "02",
    type: "DIGITAL EXPERIENCE",
    title: "VERITY / LAB",
    description:
      "An experimental digital space exploring depth, motion and editorial storytelling without getting in the user's way.",
    tags: ["Creative Direction", "UI/UX", "Motion"],
    visual: "lab",
  },
  {
    number: "03",
    type: "LOCAL / SERVICE",
    title: "ATELIER",
    description:
      "A premium service website designed to turn a small business into a brand people remember.",
    tags: ["Brand Website", "UX", "Development"],
    visual: "atelier",
  },
];

function ProjectVisual({ kind }: { kind: string }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0a0a0b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.13),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.07),transparent_35%)]" />
      <div className="absolute inset-[8%] rounded-[1.4rem] border border-white/[0.09] bg-black/50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 font-mono text-[8px] tracking-[0.3em] text-white/35 uppercase">
          <span>{kind}</span>
          <span>VERITY / 2026</span>
        </div>
        <div className="relative flex h-[calc(100%-49px)] items-center justify-center overflow-hidden">
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="h-28 w-28 rounded-full border border-white/15 bg-gradient-to-br from-white/[0.16] to-white/[0.02] shadow-[0_30px_80px_rgba(255,255,255,0.08)]"
          />
          <div className="absolute h-px w-2/3 bg-white/10" />
          <div className="absolute bottom-7 left-7 font-mono text-[8px] tracking-[0.25em] text-white/30 uppercase">
            Selected work
          </div>
        </div>
      </div>
    </div>
  );
}

export function TimelineDemo() {
  return (
    <section className="relative w-full bg-black px-5 py-28 text-white sm:px-8 lg:px-12 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-24 flex flex-col gap-8 lg:mb-36 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-5 font-mono text-[9px] tracking-[0.45em] text-white/35 uppercase">
              Chapter 03 / Selected work
            </p>
            <h2 className="max-w-4xl text-5xl font-medium tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              Built to be
              <br />
              <span className="text-white/35">remembered.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/40 lg:pb-2">
            A few imagined and real-world directions showing how we approach digital experiences — clear in purpose, expressive in execution.
          </p>
        </div>

        <div className="space-y-32 lg:space-y-48">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:items-start"
            >
              <div className="flex items-center gap-4 lg:sticky lg:top-24 lg:block">
                <span className="font-mono text-xs tracking-[0.25em] text-white/25">{project.number}</span>
                <span className="h-px w-10 bg-white/15 lg:my-5 lg:block" />
                <span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase lg:block">
                  {project.type}
                </span>
              </div>

              <div>
                <ProjectVisual kind={project.visual} />
                <div className="mt-8 grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <h3 className="text-4xl font-medium tracking-[-0.045em] sm:text-5xl">{project.title}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/40 sm:text-base">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[8px] tracking-[0.16em] text-white/35 uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-32 border-t border-white/[0.08] pt-8 lg:mt-48">
          <p className="font-mono text-[9px] tracking-[0.35em] text-white/25 uppercase">
            More work is being built.
          </p>
        </div>
      </div>
    </section>
  );
}
