"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CalBooking from "@/components/sections/home/cal-booking";
import Testimonials from "@/components/sections/home/testimonials";
import { TimelineDemo } from "@/components/sections/home/timeline-demo";
import Preloader from "@/components/common/preloader";
import OpeningScrollytelling from "@/components/sections/home/opening-scrollytelling";
import CollabSec from "@/components/sections/home/collab-section";
import AboutScrollSection from "@/components/sections/about/about-scroll-section";

export default function Home() {
  // The Preloader owns the (60fps) load-progress state internally so those
  // updates never re-render this heavy page tree. It just tells us when it's
  // done, and we drop it.
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaded = () => {
    setIsLoading(false);
    document.body.style.cursor = "default";
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center scroll-smooth">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={handleLoaded} />}
      </AnimatePresence>

      {/* Opening narrative: Hero → ShowReel is now controlled by scroll. */}
      <OpeningScrollytelling />

      {/* About Scroll Section */}
      <section id="about" className="">
        <AboutScrollSection />
      </section>

      {/* Timeline & Testimonials */}
      <section id="projects" className="w-full scroll-mt-24">
        <TimelineDemo />
      </section>
      <CollabSec />

      <Testimonials />

      {/* Contact Section */}
      <section id="contact" className="w-full scroll-mt-24">
        <CalBooking />
      </section>
    </div>
  );
}
