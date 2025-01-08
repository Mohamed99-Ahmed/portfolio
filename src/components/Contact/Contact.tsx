import React from "react";
import Title from "../Title/Title";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

export default function Contact() {
  return (
    <>
      <section id="contact" >
        <div className="container">
          {/* title of component */}
          <Title>contact</Title>
          {/* box of contact */}
          <section className="links p-6 rounded-md h-[350px]  flex flex-col gap-2    text-4xl">
              {/* github and linkedin links*/}
            <div className="col-1 h-[75%] flex gap-2 transition-all duration-1000">
              <a target="_blank"  href="https://github.com/Mohamed99-Ahmed?tab=repositories" className="github bg-gray-900 col-span-2 row-span-4 transition-all duration-1000 ">
                <FaGithub />
              </a>
              <a target="_blank" href="https://www.linkedin.com/in/eng-mohamed-ahmed/" className="linkedin bg-blue-500 col-span-7 row-span-4 transition-all duration-1000">
                <FaLinkedin />
              </a>
            </div>
            {/* phone and gmail links*/}
            <div className="col-2 h-[25%] flex gap-2 transition-all duration-1000">
              <a target="_blank" className="phone bg-green-500 col-span-3 row-span-2 transition-all duration-1000" href="tel:+0201033088054">
                <FaPhoneAlt />
              </a>
              <a target="_blank" className="gmail bg-red-400 col-span-6 row-span-2 transition-all duration-1000" href="mailto:mohamed202029999@gmail.com">
                <BiLogoGmail />
              </a>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
