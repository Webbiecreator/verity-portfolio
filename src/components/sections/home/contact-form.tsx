"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="mx-auto w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 text-left backdrop-blur-2xl md:p-8"
    >
      <div className="mb-7">
        <p className="font-mono text-[9px] tracking-[0.35em] text-white/30 uppercase">
          Let&apos;s Talk / 01
        </p>
        <h4 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white md:text-3xl">
          Tell me what you&apos;re building.
        </h4>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <input
          required
          name="name"
          placeholder="Your name"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25"
        />
      </div>

      <input
        name="project"
        placeholder="What are we making?"
        className="mt-3 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25"
      />

      <textarea
        name="message"
        placeholder="A few words about the project..."
        rows={5}
        className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-white/25 focus:border-white/25"
      />

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-xs leading-5 text-white/30">
          Your details stay in the browser for now. Database wiring comes later.
        </p>
        <button
          type="submit"
          className="shrink-0 rounded-full border border-white/20 bg-white px-5 py-3 text-[10px] font-semibold tracking-[0.2em] text-black uppercase transition-transform duration-300 hover:-translate-y-0.5"
        >
          {submitted ? "Sent" : "Start a conversation"}
        </button>
      </div>
    </form>
  );
}
