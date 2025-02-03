"use client"
import React, { useEffect } from 'react'
// projects
import project1 from "../../../public/imgs/project-1.png"
import project2 from "../../../public/imgs/project-2.png"
import project3 from "../../../public/imgs/project-3.png"
import project4 from "../../../public/imgs/project-4.png"
import project5 from "../../../public/imgs/project-5.png"
import project6 from "../../../public/imgs/project-6.png"
// skills
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
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import Title from '../Title/Title';
// type of project object
type  project = {
    name:string,
    description:string,
    src:(StaticImageData | string),
    alt:string,
    tools:(StaticImageData | string)[],
    link:string

}
// all projects 
const projects:project[] = [
    {
        name:"Buy Ecommerce",
        description:`Buy Ecmmerce Application build by ReactJs library and tailwind css easy way to shopping based on api for everything (signup, login , wishlist, carts,payment with Amazing interface for Good user experience`,
        src : project1,
        alt:"Ecommerce app", 
        tools:[skill4,skill9,skill10],
        link : `https://mohamed99-ahmed.github.io/Buy-Ecommerce/`,
    }
,
{  
    name:"Twitaty",
   description:"Twiatay website is a social app website that all peple can share imgs and post with communication with us .",
   src : project6,
   alt:"Twitaty social app",
    tools:[skill6,skill5,skill8,skill9],
    link:"https://twitaty-1v70yaowx-mohamed99-ahmeds-projects.vercel.app/"

},
    {  
         name:"Fahmny quran", 
        description:`Website That give you Random aya form quran and with tafser , and page of specific surah you want with its tafseer.Built with : React(state Mangment by Redux), Tailwind`,
        src : project2,alt:"fahmny app tafser of quran",
        tools:[skill4,skill8,skill9,skill10],
        link:`https://mohamed99-ahmed.github.io/tazkarh/`

    },
    {  
         name:"WeatherNews",
        description:"Search about weather in any city in the world by arabic language and Dailynews",
        src : project3,
        alt:"Weahter and news app",
         tools:[skill4,skill5,skill7,skill10],
         link:"https://mohamed99-ahmed.github.io/WeatherNews/"

    },

    {  
         name:"game reviews",
        description:"Developed a dynamic and interactive website that displays a variety of games using a RESTful API.",
        src : project4,
        alt:"Reviws of games application", 
        tools:[skill1,skill3,skill9,skill10],
        link:"https://mohamed99-ahmed.github.io/Games-Api-Test/"
    },
    {   name:"Yummy Meal",
        description:`Developed a meals-themed website that showcases dishes from around the world and search how to prepare it, using data retrieved from a API.`,
        src : project5,
        alt:"yemmy app from many of recipies", 
        tools:[skill1,skill3,skill9,skill10],
        link:"https://mohamed99-ahmed.github.io/Meals/"
    },
    
]

export default function Projects() {
    useEffect(()=>{
        gsap.registerPlugin(ScrollTrigger);
        // make animation in context so when unmount component i will remove animation
        const cts = gsap.context(()=>{
            gsap.to(".child", {  
                xPercent: -100 * (projects.length - 1), // Move sections horizontally
                ease: "none",
                scrollTrigger: {
                  trigger: ".slider", // Slider container (parent trigger)
                  start: "top top", // Start at the top of the viewport
                  end: () => `+=${projects.length * window.innerWidth}`, // Dynamically calculate the scroll distance
                  scrub: 1, // Smooth scrubbing
                  pin: true, // Pin the slider (كانه دبوس يثبته علي الصفحه) during the scroll
                //   markers: true, // Debugging markers (remove in production)
                },
              });
        });
        // remove animation when unmount phase of component
        return () => cts.revert(); // Cleanup function
    },[])
  return (
    <>
        <section className="projects " id="projects" >
                <div className="container">
                    {/* title of component */}
                        <Title>projects</Title>
                        {/* slider of projects */}
                    <div className="slider flex flex-row gap-2 md:gap-10">
                        {/* map in all project because they have same style  */}
                        {projects.map((project, ind)=>{
                            return (
                                <section key={ind} className="child  md:w-[70%] w-[90%] flex   itmes-center shrink-0 grow-0">
                           
                          
                                  <a href={project.link} target='_blank' className='border-2   group/parent border-gray-600 hover:border-scolor hover:scale-110 transition-all duration-1000 rounded-md p-4 w-[80%] md:w-[60%] flex flex-col justify-between gap-1 md:gap-2 '>
                                <Image src={project.src} className='w-full object-cover h-[200px] group-hover/parent:object-scale-down' alt={project.alt} />
                                <article className='mb-4'>
                                    <h3 className='text-xl font-bold'>{project.name}</h3>
                                    <p className='text-gray-400 line-clamp-2 sm:line-clamp-4 md:group-hover/parent:line-clamp-none'>{project.description}</p>
                                </article>
                                <footer className='flex justify-between items-start flex-col sm:flex-row gap-2 border-t-2 pt-4 border-gray-400'>
                                    <p className='capitalize  '> tools i used :</p>
                                    <figure className='flex gap-2 '>
                                        {/* map on every tools i used in this project */}
                                    {project.tools.map((tool,ind)=>{
                                        return (
                                            <Image className='w-5 inline sm:w-7' src={tool}  key={ind} alt={`tool ${ind} i used in project`}/>
                                        )
                                    })}
                                    </figure>
                                </footer>
                                </a>
                        
                            
                        </section>
                            )
                        })}
                    
                    </div>
                </div>
        </section>
    </>
  )
}
