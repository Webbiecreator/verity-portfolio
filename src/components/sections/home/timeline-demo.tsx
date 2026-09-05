"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Dither from "@/components/ui/dither";

const projects = [
  { number: "01", type: "E-COMMERCE / BRAND", title: "NOVA", description: "A conversion-first storefront built around product focus, fast navigation and a visual system that lets the brand breathe.", tags: ["Web Design", "Development", "E-commerce"], visual: "nova" },
  { number: "02", type: "DIGITAL EXPERIENCE", title: "VERITY / LAB", description: "An experimental digital space exploring depth, motion and editorial storytelling without getting in the user's way.", tags: ["Creative Direction", "UI/UX", "Motion"], visual: "lab" },
  { number: "03", type: "LOCAL / SERVICE", title: "ATELIER", description: "A premium service website designed to turn a small business into a brand people remember.", tags: ["Brand Website", "UX", "Development"], visual: "atelier" },
];

function ProjectVisual({ kind, number }: { kind: string; number: string }) {
  return (
    <div className="relative h-full min-h-[52svh] overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-[#080809] lg:min-h-0 lg:rounded-[2rem]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.07),transparent_34%)]" />
      <div className="absolute inset-[7%] rounded-[1.2rem] border border-white/[0.09] bg-black/55 shadow-2xl lg:inset-[8%] lg:rounded-[1.4rem]">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3 font-mono text-[7px] tracking-[0.28em] text-white/30 uppercase sm:px-5 sm:py-4 sm:text-[8px]">
          <span>{kind}</span><span>VERITY / 2026</span>
        </div>
        <div className="relative flex h-[calc(100%-45px)] items-center justify-center overflow-hidden sm:h-[calc(100%-49px)]">
          <motion.div animate={{ y: [0, -10, 0], rotate: [0, 2, 0], scale: [1, 1.04, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="h-28 w-28 rounded-full border border-white/15 bg-gradient-to-br from-white/[0.16] to-white/[0.02] shadow-[0_30px_80px_rgba(255,255,255,0.08)] sm:h-36 sm:w-36 lg:h-44 lg:w-44" />
          <div className="absolute h-px w-2/3 bg-white/10" />
          <div className="absolute bottom-5 left-5 font-mono text-[7px] tracking-[0.25em] text-white/25 uppercase sm:bottom-7 sm:left-7 sm:text-[8px]">Selected work / {number}</div>
        </div>
      </div>
    </div>
  );
}

export function TimelineDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLElement | null)[]>([]);
  const activeProjectRef = useRef(0);
  const wheelLockedRef = useRef(false);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateActive = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const next = Math.min(projects.length - 1, Math.floor(progress * projects.length));
      if (next !== activeProjectRef.current) {
        activeProjectRef.current = next;
        setActiveProject(next);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const active = rect.top <= 8 && rect.bottom > window.innerHeight * 0.35;
      if (!active || Math.abs(event.deltaY) < 8 || wheelLockedRef.current) return;
      const direction = event.deltaY > 0 ? 1 : -1;
      const next = activeProjectRef.current + direction;
      if (next < 0 || next >= projects.length) return;
      event.preventDefault();
      wheelLockedRef.current = true;
      activeProjectRef.current = next;
      setActiveProject(next);
      projectRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => { wheelLockedRef.current = false; }, 750);
    };

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    updateActive();
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const progress = ((activeProject + 1) / projects.length) * 100;

  return (
    <section ref={sectionRef} id="projects" className="relative w-full overflow-hidden bg-black text-white" style={{ height: `${projects.length * 100}svh` }}>
      {projects.map((project, index) => (
        <div key={`marker-${project.number}`} ref={(node) => { projectRefs.current[index] = node; }} className="pointer-events-none absolute left-0 h-px w-px" style={{ top: `${index * 100}svh` }} aria-hidden="true" />
      ))}

      <div className="pointer-events-none absolute inset-0 opacity-30">
        <Dither waveSpeed={0.035} waveFrequency={3} waveAmplitude={0.3} waveColor={[0.5, 0.5, 0.5]} backgroundColor={[0, 0, 0]} colorNum={4} pixelSize={2} enableMouseInteraction={false} />
      </div>

      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 sm:gap-5">
            <p className="font-mono text-[8px] tracking-[0.38em] text-white/35 uppercase sm:text-[9px]">Chapter 03 / Selected work</p>
            <span className="font-mono text-[8px] tracking-[0.2em] text-white/25 sm:text-[9px]">{String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            {projects.map((project, index) => <span key={project.number} className={`font-mono text-[8px] tracking-[0.2em] uppercase transition-opacity ${index === activeProject ? "text-white" : "text-white/20"}`}>{project.title}</span>)}
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center">
          <div className="mx-auto grid h-full w-full max-w-[1500px] grid-cols-1 gap-5 px-5 py-7 sm:px-8 sm:py-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-10 lg:px-12 lg:py-12">
            <div className="flex flex-col justify-between lg:py-4">
              <div>
                <p className="mb-5 font-mono text-[8px] tracking-[0.3em] text-white/25 uppercase">Built to be remembered.</p>
                <div className="flex items-center gap-4"><span className="font-mono text-xs tracking-[0.25em] text-white/25">{projects[activeProject].number}</span><span className="h-px w-10 bg-white/15" /><span className="font-mono text-[8px] tracking-[0.3em] text-white/30 uppercase">{projects[activeProject].type}</span></div>
                <motion.h2 key={projects[activeProject].title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className="mt-7 text-5xl font-medium tracking-[-0.06em] sm:text-6xl lg:text-8xl">{projects[activeProject].title}</motion.h2>
                <motion.p key={`${projects[activeProject].title}-description`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.08 }} className="mt-5 max-w-md text-sm leading-relaxed text-white/40 sm:text-base">{projects[activeProject].description}</motion.p>
              </div>
              <div className="mt-6 hidden lg:block">
                <div className="mb-3 flex flex-wrap gap-2">{projects[activeProject].tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[8px] tracking-[0.16em] text-white/35 uppercase">{tag}</span>)}</div>
                <button className="group flex w-full items-center justify-between border border-white/20 px-5 py-3 transition-colors hover:border-white/50"><span className="font-mono text-[9px] tracking-[0.2em] uppercase">View project</span><span className="transition-transform group-hover:translate-x-1">→</span></button>
              </div>
            </div>

            <div className="min-h-0">
              {projects.map((project, index) => (
                <div key={project.number} className="absolute inset-x-5 top-1/2 hidden h-[calc(100%-7rem)] -translate-y-1/2 sm:inset-x-8 sm:h-[calc(100%-8rem)] lg:inset-x-auto lg:right-12 lg:block lg:w-[62%]">
                  <motion.div initial={false} animate={{ opacity: index === activeProject ? 1 : 0, scale: index === activeProject ? 1 : 0.97, pointerEvents: index === activeProject ? "auto" : "none" }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="h-full"><ProjectVisual kind={project.visual} number={project.number} /></motion.div>
                </div>
              ))}
              <div className="lg:hidden"><ProjectVisual kind={projects[activeProject].visual} number={projects[activeProject].number} /><div className="mt-4 flex flex-wrap gap-2">{projects[activeProject].tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[8px] tracking-[0.16em] text-white/35 uppercase">{tag}</span>)}</div></div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-4 border-t border-white/[0.08] px-5 py-4 sm:px-8 lg:px-12"><span className="font-mono text-[8px] tracking-[0.2em] text-white/25 uppercase">Progress</span><div className="h-px flex-1 bg-white/10"><motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.45 }} className="h-full bg-white" /></div><span className="font-mono text-[8px] tracking-[0.2em] text-white/25">{Math.round(progress)}%</span></div>
      </div>
    </section>
  );
}
