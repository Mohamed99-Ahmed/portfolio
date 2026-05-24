"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { HiBars2 } from "react-icons/hi2";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
import { gsap } from "@/lib/gsap";

const links = [
  { href: "/#home", label: "home" },
  { href: "/#skills", label: "skills" },
  { href: "/#projects", label: "projects" },
  { href: "/#contact", label: "contact" },
];

export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef<HTMLElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current || !openNav) return;
    const items = mobileLinksRef.current.filter(Boolean);
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(items,
        { opacity: 0, y: 30, rotationX: 90 },
        {
          opacity: 1, y: 0, rotationX: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(1.7)",
        }
      );
    });

    return () => ctx.revert();
  }, [openNav]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 right-0 left-0 z-[1000] bg-back/85 backdrop-blur-md border-b border-scolor/15 transition-all duration-500 ${
          openNav ? "h-screen md:h-16" : "h-16"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 h-full flex items-center justify-between">
          <Link
            href="/#home"
            onClick={() => setOpenNav(false)}
            className="text-scolor font-black text-2xl tracking-wider"
          >
            MA
          </Link>

          <div className="md:hidden">
            <Button onClick={() => setOpenNav(!openNav)}>
              {openNav ? <IoCloseSharp /> : <HiBars2 />}
            </Button>
          </div>

          <ul
            ref={mobileMenuRef}
            className={`hidden md:flex items-center gap-8 ${
              openNav ? "!flex flex-col absolute inset-0 top-16 justify-center bg-back/95" : ""
            }`}
            style={openNav ? { perspective: "800px" } : undefined}
          >
            {links.map((link, ind) => {
              const sectionId = link.href.replace("/#", "");
              const isActive = activeSection === sectionId;
              return (
                <li key={ind}>
                  <Link
                    ref={(el) => { mobileLinksRef.current[ind] = el; }}
                    href={link.href}
                    onClick={() => setOpenNav(false)}
                    data-cursor-grow
                    className={`capitalize font-semibold text-2xl md:text-base transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-scolor after:transition-all after:duration-300 ${
                      isActive
                        ? "text-scolor after:w-full"
                        : "text-white/80 hover:text-scolor after:w-0 hover:after:w-full"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
