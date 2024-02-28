import React, { useEffect } from "react";
import Banner from "./Banner";
import AOS from "aos";
import "aos/dist/aos.css";
import { LazyMotion, domAnimation, motion, useScroll, m } from "framer-motion";
import Education from "./Education";
import Projects from "../pages/projects/Projects";
import Contact from "./Contact";
export default function About() {
  useEffect(() => {
    AOS.init({
      // Global settings:
      disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
      startEvent: "DOMContentLoaded", // name of the event dispatched on the document, that AOS should initialize on
      initClassName: "aos-init", // class applied after initialization
      animatedClassName: "aos-animate", // class applied on animation
      useClassNames: false, // if true, will add content of `data-aos` as classes on scroll

      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 200, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
    });
  }, []);
  // const { scrollYProgress } = useScroll();
  return (
    <LazyMotion features={domAnimation}>
      <m.div animate={{ opacity: 1 }}>
        <div>
          {/* banner */}
          <Banner />
          <Education />
          {/* projects */}
          <Projects />
          <Contact />
          {/* email */}
        </div>
      </m.div>
    </LazyMotion>
  );
}
