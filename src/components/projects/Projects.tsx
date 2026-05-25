"use client"
import React, { useEffect, useRef, useState } from 'react'
import project1 from "../../../public/imgs/project-1.png"
import project2 from "../../../public/imgs/project-2.png"
import project3 from "../../../public/imgs/project-3.png"
import project4 from "../../../public/imgs/project-4.png"
import project5 from "../../../public/imgs/project-5.png"
import project6 from "../../../public/imgs/project-6.png"
import carecomm from "../../../public/imgs/carecomm.png"
import skill1 from "../../../public/imgs/skill-1.png"
import skill3 from "../../../public/imgs/skill-3.png"
import skill4 from "../../../public/imgs/skill-4.png"
import skill5 from "../../../public/imgs/skill-5.png"
import skill6 from "../../../public/imgs/skill-6.png"
import skill7 from "../../../public/imgs/skill-7.png"
import skill8 from "../../../public/imgs/skill-8.png"
import skill9 from "../../../public/imgs/skill-9.png"
import skill10 from "../../../public/imgs/skill-10.png"
import Image, { StaticImageData } from 'next/image'
import { SiMongodb, SiExpress, SiGraphql } from "react-icons/si";
import { gsap, Flip } from "@/lib/gsap"
import Title from '../Title/Title';

type project = {
  name: string;
  description: string;
  src: StaticImageData | string;
  alt: string;
  tools: (StaticImageData | string | React.ElementType)[];
  link: string;
}

const projects: project[] = [
    {
    name: "CareComm",
    description: "Automated end-to-end social media workflows, including post scheduling, publishing, and analytics aggregation across platforms like Facebook, Instagram, X and TikTok, boosting marketing team productivity and data accuracy",
    src: carecomm, alt: "CareComm social media automation",
    tools: [SiMongodb, SiExpress, SiGraphql],
    link: "https://staging.carecomm.com",
  },
  {
    name: "Buy Ecommerce",
    description: "Buy Ecmmerce Application build by ReactJs library and tailwind css easy way to shopping based on api for everything (signup, login , wishlist, carts,payment with Amazing interface for Good user experience",
    src: project1, alt: "Ecommerce app",
    tools: [skill4, skill9, skill10],
    link: "https://mohamed99-ahmed.github.io/Buy-Ecommerce/",
  },
  {
    name: "Twitaty",
    description: "Twiatay website is a social app website that all peple can share imgs and post with communication with us .",
    src: project6, alt: "Twitaty social app",
    tools: [skill6, skill5, skill8, skill9],
    link: "https://twitaty-1v70yaowx-mohamed99-ahmeds-projects.vercel.app/",
  },
  {
    name: "Fahmny quran",
    description: "Website That give you Random aya form quran and with tafser , and page of specific surah you want with its tafseer.Built with : React(state Mangment by Redux), Tailwind",
    src: project2, alt: "fahmny app tafser of quran",
    tools: [skill4, skill8, skill9, skill10],
    link: "https://mohamed99-ahmed.github.io/tazkarh/",
  },
  {
    name: "WeatherNews",
    description: "Search about weather in any city in the world by arabic language and Dailynews",
    src: project3, alt: "Weahter and news app",
    tools: [skill4, skill5, skill7, skill10],
    link: "https://mohamed99-ahmed.github.io/WeatherNews/",
  },
  {
    name: "game reviews",
    description: "Developed a dynamic and interactive website that displays a variety of games using a RESTful API.",
    src: project4, alt: "Reviws of games application",
    tools: [skill1, skill3, skill9, skill10],
    link: "https://mohamed99-ahmed.github.io/Games-Api-Test/",
  },
  {
    name: "Yummy Meal",
    description: "Developed a meals-themed website that showcases dishes from around the world and search how to prepare it, using data retrieved from a API.",
    src: project5, alt: "yemmy app from many of recipies",
    tools: [skill1, skill3, skill9, skill10],
    link: "https://mohamed99-ahmed.github.io/Meals/",
  }
];

