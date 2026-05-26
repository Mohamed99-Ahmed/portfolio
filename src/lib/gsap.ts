import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, Draggable, MotionPathPlugin, Flip, ScrollToPlugin, TextPlugin);

export { gsap, ScrollTrigger, Draggable, MotionPathPlugin, Flip, ScrollToPlugin, TextPlugin };

export function useMatchMedia() {
  return gsap.matchMedia();
}

let lastScrollY = 0;
export function getScrollDirection() {
  const current = window.scrollY;
  const direction = current > lastScrollY ? "down" : "up";
  lastScrollY = current;
  return direction;
}
