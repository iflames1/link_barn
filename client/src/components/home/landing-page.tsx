"use client";
import React from "react";
import { Features } from "./features";
import Hero from "./hero";
import { Preview } from "./preview";
import { TestimonialLamp } from "./lamp-testimonial";
import { HeroScrollDemo } from "./container-scroll";
import { FeaturesSectionDemo } from "./feats";
import { BorderBeam } from "../ui/border-beam";
import { Testimonials } from "./testimonials";
import { CustomCursor } from "../ui/custom-cursor";

export function LandingPage() {
  return (
    <div className="h-full">
      <Hero />
      <div className="md:h-[50rem] lg:h-[40rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <FeaturesSectionDemo />
      </div>
      <Testimonials />
      {/* </div> */}
      {/* <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"> */}
      {/*   <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10"> */}
      {/*     Border Beam */}
      {/*   </span> */}
      {/*   <BorderBeam size={250} duration={12} delay={9} /> */}
      {/* </div> */}
      {/*<TestimonialLamp />*/}
      {/*<Features />*/}
      {/*preview scroll is not working as expected*/}
      {/*<Preview />*/}
    </div>
  );
}
