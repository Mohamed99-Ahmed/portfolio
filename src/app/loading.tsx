"use client"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect } from 'react';

export default function Loading() {
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger);
    const cts = gsap.context(()=>{
        // many of animation  after each oter you should use timeline
const tl = gsap.timeline(); 

// animate loading
tl.to(".item", { 
    yoyo:true, // repeat form first to last then reverse
    repeat:-1,
   y:50,
   duration:1,
   ease: "power2.inOut", // the speed of the animation
   
   stagger:{ // to make the animation after each other
    each:0.2, // the time between each animation element
   }
}).to(".item", {
   x:50,
   stagger:{
    each:0.5,
    },
       repeat:-1,
       yoyo:true,
})

  });
  // remove gsap from browser after umnpound phase 
    return () => cts.revert();
  },[])
  return (
    <ul className='flex gap-4'>
        <li className="item bg-scolor w-8 h-8 rounded-full "></li>
        <li className="item bg-scolor w-8 h-8 rounded-full "></li>
        <li className="item bg-scolor w-8 h-8 rounded-full "></li>
    </ul>
  )
}
