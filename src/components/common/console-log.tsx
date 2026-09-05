"use client";

import { useEffect } from "react";

export default function ConsoleLog() {
  useEffect(() => {
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim();

    const style = [
      `color: hsl(${accent || "0 0% 100%"})`,
      "font-size: 14px",
      "font-weight: 700",
      "font-family: monospace",
      "letter-spacing: 0.08em",
      "padding: 8px 0",
    ].join(";");

    console.log("%cVERITY // DESIGN + DEVELOPMENT", style);
  }, []);

  return null;
}
