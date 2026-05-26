"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  // Step 1: trigger mount so the cursor divs render
  useEffect(() => { setMounted(true); }, []);

  // Step 2: set up GSAP only after mounted=true (so refs point to real DOM nodes)
  useEffect(() => {
    if (!mounted) return;
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const moveCursor = gsap.quickTo(cursor, "left", { xPercent: -50, yPercent: -50, ease: "power3.out", duration: 0.1 });
    const moveY = gsap.quickTo(cursor, "top", { xPercent: -50, yPercent: -50, ease: "power3.out", duration: 0.1 });
    const trailX = gsap.quickTo(trail, "left", { xPercent: -50, yPercent: -50, ease: "power3.out", duration: 0.4 });
    const trailY = gsap.quickTo(trail, "top", { xPercent: -50, yPercent: -50, ease: "power3.out", duration: 0.4 });

    const onMove = (e: MouseEvent) => {
      moveCursor(e.clientX);
      moveY(e.clientY);
      trailX(e.clientX);
      trailY(e.clientY);
    };

    window.addEventListener("mousemove", onMove);

    const growTargets = document.querySelectorAll("a, button, [data-cursor-grow]");
    const onEnter = () => gsap.to(cursor, { scale: 2.5, duration: 0.3, ease: "power2.out" });
    const onLeave = () => gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });

    growTargets.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      growTargets.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      document.body.style.cursor = "";
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-scolor rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 border border-scolor rounded-full pointer-events-none z-[9998] opacity-40"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
