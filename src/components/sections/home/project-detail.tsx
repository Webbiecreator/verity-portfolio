"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const details = [
  ["Client", "Meridian Media Group"],
  ["Scope", "Research · Design · Development"],
  ["Duration", "14 weeks"],
  ["Year", "2024"],
  ["URL", "meridianreads.com ↗"],
] as const;

const narrative = [
  {
    label: "01 — Context",
    body: "Meridian's editorial team had outgrown their CMS. Reader sessions were dropping as visual complexity increased. The content was world-class; the container wasn't.",
  },
  {
    label: "02 — Approach",
    body: "Typography became infrastructure. A visual rhythm system was built from the ground up — flexible enough for breaking news, long reads, and multimedia essays.",
  },
  {
    label: "03 — Outcome",
    body: "+38% average session depth. Reader retention increased by 22% in the first quarter post-launch. The editorial team now designs with the system, not against it.",
  },
] as const;

function MediaPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden border border-white/[0.09] bg-white/[0.025] ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.10),transparent_28%),linear-gradient(135deg,transparent_49.8%,rgba(255,255,255,0.08)_50%,transparent_50.2%),linear-gradient(45deg,transparent_49.8%,rgba(255,255,255,0.05)_50%,transparent_50.2%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[8px] tracking-[0.28em] text-white/25 uppercase">{label}</span>
      </div>
    </div>
  );
}

export default function ProjectDetail() {
  const heroRef = useRef<HTMLDivElement>(null);
  const inView = useInView(heroRef, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="project-detail" className="relative w-full overflow-hidden border-t border-white/[0.08] bg-[#070708] text-white">
      <div className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mb-14 flex flex-wrap items-center gap-3 sm:mb-20 sm:gap-5">
          <span className="font-mono text-[8px] tracking-[0.32em] text-white/35 uppercase">Chapter 04 / Project detail</span>
          <span className="font-mono text-[8px] tracking-[0.22em] text-white/20 uppercase">Meridian — Case study</span>
          <span className="border border-dashed border-white/20 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.12em] text-white/25 uppercase">Deep link</span>
        </div>

        <div ref={heroRef} className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_0.42fr] lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7 }}>
            <p className="mb-4 font-mono text-[8px] tracking-[0.28em] text-white/25 uppercase">01 — Meridian / 2024</p>
            <h2 className="max-w-4xl text-[clamp(4rem,10vw,9rem)] font-medium leading-[0.82] tracking-[-0.065em]">
              Editorial<br />
              <span className="font-light italic text-white/35">Platform</span><br />
              Redesign
            </h2>

            <div className="relative mt-10 overflow-hidden sm:mt-14">
              <motion.div style={{ y: imageY }} className="h-56 sm:h-72 lg:h-80">
                <MediaPlaceholder label="Hero image / parallax" className="h-full" />
              </motion.div>
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, delay: 0.12 }} className="lg:pt-24">
            <div className="sticky top-10 border border-white/[0.10] bg-white/[0.018] p-5 sm:p-6">
              <div className="space-y-5">
                {details.map(([key, value]) => (
                  <div key={key}>
                    <div className="font-mono text-[8px] tracking-[0.18em] text-white/25 uppercase">{key}</div>
                    <div className="mt-1 text-sm font-light text-white/75">{value}</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 font-mono text-[8px] tracking-[0.18em] text-white/20 uppercase">Metadata panel / sticky</p>
          </motion.aside>
        </div>

        <div className="relative mt-14 sm:mt-20 lg:mt-28">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
            <motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }} className="h-[380px] sm:h-[520px] lg:h-[620px]">
              <MediaPlaceholder label="Primary visual / desktop" className="h-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65, delay: 0.1 }} className="lg:-ml-24 lg:mb-12">
              <MediaPlaceholder label="Secondary / mobile" className="h-64 sm:h-72 lg:h-80" />
            </motion.div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px border border-white/[0.10] bg-white/[0.10] sm:mt-20 md:grid-cols-3">
          {narrative.map(({ label, body }) => (
            <motion.article key={label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55 }} className="bg-[#070708] p-6 sm:p-8">
              <div className="mb-5 font-mono text-[8px] tracking-[0.22em] text-white/30 uppercase">{label}</div>
              <p className="max-w-sm text-sm font-light leading-relaxed text-white/55">{body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-white/[0.10] pt-7 sm:mt-20">
          <button type="button" className="group flex items-center gap-3 text-left" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
            <span><span className="block font-mono text-[8px] tracking-[0.18em] text-white/25 uppercase">Previous</span><span className="text-sm text-white/60">Selected work</span></span>
          </button>
          <button type="button" className="group flex items-center gap-3 text-right" onClick={() => setActive(true)}>
            <span><span className="block font-mono text-[8px] tracking-[0.18em] text-white/25 uppercase">Next</span><span className="text-sm text-white/60">About Verity</span></span>
            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Continue to About">
          <div className="w-full max-w-md border border-white/15 bg-[#0b0b0c] p-7 sm:p-9">
            <div className="font-mono text-[8px] tracking-[0.25em] text-white/30 uppercase">Chapter 05</div>
            <h3 className="mt-4 text-4xl font-medium tracking-[-0.05em]">About Verity</h3>
            <p className="mt-4 text-sm leading-relaxed text-white/45">The next chapter is ready. Continue into the studio, process and capabilities.</p>
            <div className="mt-7 flex gap-3">
              <button type="button" onClick={() => { setActive(false); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }} className="flex-1 border border-white/20 px-4 py-3 font-mono text-[9px] tracking-[0.18em] uppercase transition-colors hover:border-white/50">Continue →</button>
              <button type="button" onClick={() => setActive(false)} className="px-4 py-3 font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase">Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
