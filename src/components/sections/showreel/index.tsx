"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { showRealData, type showReelI } from "@/data/show-reel";
import { Grain } from "./grain";
import { ReelCard } from "./reel-card";
import { VideoModal } from "./video-modal";

function VimeoBackdrop({ item, isActive, mountVideo }: { item: showReelI; isActive: boolean; mountVideo: boolean }) {
  const hasVideo = Boolean(item.vimeoId);
  return (
    <div className="pointer-events-none absolute inset-0" style={{ zIndex: isActive ? 2 : 1, opacity: isActive ? 1 : 0, transition: "opacity 0.7s ease-in-out" }}>
      <img src={item.thumbnail} alt={`${item.title} project preview`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      {hasVideo && mountVideo && (
        <iframe src={`https://player.vimeo.com/video/${item.vimeoId}?background=1&autoplay=1&loop=1&muted=1&dnt=1`} loading="lazy" style={{ position: "absolute", top: "50%", left: "50%", width: "max(100%, 177.78vh)", height: "max(100%, 56.25vw)", transform: "translate(-50%, -50%)", border: 0 }} allow="autoplay; fullscreen" title={item.title} />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-black/50" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-black/20" />
    </div>
  );
}

export default function ShowReel() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [locked, setLocked] = useState(false);
  const [modal, setModal] = useState<showReelI | null>(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const wheelAccumulator = useRef(0);
  const total = showRealData.length;
  const WHEEL_DISTANCE = 180;

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    return () => { if (lockTimer.current) clearTimeout(lockTimer.current); };
  }, []);

  const mountedIndices = useMemo(() => {
    const set = new Set<number>();
    set.add(active);
    if (total > 1) {
      set.add(Math.min(active + 1, total - 1));
      set.add(Math.max(active - 1, 0));
    }
    return set;
  }, [active, total]);

  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  const navigate = useCallback((step: number) => {
    if (locked || modal) return false;
    const next = active + step;
    if (next < 0 || next >= total) return false;
    setDir(step);
    setActive(next);
    setLocked(true);
    wheelAccumulator.current = 0;
    if (lockTimer.current) clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => setLocked(false), 900);
    return true;
  }, [active, locked, modal, total]);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLElement>) => {
    if (isTouch || modal) return;
    const delta = Math.max(-100, Math.min(100, event.deltaY));
    if (Math.abs(delta) < 1) return;

    const step = delta > 0 ? 1 : -1;
    const atFirst = active === 0;
    const atLast = active === total - 1;
    const movingInsideReel = (step > 0 && !atLast) || (step < 0 && !atFirst);

    if (!movingInsideReel && !locked) {
      wheelAccumulator.current = 0;
      return;
    }

    event.preventDefault();
    if (locked) return;

    wheelAccumulator.current += delta;
    if (Math.abs(wheelAccumulator.current) >= WHEEL_DISTANCE) navigate(step);
  }, [active, isTouch, locked, modal, navigate, total]);

  const handleDragStart = useCallback((e: React.PointerEvent) => {
    if (modal) return;
    suppressClick.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
  }, [modal]);

  const handleDragEnd = useCallback((e: React.PointerEvent) => {
    if (!dragStart.current || modal) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragStart.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      suppressClick.current = true;
      navigate(dx < 0 ? 1 : -1);
    }
  }, [modal, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const progress = total <= 1 ? 100 : ((active + 1) / total) * 100;

  return (
    <>
      <Grain />
      <VideoModal item={modal} onClose={() => setModal(null)} />
      <section className="relative w-full bg-black" style={{ height: `${Math.max(total, 2) * 100}vh` }} aria-label="Show Reel">
        <div
          className={`sticky top-0 h-dvh w-full select-none overflow-hidden bg-black md:h-screen ${modal || isTouch ? "cursor-auto" : "cursor-none"}`}
          style={{ touchAction: "pan-y" }}
          onWheel={handleWheel}
          onPointerDown={handleDragStart}
          onPointerUp={handleDragEnd}
          onMouseMove={(e) => { if (!modal) { cursorX.set(e.clientX); cursorY.set(e.clientY); } }}
          onMouseEnter={() => { if (!modal) setCursorVisible(true); }}
          onMouseLeave={() => setCursorVisible(false)}
        >
          {showRealData.map((item, i) => {
            if (!mountedIndices.has(i)) return null;
            return <VimeoBackdrop key={`backdrop-${i}`} item={item} isActive={i === active} mountVideo={isTouch ? i === active : true} />;
          })}

          {!isTouch && (
            <motion.div style={{ x: springX, y: springY }} animate={{ opacity: cursorVisible && !modal ? 1 : 0, scale: cursorVisible && !modal ? 1 : 0.5 }} transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }} className="pointer-events-none fixed left-0 top-0 z-9998 flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
              <svg viewBox="0 0 10 12" className="h-4 w-3.5 translate-x-px fill-white" aria-hidden><polygon points="0,0 10,6 0,12" /></svg>
            </motion.div>
          )}

          <AnimatePresence custom={dir} mode="wait">
            <ReelCard key={active} item={showRealData[active]} index={active} total={total} direction={dir} onOpen={() => { if (!suppressClick.current) setModal(showRealData[active]); }} />
          </AnimatePresence>

          <div className="absolute bottom-8 left-1/2 z-40 w-[min(260px,55vw)] -translate-x-1/2">
            <div className="mb-2 flex items-center justify-between font-mono text-[8px] tracking-[0.28em] text-white/35 uppercase">
              <span>Project {String(active + 1).padStart(2, "0")}</span>
              <span>{String(total).padStart(2, "0")}</span>
            </div>
            <div className="relative h-px w-full overflow-hidden bg-white/15">
              <motion.div className="absolute inset-y-0 left-0 bg-white" animate={{ width: `${progress}%` }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </div>

          <div className="absolute bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
            <motion.button onClick={(e) => { e.stopPropagation(); navigate(-1); }} disabled={active === 0} whileHover={active === 0 ? {} : { scale: 1.1 }} whileTap={active === 0 ? {} : { scale: 0.92 }} className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-25"><ChevronLeft size={18} /></motion.button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: total }).map((_, i) => (
                <motion.button key={i} onClick={(e) => { e.stopPropagation(); if (i !== active && !locked) { setDir(i > active ? 1 : -1); setActive(i); setLocked(true); wheelAccumulator.current = 0; if (lockTimer.current) clearTimeout(lockTimer.current); lockTimer.current = setTimeout(() => setLocked(false), 900); } }} animate={{ width: i === active ? 20 : 6, opacity: i === active ? 1 : 0.35 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="h-1.5 rounded-full bg-white" aria-label={`Go to project ${i + 1}`} />
              ))}
            </div>
            <motion.button onClick={(e) => { e.stopPropagation(); navigate(1); }} disabled={active === total - 1} whileHover={active === total - 1 ? {} : { scale: 1.1 }} whileTap={active === total - 1 ? {} : { scale: 0.92 }} className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-25"><ChevronRight size={18} /></motion.button>
          </div>

          <AnimatePresence>
            {active === 0 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 1.4, duration: 0.6 }} className="absolute bottom-28 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] font-semibold tracking-[0.4em] text-white/25 uppercase">Scroll to Explore ↓</motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
