"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TimelineDemo } from "@/components/sections/home/timeline-demo";
import Preloader from "@/components/common/preloader";
import OpeningScrollytelling from "@/components/sections/home/opening-scrollytelling";
import ProjectDetail from "@/components/sections/home/project-detail";
import WireframeAbout from "@/components/sections/about/wireframe-about";
import WireframeContact from "@/components/sections/contact/wireframe-contact";

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
      <TimelineDemo />
      <ProjectDetail />
      <WireframeAbout />
      <WireframeContact />
    </div>
  );
}
