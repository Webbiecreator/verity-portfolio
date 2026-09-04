"use client";

import Link from "next/link";
import type { ReactNode } from "react";

interface DeepButtonProps {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}

export default function DeepButton({ href, children, secondary = false }: DeepButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex min-h-11 w-full shrink-0 items-center justify-center overflow-hidden rounded-full border px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap transition-all duration-500 sm:w-auto sm:min-w-36 sm:px-6 sm:tracking-[0.22em] ${
        secondary
          ? "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/20 hover:text-white"
          : "border-white/20 bg-white text-black hover:bg-white/90"
      }`}
    >
      <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-0.5">
        {children}
      </span>
      {!secondary && (
        <span className="absolute inset-x-2 bottom-0 h-8 translate-y-6 rounded-full bg-black/10 blur-xl transition-transform duration-500 group-hover:translate-y-3" />
      )}
    </Link>
  );
}
