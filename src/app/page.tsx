"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CalBooking from "@/components/sections/home/cal-booking";
import Testimonials from "@/components/sections/home/testimonials";
import { TimelineDemo } from "@/components/sections/home/timeline-demo";
import Preloader from "@/components/common/preloader";
import OpeningScrollytelling from "@/components/sections/home/opening-scrollytelling";
import CollabSec from "@/components/sections/home/collab-section";
import BuildingLightsSection from "@/components/sections/about/building-lights-section";

export default function Home() {
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

      <OpeningScrollytelling />

      <section id="about" className="w-full">
        <BuildingLightsSection />
      </section>

      <section id="projects" className="w-full scroll-mt-24">
        <TimelineDemo />
      </section>
      <CollabSec />

      <Testimonials />

      <section id="contact" className="w-full scroll-mt-24">
        <CalBooking />
      </section>
    </div>
  );
}
