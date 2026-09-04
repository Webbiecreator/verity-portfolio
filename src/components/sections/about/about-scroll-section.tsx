"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

function buildImageUrl(index: number): string {
  const width =
    typeof window === "undefined"
      ? 1200
      : Math.round(
          Math.min(
            window.innerWidth * Math.min(window.devicePixelRatio || 1, 2),
            window.innerWidth < 768 ? 900 : 1920,
          ),
        );
  const height = Math.round(width * 1.3);

  return `https://picsum.photos/seed/about-section-${index}/${width}/${height}`;
}

const aboutSectionImages = Array.from({ length: 47 }, (_, i) => ({ index: i }));

const IMAGE_DURATION = 5;
const TEXT_DURATION = 2;

// Site accent — purple to match the rest of Verity.
const purpleColor = "#c755f7";

const AboutScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 0 });

  useEffect(() => {
    const loadImages = async () => {
      const promises = aboutSectionImages.map((img, index) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new window.Image();
          image.crossOrigin = "anonymous";
          image.src = buildImageUrl(img.index);
          image.onload = () => {
            imagesRef.current[index] = image;
            resolve(image);
          };
          image.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img) return;

    if (canvas.width !== window.innerWidth) canvas.width = window.innerWidth;
    if (canvas.height !== window.innerHeight) canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  };

  useGSAP(
    () => {
      if (
        !imagesLoaded ||
        !sectionRef.current ||
        !canvasRef.current ||
        !pinWrapperRef.current ||
        !textRef.current
      )
        return;

      renderFrame(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinWrapperRef.current,
          scrub: 0.5,
        },
      });

      tl.to(
        frameIndexRef.current,
        {
          value: aboutSectionImages.length - 1,
          ease: "none",
          duration: IMAGE_DURATION,
          onUpdate: () => {
            renderFrame(Math.round(frameIndexRef.current.value));
          },
        },
        0,
      );

      const scrollHint =
        pinWrapperRef.current.querySelector<HTMLElement>("[data-scroll-hint]");

      if (scrollHint) {
        const lastFrame = aboutSectionImages.length - 1;
        const frameToTime = (frame: number) =>
          (IMAGE_DURATION * frame) / lastFrame;
        const fadeEnd = frameToTime(30);

        tl.to(
          scrollHint,
          { opacity: 0, ease: "none", duration: fadeEnd },
          0,
        );
      }

      const overlay = textRef.current.querySelector<HTMLElement>(
        "[data-reveal-overlay]",
      );

      if (overlay) {
        tl.fromTo(
          overlay,
          { opacity: 0 },
          { opacity: 1, ease: "none", duration: TEXT_DURATION / 2 },
          IMAGE_DURATION,
        );
      }

      const textLines =
        textRef.current.querySelectorAll<HTMLElement>("[data-reveal-line]");

      tl.fromTo(
        textLines.length ? textLines : textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          duration: TEXT_DURATION,
          stagger: textLines.length
            ? TEXT_DURATION / (textLines.length * 2)
            : 0,
        },
        IMAGE_DURATION,
      );

      const handleResize = () => {
        renderFrame(Math.round(frameIndexRef.current.value));
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: sectionRef, dependencies: [imagesLoaded] },
  );

  return (
    <div ref={sectionRef} className="relative h-[800vh]">
      {!imagesLoaded && (
        <div className="absolute inset-x-0 top-0 z-40 flex h-screen items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"
              style={{ borderTopColor: purpleColor }}
            />
            <p className="text-lg text-white">Loading images...</p>
          </div>
        </div>
      )}

      <div
        ref={pinWrapperRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <canvas ref={canvasRef} className="h-full w-full" />

        <div
          data-scroll-hint
          className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 md:inset-y-auto md:bottom-10 md:justify-start"
        >
          <span
            className="text-[10px] uppercase tracking-[0.35em] text-white/70 md:text-xs"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Scroll to play
          </span>
          <span
            className="flex h-9 w-5.5 items-start justify-center rounded-full border pt-2"
            style={{ borderColor: `${purpleColor}99` }}
          >
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full"
              style={{ backgroundColor: purpleColor }}
            />
          </span>
        </div>

        <div ref={textRef} className="pointer-events-none absolute inset-0">
          <div
            data-reveal-overlay
            className="absolute inset-0 bg-linear-to-r from-black/80 via-black/35 to-transparent opacity-0"
          />

          <div className="absolute inset-y-0 left-0 flex w-full flex-col justify-center px-6 sm:w-[55%] sm:px-14 lg:px-20">
            <div className="relative max-w-xl p-8 sm:p-10">
              {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((classes) => (
                <div
                  key={classes}
                  data-reveal-line
                  className={`absolute h-8 w-8 opacity-0 ${classes}`}
                  style={{ borderColor: `${purpleColor}99` }}
                />
              ))}

              <p
                data-reveal-line
                className="mb-5 text-[10px] uppercase tracking-[0.3em] opacity-0 md:text-xs"
                style={{ fontFamily: "'DM Mono', monospace", color: purpleColor }}
              >
                ✦ About Me ✦
              </p>

              <h2
                data-reveal-line
                className="mb-5 text-3xl font-bold leading-[1.08] text-white opacity-0 sm:text-4xl lg:text-5xl"
              >
                I&apos;d rather let the{" "}
                <span
                  className="font-normal italic"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: purpleColor }}
                >
                  work
                </span>{" "}
                do the talking.
              </h2>

              <p
                data-reveal-line
                className="mb-6 max-w-md text-sm leading-relaxed text-white/60 opacity-0 sm:text-base"
              >
                7 years of turning design into motion — across brands, creators,
                and culture-led stories. Built on one simple rule: quality over
                quantity, always.
              </p>

              <div
                data-reveal-line
                className="mb-6 h-px w-24 opacity-0"
                style={{ backgroundImage: `linear-gradient(to right, ${purpleColor}, transparent)` }}
              />

              <div
                data-reveal-line
                className="mb-8 flex flex-wrap items-center gap-3 opacity-0"
              >
                {["CREATIVE DIRECTION", "MOTION", "ANIMATION", "EDIT"].map(
                  (discipline, i) => (
                    <span
                      key={discipline}
                      className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/50"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {i !== 0 && (
                        <span
                          className="h-1 w-1 rounded-full"
                          style={{ backgroundColor: purpleColor }}
                        />
                      )}
                      {discipline}
                    </span>
                  ),
                )}
              </div>

              <p data-reveal-line className="opacity-0">
                <span
                  className="text-xs uppercase tracking-[0.25em] text-white"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  Happy to collaborate
                </span>{" "}
                <span style={{ color: purpleColor }}>✦</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScrollSection;
