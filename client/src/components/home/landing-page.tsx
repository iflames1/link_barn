"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { Features } from "./features";
import Hero from "./hero";
import { Preview } from "./preview";
import { TestimonialLamp } from "./lamp-testimonial";
import { HeroScrollDemo } from "./container-scroll";
import { FeaturesSectionDemo } from "./feats";
import { BorderBeam } from "../ui/border-beam";

export function LandingPage() {
  return (
    <div>
      <div className="h-full relative w-full overflow-hidden bg-white text-black bM flex flex-col gap-4 items-center justify-center rounded-xl p-4">
        <div>
          <div className="absolute inset-0 w-full h-full bg-white z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
          <div className="overflow-auto relative z-20">
            <Hero />
            {/* <Features /> */}
            {/* <HeroScrollDemo /> */}

            {/*preview scroll is not working as expected*/}
            {/*<Preview />*/}
          </div>
        </div>
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Border Beam
          </span>
          <BorderBeam size={250} duration={12} delay={9} />
        </div>
        <FeaturesSectionDemo />
      </div>
    </div>
  );
}
