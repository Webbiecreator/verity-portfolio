"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

const links = [
  ["GitHub", "https://github.com/Webbiecreator"],
];

export default function WireframeContact() {
  const [hovered, setHovered] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const project = String(form.get("project") || "").trim();

    if (!name || !email || !project) {
      setStatus("Fill in all fields before sending.");
      return;
    }

    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${project}`);
    window.location.href = `mailto:v@verity.studio?subject=${subject}&body=${body}`;
    setStatus("Opening your email client…");
  }

  return (
    <section id="contact" className="relative w-full overflow-hidden border-t border-[#b8b7ae] bg-[#f0efe9] text-[#0d0d0b]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(#b8b7ae_1px,transparent_1px),linear-gradient(90deg,#b8b7ae_1px,transparent_1px)] [background-size:60px_60px]" />

      <div className="relative px-6 py-20 sm:px-8 md:px-16 md:py-28">
        <div className="mb-16 flex flex-wrap items-center gap-3">
          <span className="border border-[#b8b7ae] bg-[#f0efe9] px-2 py-1 font-mono text-[9px] tracking-[0.08em] text-[#5a5a54] uppercase">§ 05 — Contact</span>
          <span className="border border-dashed border-[#5a5a54] px-2 py-1 font-mono text-[9px] tracking-[0.08em] text-[#5a5a54] uppercase">form — interactive</span>
        </div>

        <div className="mb-16 md:mb-20">
          <motion.h2
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={{ opacity: hovered ? 0.42 : 1 }}
            transition={{ duration: 0.7 }}
            className="cursor-default font-display text-[clamp(54px,10vw,148px)] font-black leading-[0.86] tracking-[-0.05em]"
          >
            Let&apos;s make
            <br />
            <span className="font-light italic text-[#5a5a54]">something</span>
            <br />
            worth
            <br />
            remembering.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="mb-8 font-mono text-[10px] tracking-[0.2em] text-[#5a5a54] uppercase">Start a conversation</p>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] tracking-widest text-[#5a5a54] uppercase">Your name</span>
              <input required name="name" type="text" placeholder="Your name" className="w-full border border-[#b8b7ae] bg-transparent px-4 py-3 font-display text-base font-light italic outline-none transition-colors placeholder:text-[#b8b7ae] focus:border-[#0d0d0b]" />
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] tracking-widest text-[#5a5a54] uppercase">Email address</span>
              <input required name="email" type="email" placeholder="you@example.com" className="w-full border border-[#b8b7ae] bg-transparent px-4 py-3 font-display text-base font-light italic outline-none transition-colors placeholder:text-[#b8b7ae] focus:border-[#0d0d0b]" />
            </label>

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] tracking-widest text-[#5a5a54] uppercase">Tell me about your project</span>
              <textarea required name="project" rows={6} placeholder="What are you building, and why does it matter?" className="w-full resize-none border border-[#b8b7ae] bg-transparent px-4 py-3 font-display text-base font-light italic outline-none transition-colors placeholder:text-[#b8b7ae] focus:border-[#0d0d0b]" />
            </label>

            <button type="submit" className="group flex w-full items-center justify-between border border-[#0d0d0b] bg-[#0d0d0b] px-6 py-4 text-[#f0efe9] transition-transform hover:-translate-y-0.5">
              <span className="font-mono text-[12px] tracking-[0.15em] uppercase">Send message</span>
              <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </button>

            {status && <p className="font-mono text-[9px] tracking-widest text-[#5a5a54] uppercase">{status}</p>}
          </form>

          <div className="flex flex-col justify-between">
            <div className="space-y-10">
              <div>
                <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-[#5a5a54] uppercase">Direct</p>
                <a href="mailto:v@verity.studio" className="block font-display text-[clamp(26px,4vw,42px)] font-black tracking-[-0.03em] transition-opacity hover:opacity-50">v@verity.studio ↗</a>
              </div>

              <div>
                <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-[#5a5a54] uppercase">Elsewhere</p>
                <div>
                  {links.map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex items-center gap-3 border-b border-[#b8b7ae] py-3 font-mono text-[11px] tracking-[0.08em] uppercase">
                      <span className="opacity-70 transition-opacity group-hover:opacity-100">{label}</span>
                      <span className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <footer className="mt-16 border-t border-[#b8b7ae] pt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-display text-xl font-black tracking-tight">Verity</span>
                <span className="font-mono text-[9px] tracking-widest text-[#5a5a54] uppercase">© {new Date().getFullYear()} — Crafted on the web</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
