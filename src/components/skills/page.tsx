"use client"
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import skill1 from "../../../public/imgs/skill-1.png";
import skill2 from "../../../public/imgs/skill-2.png";
import skill3 from "../../../public/imgs/skill-3.png";
import skill4 from "../../../public/imgs/skill-4.png";
import skill5 from "../../../public/imgs/skill-5.png";
import skill6 from "../../../public/imgs/skill-6.png";
import skill7 from "../../../public/imgs/skill-7.png";
import skill8 from "../../../public/imgs/skill-8.png";
import skill9 from "../../../public/imgs/skill-9.png";
import skill10 from "../../../public/imgs/skill-10.png";
import { SiMongodb, SiNodedotjs, SiExpress } from "react-icons/si";
import { gsap } from "@/lib/gsap";
import Title from "../Title/Title";

const skills = [
  { src: skill1, alt: "html", group: 0 },
  { src: skill2, alt: "css", group: 0 },
  { src: skill6, alt: "next", group: 2 },
  { src: skill4, alt: "react", group: 2 },
  { src: skill9, alt: "tailwind", group: 3 },
  { src: skill7, alt: "bootstrap", group: 3 },
  { src: skill10, alt: "git", group: 4 },
  { src: skill5, alt: "typescript", group: 1 },
  { src: skill3, alt: "javascript", group: 1 },
  { src: skill8, alt: "redux", group: 4 },
  { icon: SiMongodb, alt: "mongodb", group: 5 },
  { icon: SiNodedotjs, alt: "nodejs", group: 5 },
  { icon: SiExpress, alt: "express", group: 5 },
];

const skillClasses = [
  "html", "css", "next", "react",
  "tailwind", "boot", "git", "ts", "js", "redux",
  "mongo", "node", "express",
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const figuresRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      const activeGroups: { elements: HTMLElement[]; group: number }[] = [];

      figuresRef.current.forEach((fig, i) => {
        if (!fig) return;
        const group = skills[i]?.group ?? 0;
        let ag = activeGroups.find(g => g.group === group);
        if (!ag) {
          ag = { elements: [], group };
          activeGroups.push(ag);
        }
        ag.elements.push(fig);
      });

      activeGroups.forEach((ag, idx) => {
        const startOffset = 30 + idx * 15;
        gsap.fromTo(ag.elements,
          { opacity: 0, scale: 0.3 },
          {
            opacity: 1, scale: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: section,
              start: `${startOffset}% bottom`,
              end: `${startOffset + 15}% bottom`,
              scrub: 1.5,
            },
          }
        );
      });

      figuresRef.current.forEach((fig) => {
        if (!fig) return;
        gsap.to(fig, {
          y: -4 + Math.random() * 8,
          rotation: -1 + Math.random() * 2,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      figuresRef.current.forEach((fig) => {
        if (!fig) return;

        const onMove = (e: MouseEvent) => {
          const rect = fig!.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(fig, {
            rotationY: x * 15,
            rotationX: y * -15,
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const onLeave = () => {
          gsap.to(fig, {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
          });
        };

        fig.addEventListener("mousemove", onMove);
        fig.addEventListener("mouseleave", onLeave);
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="skills container flex items-center justify-center min-h-screen py-24"
    >
      <article className="h-full parent gap-2">
        <Title className="title">skills</Title>
        {skillClasses.map((cls, i) => {
          const skill = skills[i];
          if (!skill) return null;
          return (
            <figure
              key={i}
              ref={(el) => { figuresRef.current[i] = el; }}
              className={`${cls} flex items-center justify-center`}
              style={{ perspective: "600px" }}
            >
              {'src' in skill ? (
                <Image
                  src={skill.src!}
                  alt={skill.alt}
                  className="w-16 md:w-20 cursor-pointer"
                  width={80}
                />
              ) : (
                <skill.icon className="w-12 h-12 md:w-16 md:h-16 cursor-pointer" style={{
                  color: skill.icon === SiMongodb ? "#47A248" :
                         skill.icon === SiNodedotjs ? "#339933" :
                         skill.icon === SiExpress ? "#666666" : "",
                }} />
              )}
            </figure>
          );
        })}
      </article>
    </section>
  );
}
