"use client"
import imgProfile from "../../../public/imgs/Mohamed personal4.png";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Button from "../Button/Button";



export default function Header() {
  const cv = "/cv/MohamedAhmed.pdf";
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const figureRef = useRef<HTMLElement>(null);  // attach to <figure> — next/image doesn't forward refs
  const shapesRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const header = headerRef.current;
    const canvas = canvasRef.current;
    const shapes = shapesRef.current;
    const scrollDown = scrollDownRef.current;

    let animId: number;
    let ctx1: ReturnType<typeof gsap.context> | null = null;

    /* ── Hero entrance timeline — always runs ── */
    const heroCtx = gsap.context(() => {
      const nameSpans = document.querySelectorAll(".name span") as NodeListOf<HTMLElement>;

      const tl = gsap.timeline();
      tl.fromTo(".img-portf", { scale: 0, opacity: 0 }, { duration: 0.6, scale: 1, opacity: 1, ease: "back.out(1.7)" })
        .fromTo(".hey", { opacity: 0, y: 20 }, { duration: 0.4, opacity: 1, y: 0, ease: "back.out(1.7)" }, "-=0.3")
        .fromTo(".name", { opacity: 0, y: 20 }, { duration: 0.4, opacity: 1, y: 0, ease: "back.out(1.7)" }, "-=0.2")
        .fromTo(".job", { opacity: 0, y: 20 }, { duration: 0.3, opacity: 1, y: 0, ease: "back.out(1.7)" }, "-=0.2")
        .fromTo(".desc", { opacity: 0 }, { duration: 0.3, opacity: 1, stagger: 0.005, ease: "power2.out" }, "-=0.1")
        .to(".cv", { display: "block" });

      if (nameSpans.length > 0) {
        gsap.to(nameSpans, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: { each: 0.04, from: "center" },
          ease: "back.out(1.7)",
        });
      }
    });

    /* ── Canvas Particles — only if canvas is available ── */
    if (header && canvas && shapes) {
      ctx1 = gsap.context(() => {
        const c = canvas;
        const ctx = c.getContext("2d")!;
        let W = c.width = window.innerWidth;
        let H = c.height = window.innerHeight;
        const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
        const PARTICLE_COUNT = 100;
        const MAX_DIST = 120;
        let mouseX = -1000;
        let mouseY = -1000;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.2,
          });
        }

        function drawParticles() {
          ctx.clearRect(0, 0, W, H);
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 80) {
              const force = (80 - dist) / 80;
              p.vx += (dx / dist) * force * 0.5;
              p.vy += (dy / dist) * force * 0.5;
            }
            p.vx = Math.max(-1, Math.min(1, p.vx));
            p.vy = Math.max(-1, Math.min(1, p.vy));

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dx2 = p.x - p2.x;
              const dy2 = p.y - p2.y;
              const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              if (d2 < MAX_DIST) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(251, 191, 36, ${(1 - d2 / MAX_DIST) * 0.15})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
          animId = requestAnimationFrame(drawParticles);
        }

        animId = requestAnimationFrame(drawParticles);

        const onResize = () => {
          W = c.width = window.innerWidth;
          H = c.height = window.innerHeight;
        };
        const onMouse = (e: MouseEvent) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        };
        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", onMouse);

        /* ── Scroll-down indicator ── */
        if (scrollDown) {
          ScrollTrigger.create({
            trigger: header,
            start: "top top",
            end: "30% top",
            onUpdate: (self) => {
              gsap.set(scrollDown, { opacity: 1 - self.progress * 4 });
            },
          });
        }
      });
    }

    return () => {
      heroCtx.revert();
      ctx1?.revert();
      cancelAnimationFrame(animId);
    };
  }, [mounted]);

  /* ── 3D tilt on mouse move ── */
  useEffect(() => {
    if (!mounted) return;
    const figureEl = figureRef.current;
    if (!figureEl) return;

    const onMove = (e: MouseEvent) => {
      const rect = figureEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      gsap.to(figureEl, {
        rotationY: deltaX * 15,
        rotationX: deltaY * -15,
        transformPerspective: 1000,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(figureEl, { rotationY: 0, rotationX: 0, duration: 0.8, ease: "power3.out" });
    };

    figureEl.addEventListener("mousemove", onMove as EventListener);
    figureEl.addEventListener("mouseleave", onLeave);
    return () => {
      figureEl.removeEventListener("mousemove", onMove as EventListener);
      figureEl.removeEventListener("mouseleave", onLeave);
    };
  }, [mounted]);

  return (
    <header
      ref={headerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      <div
        ref={shapesRef}
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute top-20 left-[10%] w-6 h-6 border-2 border-mcolor rounded-full opacity-20 shape-float-1" />
        <div className="absolute top-[40%] right-[15%] w-4 h-4 bg-scolor rotate-45 opacity-15 shape-float-2" />
        <div className="absolute bottom-[30%] left-[5%] w-8 h-8 border border-scolor rounded-full opacity-10 shape-float-3" />
        <div className="absolute top-[60%] left-[40%] w-3 h-3 bg-mcolor opacity-20 shape-float-4" />
      </div>

      <div className="container relative z-10 flex flex-col gap-8 items-center justify-center md:flex-row-reverse pb-20">
        <figure ref={figureRef as React.RefObject<HTMLElement>} className="img-portf-wrapper" style={{ perspective: "1000px" }}>
          <Image
            src={imgProfile}
            className="img-portf w-[200px] md:w-[350px] opacity-0 rounded-full overflow-hidden shadow-2xl border-4 border-scolor/20"
            alt="Mohamed Ahmed Profile"
            width={400}
            height={400}
            priority
          />
        </figure>

        <article className="text-center md:text-left font-semibold uppercase space-y-4 max-w-xl">
          <h2 className="hey opacity-0 text-xl md:text-2xl tracking-widest text-white/60">hey, i am</h2>
          <h1 className="name text-scolor font-black relative text-4xl md:text-6xl tracking-tighter opacity-0">
            {"Mohamed Ahmed".split("").map((l, i) => (
              <span key={i} style={{ display: "inline-block", opacity: 0 }}>
                {l === " " ? "\u00A0" : l}
              </span>
            ))}
          </h1>
          <p className="job text-xl md:text-2xl tracking-[4px] text-white/80 opacity-0">MERN Stack Developer</p>
          <p className="text-sm md:text-lg font-light leading-relaxed normal-case text-white/70">
            {"Experienced in building scalable full-stack applications using React, Next.js, Node.js, GraphQL, and MongoDB. Passionate about performance optimization, clean architecture, and modern UI development."
              .split("")
              .map((chr, ind) => (
                <span key={ind} className="desc opacity-0 tracking-wide">{chr}</span>
              ))}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a href={cv} download="Mohamed Ahmed.pdf" className="cv hidden">
              <Button className="text-md !px-8">Download My Cv</Button>
            </a>
          </div>
        </article>
      </div>

      <div
        ref={scrollDownRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs uppercase tracking-widest font-bold">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-scolor to-transparent" />
      </div>
    </header>
  );
}
