import React from "react";
import Hero from "./hero";
import { FeaturesSectionDemo } from "./feats";
import { Testimonials } from "./testimonials";

export function LandingPage() {
  return (
    <div className="h-full">
      <Hero />
      <div className="md:h-[50rem] lg:h-[40rem] w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <FeaturesSectionDemo />
      </div>
      <Testimonials />
    </div>
  );
}
