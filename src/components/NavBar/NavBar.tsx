"use client";
import React, { useState } from "react";
import Button from "../Button/Button";
// icon bar
import { HiBars2 } from "react-icons/hi2";
import Link from "next/link";
import { IoCloseSharp } from "react-icons/io5";
const links = [
  { href: "/#home", label: "home" },
  { href: "/#skills", label: "skills" },
  { href: "/#projects", label: "projects" },
  { href: "/#contact", label: "contact" },
];
export default function NavBar() {
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <>
      <nav
        className={`fixed top-0  right-0  duration-1000 md:static  left-0  bg-mcolor z-[1000] text-3xl font-bold  md:h-fit md:py-4 overflow-hidden ${
          openNav ? `h-screen` : `h-0`
        }`}
      >
        {/* button to open and close navbar */}
        <button
          className="right-2 z-[200] top-4 fixed md:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          <Button>{openNav ? <IoCloseSharp /> : <HiBars2 />}</Button>
        </button>
        {/* list anchors of sections   */}
        <ul
          className={`flex  md:flex-row h-screen md:h-auto  flex-col gap-8 justify-center  items-center overflow-hidden  `}
        >
          {links.map((link, ind) => {
            return (
              <Link
                key={ind}
                onClick={() => setOpenNav(false)}
                href={link.href}
                className={`capitalize font-semibold text-xl md:font-normal md:text-base md:p-2 `}
              >
                {link.label}
              </Link>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
