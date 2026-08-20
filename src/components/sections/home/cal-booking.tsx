"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PhraseAnimation from "@/components/common/phrase-reveal";
import ContactForm from "./contact-form";

const CalBooking = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "0px 0px -80px 0px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yForm = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={containerRef} className="w-full overflow-hidden px-4 py-20 md:px-8 md:py-28">
      <div ref={headerRef} className="mx-auto mb-14 max-w-5xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-4 w-fit rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-white/35"
        >
          Let&apos;s Talk
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            <PhraseAnimation phrase="Let&apos;s  build  something" />
            <span className="block text-white/35">
              <PhraseAnimation phrase="worth  scrolling  for." className="text-white/60" />
            </span>
          </h3>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/35 md:text-base"
        >
          A frontend-first contact experience for now. The secure database and
          submission pipeline will be connected once the backend phase begins.
        </motion.p>
      </div>

      <motion.div style={{ y: yForm }} className="mx-auto max-w-5xl">
        <ContactForm />
      </motion.div>
    </section>
  );
};

export default CalBooking;
