"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { gsap } from "@/lib/gsap";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<SVGSVGElement>(null);
  const moonRef = useRef<SVGSVGElement>(null);
  const raysRef = useRef<SVGGElement>(null);
  const isDark = theme === "dark";

  /* animate thumb + icons whenever theme changes */
  useEffect(() => {
    const thumb = thumbRef.current;
    const sun = sunRef.current;
    const moon = moonRef.current;
    const rays = raysRef.current;
    if (!thumb || !sun || !moon) return;

    if (isDark) {
      /* → dark: thumb slides right, moon visible */
      gsap.to(thumb, { x: 28, duration: 0.45, ease: "back.out(1.7)" });
      gsap.to(moon, { opacity: 1, duration: 0.4 });
      gsap.to(sun,  { opacity: 0, duration: 0.3 });
    } else {
      /* → light: thumb slides left, sun visible */
      gsap.to(thumb, { x: 0, duration: 0.45, ease: "back.out(1.7)" });
      gsap.to(sun,  { opacity: 1, duration: 0.4 });
      gsap.to(moon, { opacity: 0, duration: 0.3 });
      /* spin rays */
      if (rays) gsap.fromTo(rays, { rotation: -30 }, { rotation: 0, duration: 0.5, ease: "power2.out" });
    }
  }, [isDark]);

  /* entrance animation */
  useEffect(() => {
    if (!btnRef.current) return;
    gsap.fromTo(btnRef.current,
      { opacity: 0, scale: 0.5, y: -10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, delay: 0.8, ease: "back.out(1.7)" }
    );
  }, []);

  const handleClick = () => {
    /* ripple burst */
    if (btnRef.current) {
      gsap.fromTo(btnRef.current,
        { scale: 1 },
        { scale: 0.88, duration: 0.1, yoyo: true, repeat: 1, ease: "power2.inOut" }
      );
    }
    toggleTheme();
  };

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="theme-toggle-btn"
      style={{ opacity: 0 }} /* GSAP will animate in */
    >
      {/* Track */}
      <div ref={trackRef} className={`theme-toggle-track ${isDark ? "track-dark" : "track-light"}`}>
        {/* Glow ring */}
        <div className={`toggle-glow ${isDark ? "glow-moon" : "glow-sun"}`} />

        {/* Background stars (dark mode) */}
        {isDark && (
          <div className="toggle-stars">
            <span style={{ top: "30%", left: "20%", animationDelay: "0s" }} />
            <span style={{ top: "60%", left: "55%", animationDelay: "0.4s" }} />
            <span style={{ top: "25%", left: "65%", animationDelay: "0.8s" }} />
          </div>
        )}

        {/* Thumb */}
        <div
          ref={thumbRef}
          className="theme-toggle-thumb"
          style={{ transform: isDark ? "translateX(28px)" : "translateX(0px)" }}
        >
          {/* Sun icon */}
          <svg
            ref={sunRef}
            viewBox="0 0 24 24"
            fill="none"
            className="toggle-icon sun-icon"
            style={{ opacity: isDark ? 0 : 1 }}
          >
            <circle cx="12" cy="12" r="5" fill="#FBBF24" />
            <g ref={raysRef} stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round">
              <line x1="12" y1="2"  x2="12" y2="4"  />
              <line x1="12" y1="20" x2="12" y2="22" />
              <line x1="2"  y1="12" x2="4"  y2="12" />
              <line x1="20" y1="12" x2="22" y2="12" />
              <line x1="4.93"  y1="4.93"  x2="6.34"  y2="6.34"  />
              <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
              <line x1="4.93"  y1="19.07" x2="6.34"  y2="17.66" />
              <line x1="17.66" y1="6.34"  x2="19.07" y2="4.93"  />
            </g>
          </svg>

          {/* Moon icon */}
          <svg
            ref={moonRef}
            viewBox="0 0 24 24"
            fill="none"
            className="toggle-icon moon-icon"
            style={{ opacity: isDark ? 1 : 0 }}
          >
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="#C4B5FD"
              stroke="#C4B5FD"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
