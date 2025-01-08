"use client"
import Image from "next/image";
import React, { useEffect } from "react";
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
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";
import Title from "../Title/Title";


export default function Skills() {
    useEffect(()=>{
      // make context gsap then i will remove in unmount phase
        gsap.registerPlugin(ScrollTrigger);
        const cts = gsap.context(()=>{
            const tl = gsap.timeline({
                    defaults: {
                        opacity: 1,
                        filter: "blur(0)",
                        duration: 2,
                        yoyo: true,
                      },
            });
            tl.to(".dis-1", {
                scrollTrigger: {
                  trigger: ".dis-1",
                  start: "50% 80%",
                  pin:true,
                 end:"100% 80%",
                //   markers: true,
                  toggleActions: "play pause resume reset",
                  scrub: true,
                },
              });
              tl.to(".dis-2", {
                scrollTrigger: {
                  trigger: ".dis-2",
                  start: "50% 80%",
                  pin:true,
                 end:"100% 80%",
                //   markers: true,
                  toggleActions: "play pause resume reset",
                  scrub: true,
                },
              });
              tl.to(".dis-3", {
                scrollTrigger: {
                  trigger: ".dis-3",
                  start: "50% 80%",
                  pin:true,
                 end:"100% 80%",
                //   markers: true,
                  toggleActions: "play pause resume reset",
                  scrub: true,
                },
              });
              tl.to(".dis-4", {
                scrollTrigger: {
                  trigger: ".dis-4",
                  start: "50% 80%",
                  pin:true,
                 end:"100% 80%",
                //   markers: true,
                  toggleActions: "play pause resume reset",
                  scrub: true,
                },
              });
              tl.to(".dis-5", {
                scrollTrigger: {
                  trigger: ".dis-5",
                  start: "50% 80%",
                  pin:true,
                 end:"100% 80%",
                //   markers: true,
                  toggleActions: "play pause resume reset",
                  scrub: true,
                },
              });

        })
        // remove context of animation by gsap from browser when unmount component
        return ()=>cts.revert();
    },[])
  return (
    <section
      id="skills"
      className="skills container flex items-center justify-center h-screen sm:h-[110vh] md:h-[150vh]"
    >
      <article className="h-full parent gap-2 ">
        {/* title of skills component */}
      <Title className="title ">skills</Title>
          {/* all of figures of skills */}
        <>
        <figure className="html ">
          <Image src={skill1} alt="html image  " className="dis-1" width={100}
           />
        </figure>
        <figure className="css">
          <Image
            src={skill2}
            alt="css image"
            className=" dis-1 "
            width={100}
            
          />
        </figure>
        <figure className="next">
          <Image
            src={skill6}
            alt="next "
            className=" dis-3"
            width={100}
            
          />
        </figure>
        <figure className="react">
          <Image
            src={skill4}
            alt="react "
            className=" sikill-4 dis-3"
            width={100}
            
          />
        </figure>
        <figure className="tailwind">
          <Image
            src={skill9}
            alt="tailwind image"
            className="w-full dis-4"
            width={100}
            
          />
        </figure>
        <figure className="boot">
          <Image
            src={skill7}
            alt="redux image"
            className="w-full dis-4"
            width={100}
            
          />
          </figure>
        <figure className="git">
          <Image
            src={skill10}
            alt="git image"
            className="w-full dis-5"
            width={100}
            
          />
        </figure>
        <figure className="ts">
          <Image
            src={skill5}
            alt="typescript image"
            className=" skill-5 dis-2"
            width={100}
            
          />
        </figure>
        <figure className="js ">
          <Image
            src={skill3}
            alt=" javascript image"
            className=" dis-2"
            width={100}
            
          />
        </figure>
        <figure className="redux">
          <Image
            src={skill8}
            alt="redux image"
            className="w-full dis-5"
            width={100}
            
          />
        </figure>
        </>
      </article>
    </section>
  );
}