export default function Projects() {
  const [modalProject, setModalProject] = useState<project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* ── Horizontal Scroll + Card Entrance ── */
  useEffect(() => {
    const section = sectionRef.current;
    const slider = sliderRef.current;
    if (!section || !slider) return;

    const ctx = gsap.context(() => {
      gsap.to(".child", {
        xPercent: -100 * (projects.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".slider",
          start: "top top",
          end: () => `+=${projects.length * 300}`,
          scrub: 1,
          pin: true,
          id: "projects-scroll",
        },
      });

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, rotationY: 25, scale: 0.85 },
          {
            opacity: 1, rotationY: 0, scale: 1,
            duration: 1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: card,
              start: "left 90%",
              end: "left 30%",
              scrub: 1.2,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── Hover Parallax ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector("img");
        const title = card.querySelector("h3");
        const desc = card.querySelector("p");

        const onMove = (e: MouseEvent) => {
          const rect = card!.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          if (img) gsap.to(img, { x: x * -20, y: y * -10, duration: 0.4, ease: "power2.out" });
          if (title) gsap.to(title, { x: x * 10, y: y * -5, duration: 0.4, ease: "power2.out" });
          if (desc) gsap.to(desc, { x: x * 5, y: y * 5, duration: 0.4, ease: "power2.out" });
          gsap.to(card, { rotateY: x * 5, rotateX: y * -5, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
        };

        const onLeave = () => {
          gsap.to([img, title, desc].filter(Boolean), { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
          gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    });

    return () => ctx.revert();
  }, []);

  /* ── Flip Modal ── */
  const openModal = (p: project, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const state = Flip.getState(card);
    setModalProject(p);

    requestAnimationFrame(() => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      Flip.from(state, {
        duration: 0.6,
        ease: "power3.inOut",
        scale: true,
        absolute: true,
      });
    });
  };

  const closeModal = () => {
    setModalProject(null);
  };

  return (
    <>
      <section ref={sectionRef} className="projects" id="projects">
        <div className="container">
          <Title>projects</Title>
          <div ref={sliderRef} className="slider flex flex-row gap-2 md:gap-10">
            {projects.map((project, ind) => (
              <section
                key={ind}
                className="child md:w-[70%] w-[90%] flex items-center shrink-0 grow-0 first:ml-8 md:first:ml-12"
                style={{ perspective: "800px" }}
              >
                <a
                  ref={(el) => { cardsRef.current[ind] = el; }}
                  onClick={(e) => {
                    e.preventDefault();
                    openModal(project, ind);
                  }}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-grow
                  className="border-2 group/parent border-gray-600 hover:border-scolor hover:scale-105 transition-all duration-700 rounded-md p-4 w-[80%] md:w-[60%] flex flex-col justify-between gap-1 md:gap-2 cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Image src={project.src} className="w-full object-cover h-[120px] md:h-[180px] group-hover/parent:object-scale-down" alt={project.alt} />
                  <article className="mb-4">
                    <h3 className="text-xl font-bold">{project.name}</h3>
                    <p className="text-gray-400 line-clamp-2 sm:line-clamp-4 md:group-hover/parent:line-clamp-none">{project.description}</p>
                  </article>
                  <footer className="flex justify-between items-start flex-col sm:flex-row gap-2 border-t-2 pt-4 border-gray-400">
                    <p className="capitalize">tools i used :</p>
                    <figure className="flex gap-2">
                      {project.tools.map((Tool, i) => {
                        const brandColor = 
                          Tool === SiMongodb ? "#47A248" :
                          Tool === SiExpress ? "#666666" :
                          Tool === SiGraphql ? "#E10098" : "";
                        return typeof Tool === "function" ? (
                          <Tool className="w-5 h-5 inline sm:w-7 sm:h-7" style={{ color: brandColor }} key={i} />
                        ) : (
                          <Image className="w-5 inline sm:w-7" src={Tool} key={i} alt={`tool ${i}`} />
                        );
                      })}
                    </figure>
                  </footer>
                </a>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ── Project Modal ── */}
      {modalProject && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[5000] flex items-center justify-center bg-back/95 backdrop-blur-xl p-4"
          onClick={closeModal}
        >
          <div
            className="max-w-2xl w-full bg-gray-900 rounded-xl overflow-hidden border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={modalProject.src} alt={modalProject.alt} className="w-full h-64 object-cover" />
            <div className="p-6 space-y-4">
              <h3 className="text-3xl font-bold text-scolor">{modalProject.name}</h3>
              <p className="text-gray-300 leading-relaxed">{modalProject.description}</p>
              <div className="flex gap-2 flex-wrap">
                {modalProject.tools.map((tool, i) => (
                  <Image key={i} className="w-8 h-8" src={tool} alt={`tool-${i}`} />
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <a
                  href={modalProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-scolor text-back font-bold rounded-lg hover:bg-scolor/80 transition-all"
                >
                  View Live
                </a>
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:border-scolor transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
