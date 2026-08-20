"use client";

import type { ReactNode } from "react";

interface GalaxyButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function GalaxyButton({ children, onClick, className = "" }: GalaxyButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-black/40 px-5 py-3 font-mono text-[9px] font-semibold tracking-[0.32em] text-white/75 uppercase backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:text-white ${className}`}
      aria-label="Continue scrolling"
    >
      <span className="absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_100%,rgba(120,160,255,0.38),transparent_65%)]" />
      <span className="relative flex size-4 items-center justify-center overflow-hidden rounded-full border border-white/25">
        <span className="size-1.5 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)] transition-transform duration-500 group-hover:scale-150" />
      </span>
      <span>{children}</span>
      <span className="text-white/30 transition-transform duration-500 group-hover:translate-y-0.5">↓</span>
    </button>
  );
}
