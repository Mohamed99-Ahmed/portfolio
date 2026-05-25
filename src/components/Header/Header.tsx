"use client"
import imgProfile from "../../../public/imgs/Mohamed personal4.png";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Button from "../Button/Button";



export default function Header() {
  const cv = "/cv/MohamedAhmed.pdf";
  const headerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const scrollDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const canvas = canvasRef.current;
    const imageEl = imageRef.current;
    const shapes = shapesRef.current;
    const scrollDown = scrollDownRef.current;
    if (!header || !canvas || !imageEl || !shapes || !scrollDown) return;

    let animId: number;

    const ctx1 = gsap.context(() => {

      /* ── Canvas Particles ── */
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

      /* ── Text Split Animation ── */
      const nameEl = document.querySelector(".name") as HTMLElement;
      if (nameEl) {
        const letters = nameEl.textContent!.split("");
        nameEl.innerHTML = "";
        const spans: HTMLSpanElement[] = letters.map((l) => {
          const span = document.createElement("span");
          span.textContent = l === " " ? "\u00A0" : l;
          span.style.display = "inline-block";
          span.style.opacity = "0";
          nameEl.appendChild(span);
          return span;
        });
        gsap.to(spans, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          stagger: { each: 0.04, from: "center" },
          ease: "back.out(1.7)",
        });
      }

      /* ── Scroll-down indicator ── */
      ScrollTrigger.create({
        onUpdate: (self) => {
          const opacity = Math.max(0, 1 - self.progress * 5);
          gsap.set(scrollDown, { opacity });
        },
      });

      /* ── Hero entrance timeline ── */
      const tl = gsap.timeline();
      tl.fromTo(".img-portf", { scale: 0 }, { duration: 0.6, scale: 1, opacity: 1, ease: "back.out(1.7)" })
        .fromTo(".hey", { opacity: 0, y: 20 }, { duration: 0.4, opacity: 1, y: 0, ease: "back.out(1.7)" }, "-=0.3")
        .fromTo(".name", { opacity: 0, y: 20 }, { duration: 0.4, opacity: 1, y: 0, ease: "back.out(1.7)" }, "-=0.2")
        .fromTo(".job", { opacity: 0, y: 20 }, { duration: 0.3, opacity: 1, y: 0, ease: "back.out(1.7)" }, "-=0.2")
        .fromTo(".desc", { opacity: 0 }, { duration: 0.3, opacity: 1, stagger: 0.05, ease: "power2.out" }, "-=0.1")
        .to(".cv", { display: "block" });
    });

    return () => {
      ctx1.revert();
      cancelAnimationFrame(animId);
    };
  }, []);

  /* ── 3D tilt on mouse move ── */
  useEffect(() => {
    const imageEl = imageRef.current;
    if (!imageEl) return;

    let ticking = false;
    const onMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = imageEl!.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) / rect.width;
          const deltaY = (e.clientY - centerY) / rect.height;
          gsap.to(imageEl, {
            rotationY: deltaX * 15,
            rotationX: deltaY * -15,
            transformPerspective: 600,
            duration: 0.4,
            ease: "power2.out",
          });
        });
        ticking = false;
      }
    };
    const onLeave = () => {
      gsap.to(imageEl, { rotationY: 0, rotationX: 0, duration: 0.6, ease: "power3.out" });
    };

    const parent = imageEl.parentElement;
    parent?.addEventListener("mousemove", onMove);
    parent?.addEventListener("mouseleave", onLeave);
    return () => {
      parent?.removeEventListener("mousemove", onMove);
      parent?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      id="home"
      className="relative min-h-screen md:h-nav flex items-center justify-center overflow-hidden"
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

      <div className="container relative z-10 flex flex-col gap-4 items-center justify-center md:flex-row-reverse">
        <figure ref={imageRef} className="img-portf-wrapper" style={{ perspective: "600px" }}>
          <Image
            src={imgProfile}
            ref={imageRef}
            className="img-portf w-[200px] md:w-[400px] opacity-0 rounded-full overflow-hidden"
            alt="profile img"
          />
        </figure>

        <article className="text-center font-semibold grow-1 uppercase space-y-3 text-lg md:text-2xl">
          <h2 className="hey opacity-0">hey, i am</h2>
          <h1 className="name text-scolor font-bold relative text-3xl md:text-4xl opacity-0">
            Mohamed Ahmed
          </h1>
          <p className="job text-lg tracking-[2px] text-gray-400 opacity-0">MERN Stack Developer</p>
          <p className="text-sm md:text-base font-light max-w-[80%] mx-auto leading-relaxed">
            {"i can help you to make your project with amazing user interface i have experience in Frontend"
              .split("")
              .map((chr, ind) => (
                <span key={ind} className="desc opacity-0 tracking-wide">{chr}</span>
              ))}
          </p>
          <a href={cv} download="Mohamed Ahmed.pdf" className="cv mt-6 hidden">
            <Button className="text-md">Download My Cv</Button>
          </a>
        </article>
      </div>

 
    </header>
  );
}
