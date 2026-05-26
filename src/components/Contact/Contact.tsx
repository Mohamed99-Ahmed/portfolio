"use client"
import React, { useEffect, useRef } from "react";
import Title from "../Title/Title";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { gsap } from "@/lib/gsap";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const links = linksRef.current.filter(Boolean);

      gsap.fromTo(links,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );


    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} id="contact" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-back via-back/95 to-back pointer-events-none" />
        <div className="container relative z-10">
          <Title>contact</Title>
          <section className="links p-6  mt-10 rounded-md h-[350px] flex flex-col gap-2 text-2xl border border-scolor/10">
            <div className="col-1 h-[75%] flex gap-2 transition-all duration-1000">
              <a
                ref={(el) => { linksRef.current[0] = el; }}
                target="_blank"
                href="https://github.com/Mohamed99-Ahmed?tab=repositories"
                className="github bg-gray-800 text-scolor col-span-2 row-span-4 transition-all duration-1000"
              >
                <FaGithub />
              </a>
              <a
                ref={(el) => { linksRef.current[1] = el; }}
                target="_blank"
                href="https://www.linkedin.com/in/eng-mohamed-ahmed/"
                className="linkedin bg-gray-700 text-scolor col-span-7 row-span-4 transition-all duration-1000"
              >
                <FaLinkedin />
              </a>
            </div>
            <div className="col-2 h-[25%] flex gap-2 transition-all duration-1000">
              <a
                ref={(el) => { linksRef.current[2] = el; }}
                target="_blank"
                className="phone bg-gray-700 text-scolor col-span-3 row-span-2 transition-all duration-1000"
                href="tel:+0201033088054"
              >
                <FaPhoneAlt />
              </a>
              <a
                ref={(el) => { linksRef.current[3] = el; }}
                target="_blank"
                className="gmail bg-gray-800 text-scolor col-span-6 row-span-2 transition-all duration-1000"
                href="mailto:mohamed202029999@gmail.com"
              >
                <BiLogoGmail />
              </a>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
