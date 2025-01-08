"use client"
import imgProfile from "../../../public/imgs/profile.jpeg";
import React, { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import Loading from './../../app/loading';
import Button from "../Button/Button";


export default function Header() {
  // path of cv the store in variable
  const cv = "/cv/MohamedAhmed.pdf";
    useEffect(()=>{
      // make all animation in context then when umount i will remove it by return
        const cxt = gsap.context(()=>{
          const tl = gsap.timeline({
            // Enable body scrolling of y axiis once the animation is finished
            onComplete: () => {
              document.documentElement.style.overflowY = 'scroll'; // Or 'scroll'
            },
          });
          // display animation vertaially arrangment
          tl.to(".loading",{
            duration:4,
            height:0,
            overflow:"hidden"
          })
          .fromTo('.img-portf',{scale:0},{duration:0.5,scale:1,opacity:1,ease:'back.out(1.7)'})
          .to('.hey',{duration:0.2,transform:'skewY(0deg)',opacity:1,ease:'back.out(1.7)'})
            .to('.name',{duration:0.5,transform:'skewY(0deg)',opacity:1,ease:'back.out(1.7)'})
            .to('.job',{duration:0.2,transform:'skewY(0deg)',opacity:1,ease:'back.out(1.7)'})
            .to('.desc',{duration:0.2,transform:'skewY(0deg)',opacity:1,ease:'back.out(1.7)',stagger:0.05})
            .to(".cv", {display:"block"})
        })
        // remove context from browser when component unmount phase
        return ()=> cxt.revert();
      },[])
  return (
    <>
     <div className="loading bg-[#120D16]  fixed inset-0   flex justify-center items-center z-[7000]"  >
      <Loading></Loading>
    </div>
    {/* header section */}
      <header
        id="home"
        className="home pt-6 md:pt-0 min-h-screen md:h-nav flex items-center justify-center "
      >
        <div className="container flex flex-col gap-4 items-center justify-center md:flex-row-reverse">
          {/* img of me */}
          <figure >
            <Image
              src={imgProfile}
              className="img-portf w-[300px] opacity-0 rounded-full overflow-hidden"
              alt="profile img"
            />
          </figure>
          {/* description of me */}
          <article className="text-center font-semibold grow-1 uppercase space-y-4 text-2xl md:text-4xl ">
            <h2 className="hey skew-y-12 opacity-0">hey, i am</h2>
            <h1 className="name text-scolor skew-y-6 font-bold relative  text-4xl  md:text-5xl opacity-0">
              Mohamed Ahmed 
            </h1>
            <p className="job tracking-[2px] text-gray-400 skew-y-6 opacity-0">Frontend Developer</p>
            <p className=" text-base font-light  max-w-[80%] mx-auto leading-relaxed ">
              {"i can help you to make your project with amazing user interface i have experience in Frontend"
                .split("")
                .map((chr, ind) => {
                  return <span key={ind} className="desc opacity-0 tracking-wide">{chr}</span>;
                })}
                
            </p>
            <a href={cv} download="Mohamed Ahmed.pdf "  className="cv  mt-6 hidden" >
              <Button className="text-md">Download My Cv</Button>
            </a>
          </article>
        </div>
      </header>
    </>
  );
}
