"use client"
import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Loading() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    const bar = barRef.current;
    if (!container || !ring || !text || !bar) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.fromTo(ring,
      { rotation: 0, scale: 0.5, opacity: 0, borderColor: "#7B52A1" },
      { rotation: 360, scale: 1, opacity: 1, borderColor: "#FBBF24", duration: 1.2 }
    )
    .to(ring, { rotation: 720, scale: 1.2, borderColor: "#7B52A1", duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" }, "-=0.5");

    gsap.fromTo(text,
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.6 }
    );

    gsap.to(bar, {
      width: "100%",
      duration: 1.5,
      ease: "power3.inOut",
      delay: 0.8,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-back gap-8"
    >
      <div
        ref={ringRef}
        className="w-24 h-24 rounded-full border-4 border-transparent flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <defs>
            <linearGradient id="mgrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7B52A1" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
          </defs>
          <text
            x="50"
            y="68"
            textAnchor="middle"
            fill="url(#mgrad)"
            fontSize="60"
            fontFamily="sans-serif"
            fontWeight="900"
          >
            M
          </text>
        </svg>
      </div>
      <h2 ref={textRef} className="text-scolor text-xl font-light tracking-[0.3em] uppercase">
        Loading
      </h2>
      <div className="w-48 h-[2px] bg-gray-800 rounded-full overflow-hidden">
        <div ref={barRef} className="h-full w-0 bg-scolor rounded-full" />
      </div>
    </div>
  );
}
